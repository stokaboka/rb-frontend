/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

let $RbElementsPositionManager = function ( options ) {
	const self = this;

	self.options = Object.assign(
		{
			selector: "[snacks-auto-position]",
			//layout: $RbElementsPositionManager.prototype.LAYOUTS.MOSAIC,
			layout: $RbElementsPositionManager.prototype.LAYOUTS.TILE,
			sort: $RbElementsPositionManager.prototype.SORT.MIN,
			callback: null,
			datasources: [],
			$localStorage: null
		},
		options );

	return self;
};

$RbElementsPositionManager.prototype.LAYOUTS = {
	MOSAIC: "MOSAIC",
	TILE: "TILE",
	CASCADE: "CASCADE"
};

$RbElementsPositionManager.prototype.SORT = {
	MIN: "MIN",
	MAX: "MAX",
	AVG: "AVG",
	SIZE: "SIZE"
};

$RbElementsPositionManager.prototype.sortElements = function ( __elements ) {
	const self = this;
	return _.sortBy( __elements, function ( ___element ) {

		let ___top = parseInt( ___element.offsetTop );
		let ___left = parseInt( ___element.offsetLeft );
		let ___width = parseInt( ___element.offsetWidth );
		let ___height = parseInt( ___element.offsetHeight );

		switch ( self.options.sort ) {
			case $RbElementsPositionManager.prototype.SORT.SIZE :
				return ___width * ___height;

			case $RbElementsPositionManager.prototype.SORT.MAX :
				return Math.max(___top, ___left);

			case $RbElementsPositionManager.prototype.SORT.AVG :
				return (___top + ___left) / 2;

			case $RbElementsPositionManager.prototype.SORT.MIN :
			default :
				return Math.min(___top, ___left);
		}
	});
};

$RbElementsPositionManager.prototype.getDefaultSortByLayout = function ( layout ) {

	switch ( layout ){
		case $RbElementsPositionManager.prototype.LAYOUTS.CASCADE :
			return $RbElementsPositionManager.prototype.SORT.SIZE;

		case $RbElementsPositionManager.prototype.LAYOUTS.TILE :
		case $RbElementsPositionManager.prototype.LAYOUTS.MOSAIC :
		default :
			return $RbElementsPositionManager.prototype.SORT.MIN;
	}
};

$RbElementsPositionManager.prototype.arrange = function ( __elements ) {
	const self = this;

	if( __elements && __elements.length > 0 ) {

		self.options.sort = self.getDefaultSortByLayout( self.options.layout );

		__elements = self.sortElements( __elements );

		let arranger = new $RbGridElements({
			elements: __elements,
			layout: self.options.layout,
			callback: self.options.callback,
			datasources: self.options.datasources,
			$localStorage: self.options.$localStorage
		});

		arranger.create()
			.fill()
			.arrange()
			.stylization();
	}

	return self;
};

let $RbGridElements = function ( options ) {
	const self = this;

	if( typeof options === 'undefined'){
		options = {};
	}

	self.options = Object.assign(
		{
			elements: [],
			layout: $RbElementsPositionManager.prototype.LAYOUTS.TILE,
			margin: 5,
			cascadeMargin: 48,
			$localStorage: null
		},
		options );

	self.grid = null;
	self.rows = 0;
	self.cols = 0;
	self.row = 0;
	self.col = 0;
	self.elements = 0;

	self.fireCallbackCounter = 0;

	self.initGridDimension();

	return self;
};

$RbGridElements.prototype.go = function () {
	const self = this;

	self
		.create()
		.fill()
		.arrange()
		.stylization();

	return self;
};

$RbGridElements.prototype.initGridDimension = function (  ) {
	const self = this;

	switch ( self.options.layout ){
		case $RbElementsPositionManager.prototype.LAYOUTS.CASCADE :
			self.rows = self.options.elements.length;
			self.cols = 1;
			break;
		case $RbElementsPositionManager.prototype.LAYOUTS.TILE :
		case $RbElementsPositionManager.prototype.LAYOUTS.MOSAIC :
		default:
			self.rows = Math.floor( Math.sqrt( self.options.elements.length ) );
			self.cols = Math.ceil( self.options.elements.length / self.rows );
	}

	self.elements = self.options.elements.length;

	return self;
};

$RbGridElements.prototype.create = function ( ) {
	const self = this;

	self.grid = [];
	for( let r = 0; r < self.rows; r++ ){
		self.grid.push( [] );
		for( let c = 0; c < self.cols; c++ ){
			self.grid[r][c] = null;
		}
	}
	return self;
};

$RbGridElements.prototype.fill = function (  ) {
	const self = this;

	self.row = 0;
	self.col = 0;

	_.each( self.options.elements, function ( element ) {

		self.grid[ self.row ][ self.col ] = {
			element: element,
			arranged: false,
			left:   parseInt( element.offsetLeft ),
			top:    parseInt( element.offsetTop ),
			width:  parseInt( element.offsetWidth ),
			height: parseInt( element.offsetHeight )
		};

		self.nextCoordinates();

	} );

	return self;
};

$RbGridElements.prototype.arrange = function () {
	const self = this;

	self.row = 0;
	self.col = 0;

	for( let r=0; r < ( self.rows * self.cols ); r++ ){
		if( self.grid[ self.row ][ self.col ] && self.grid[ self.row ][ self.col ].element ) {
			switch (self.options.layout) {
				case $RbElementsPositionManager.prototype.LAYOUTS.TILE :
					self.grid[self.row][self.col].arranged = self.arrangeTile();
					break;
				case $RbElementsPositionManager.prototype.LAYOUTS.MOSAIC :
					self.grid[self.row][self.col].arranged = self.arrangeMosaic();
					break;
				case $RbElementsPositionManager.prototype.LAYOUTS.CASCADE :
					self.grid[self.row][self.col].arranged = self.arrangeCascade();
					break;
			}
		}

		self.nextCoordinates();
	}

	return self;
};

$RbGridElements.prototype.stylization = function () {
	const self = this;

	self.row = 0;
	self.col = 0;

	self.fireCallbackCounter = 0;

	for( let r=0; r < self.rows; r++ ){
		for( let c=0; c < self.cols; c++ ){
			if( self.grid[ r ][ c ] && self.grid[ r ][ c ].element ){
				let arrangedElement = angular.element( self.grid[ r ][ c ].element );

				arrangedElement[0].addEventListener( 'transitionend', function( event ) {
					angular.element( event.currentTarget ).removeClass( "rb-grid-arrange-animation" );
					self.fireCallback();
				}, false);

				let positionStyle = {
					top:  self.grid[ r ][ c ].top + 'px',
					left: self.grid[ r ][ c ].left + 'px'
				};

				arrangedElement.addClass( "rb-grid-arrange-animation");
				arrangedElement.css(positionStyle);

				if( arrangedElement[0].id ){
					let __ds = _.findWhere( self.options.datasources, { id: arrangedElement[0].id });
					if( __ds ){
						__ds.builder_info.x = self.grid[ r ][ c ].left;
						__ds.builder_info.y = self.grid[ r ][ c ].top;
					}
				}else{
					if( arrangedElement[0].attributes.hasOwnProperty( "snacks-floating-storage-info" )){
						let __t = arrangedElement[0].attributes["snacks-floating-storage-info"].nodeValue;
						self.options.$localStorage[ __t + ".left"] = self.grid[ r ][ c ].left;
						self.options.$localStorage[ __t + ".top"] = self.grid[ r ][ c ].top;
					}

				}

			}
		}
	}

	return self;
};

$RbGridElements.prototype.fireCallback = function () {
	const self = this;
	self.fireCallbackCounter++;
	if( self.fireCallbackCounter >= self.elements ){
		if( self.options.callback ){
			self.options.callback();
		}
	}
};

$RbGridElements.prototype.arrangeTile = function () {
	const self = this;

	self.grid[self.row][self.col].top =
		self.options.margin + self.calculateMaxPosition( 'row', self.col -1 );

	self.grid[self.row][self.col].left =
		self.options.margin + self.calculateMaxPosition( 'col', self.row -1 );

	return true;

};

$RbGridElements.prototype.arrangeMosaic = function ()
{
	const self = this;

	self.grid[self.row][self.col].top = self.options.margin;
	self.grid[self.row][self.col].left = self.options.margin;

	if (self.row > 0) {
		self.grid[self.row][self.col].top += self.grid[self.row - 1][self.col].top;
		self.grid[self.row][self.col].top += self.grid[self.row - 1][self.col].height;
	}
	if (self.col > 0) {
		self.grid[self.row][self.col].left += self.grid[self.row][self.col - 1].left;
		self.grid[self.row][self.col].left += self.grid[self.row][self.col - 1].width;
	}

	return true;
};

$RbGridElements.prototype.arrangeCascade = function ()
{
	const self = this;

	let prvColumnWidth = self.calculateMaxWidth( 'row', self.col );

	self.grid[self.row][self.col].top = self.options.margin;
	self.grid[self.row][self.col].left = self.options.margin;

	self.grid[self.row][self.col].top += self.options.cascadeMargin * ( self.row );
	self.grid[self.row][self.col].left += self.options.cascadeMargin * ( self.row ) + self.col * prvColumnWidth;

	return true;
};

$RbGridElements.prototype.calculateMaxWidth = function ( __direction, __index )
{
	const self = this;

	if ( __index < 0 ){
		return 0;
	}

	let maxPosition = 0,  tst = 0;

	switch ( __direction ){
		case 'col' :
			for ( let c = 0; c < self.cols; c++ ) {
				if( self.grid[ __index ][ c ]
					&& self.grid[ __index ][ c ].element ){

					tst = 0;
					tst += self.grid[ __index ][ c ].width;
					tst += self.options.margin * 2;
					maxPosition = tst > maxPosition ? tst : maxPosition;
				}
			}
			break;
		case 'row' :
		default :
			for ( let r = 0; r < self.rows; r++ ){
				if( self.grid[ r ][ __index ]
					&& self.grid[ r ][ __index ].element ){

					tst = 0;
					tst += self.grid[ r ][ __index ].height;
					tst += self.options.margin * 2;
					maxPosition = tst > maxPosition ? tst : maxPosition;
				}
			}
	}

	return maxPosition;

};

$RbGridElements.prototype.calculateMaxPosition = function ( __direction, __index ) {
	const self = this;

	if ( __index < 0 ){
		return 0;
	}

	let maxPosition = 0,  tst = 0;

	switch ( __direction ){
		case 'col' :
			for ( let c = 0; c < self.cols; c++ ) {
				if( self.grid[ __index ][ c ]
					&& self.grid[ __index ][ c ].element
					&& self.grid[ __index ][ c ].arranged ){

					tst = 0;
					tst += self.grid[ __index ][ c ].left;
					tst += self.grid[ __index ][ c ].width;
					tst += self.options.margin * 2;
					maxPosition = tst > maxPosition ? tst : maxPosition;
				}
			}
			break;
		case 'row' :
		default :
			for ( let r = 0; r < self.rows; r++ ){
				if( self.grid[ r ][ __index ]
					&& self.grid[ r ][ __index ].element
					&& self.grid[ r ][ __index ].arranged ){

					tst = 0;
					tst += self.grid[ r ][ __index ].top;
					tst += self.grid[ r ][ __index ].height;
					tst += self.options.margin * 2;
					maxPosition = tst > maxPosition ? tst : maxPosition;
				}
			}
	}

	return maxPosition;

};

$RbGridElements.prototype.nextCoordinates = function () {
	const self = this;
	switch ( self.options.layout ){
		case $RbElementsPositionManager.prototype.LAYOUTS.CASCADE :
			self.col = 0;
			self.row++;
			break;
		case $RbElementsPositionManager.prototype.LAYOUTS.TILE :
		case $RbElementsPositionManager.prototype.LAYOUTS.MOSAIC :
		default :
			self.row++;
			if( self.row >= self.rows ){
				self.row = 0;
				self.col++;
			}
	}
};

export { $RbElementsPositionManager, $RbGridElements };