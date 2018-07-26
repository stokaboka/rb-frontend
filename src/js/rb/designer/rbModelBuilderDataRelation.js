/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

let $RbModelBuilderDataRelation = function ( options ) {
	const self = this;

	//let typeLineDrawng = 1;
	self.typeLineDrawng = 2;

	self._zIndex = 0;

	self.menu = {
		style: {
			top: "0px",
			left: "0px"
		}
	};

	self.visible = true;

	self.style = {top: "0px", left: "0px", display: "none"};

	self.selected_stroke_color = "red";
	self.stroke_width = 3;
	self.selected_stroke_width = self.stroke_width + 1;

	self.pointerEvents = "none";

	self.container = {
		linkClass: "rb-designer-relation-link-line-normal",
		style: {
			"z-index": self._zIndex,
			"display": "none",
			"left": "0px",
			"top": "0px",
			"width": "0px",
			"height": "0px"
		}
	};

	self.circle_style = {
		"r": "6",
		"stroke-width": self.stroke_width - 1
	};


	self.relation = Object.assign(
		{},
		{
			source: {datasource: "", column: ""},
			target : {datasource: "", column: ""}
		},
		options
	);

	self.zeroPoint = {x: 0, y:0};

	self.points = self.zeroPoint.x + ',' + self.zeroPoint.y;
	self.arrow = "";

	self.srcPoint = self.zeroPoint;
	self.trgPoint = self.zeroPoint;

	Object.defineProperties(this, {
		zIndex: {
			get: function () {
				return this._zIndex;
			},
			set: function ( ___val ) {
				this._zIndex = ___val;
				this.container.style = Object.assign( {}, this.container.style, { "z-index":  ___val} );
			}
		},
		name: {
			get: function() {
				return this.source.datasource + "." + this.source.column + " > " + this.target.datasource + "." + this.target.column;
			},
			set: function(___val) {
			}
		},
		source: {
			get: function () {
				return this.relation.source;
			},
			set: function (___val) {
				this.relation.source = ___val;
			}
		},
		target: {
			get: function () {
				return this.relation.target;
			},
			set: function (___val) {
				this.relation.target = ___val;
			}
		},
		srcDataSource: {
			get: function() {
				return this.source.datasource;
			},
			set: function(___val) {
				this.source.datasource = ___val;
			}
		},
		srcColumn: {
			get: function() {
				return this.source.column;
			},
			set: function(___val) {
				this.source.column = ___val;
			}
		},
		trgDataSource: {
			get: function() {
				return this.target.datasource;
			},
			set: function(___val) {
				this.target.datasource = ___val;
			}
		},
		trgColumn: {
			get: function() {
				return this.target.column;
			},
			set: function(___val) {
				this.target.column = ___val;
			}
		}
	});
};

$RbModelBuilderDataRelation.prototype.setSource = function (__ds, __col) {
	const self = this;
	self.relation.source.datasource = __ds;
	self.relation.source.column = __col;
};

$RbModelBuilderDataRelation.prototype.setTarget = function (__ds, __col) {
	const self = this;
	self.relation.target.datasource = __ds;
	self.relation.target.column = __col;
};

/**
 * calculate point coordinates for draw relation polyline
 * @param __parent_offset
 * @param __src_builder_info
 * @param ___trg_builder_info
 */
$RbModelBuilderDataRelation.prototype.initPoints = function(__parent_offset, __src_builder_info, ___trg_builder_info){
	const self = this;
	let a_pnts = [];
	let __margin_x = 20, __margin_y = 0;

	let __shiftSrcX = 0, __shiftTrgX = 0;
	let __shiftSrcY = 0, __shiftTrgY = 0;

	let __parent_offset_left = __parent_offset.left * -1;
	let __parent_offset_top = __parent_offset.top * -1;

	self.points = "";

	let __context = $$rbCore.ngOptions.$document[0];

	let __src_id = self.relation.source.datasource,
		__trg_id = self.relation.target.datasource;

	if(__src_builder_info.expanded){
		__src_id = __src_id + "." + self.relation.source.column;
	}

	if(___trg_builder_info.expanded){
		__trg_id = __trg_id + "." + self.relation.target.column;
	}

	let __positionSrc, __positionTrg;

	let ___elementSrc = __context.getElementById(__src_id);
	let ___elementTrg = __context.getElementById(__trg_id);

	if( ___elementSrc && ___elementTrg ) {

		if (__src_builder_info.expanded) {
			__shiftSrcX = ___elementSrc.offsetLeft * -1;
		}

		if(___trg_builder_info.expanded){
			__shiftTrgX = ___elementTrg.offsetLeft * -1;
		}

		__shiftSrcY = Math.round(___elementSrc.offsetHeight / 2);
		__shiftTrgY = Math.round(___elementTrg.offsetHeight / 2);

		__positionSrc = $$rbCore.getOffset(___elementSrc);
		__positionTrg = $$rbCore.getOffset(___elementTrg);

		if( self.typeLineDrawng === 1 ) {

			__positionSrc.left += __parent_offset_left + __shiftSrcX;
			__positionSrc.top += __parent_offset_top + __shiftSrcY + 3;

			__positionTrg.left += __parent_offset_left + __shiftTrgX;
			__positionTrg.top += __parent_offset_top + __shiftTrgY;

			a_pnts.push({x: __positionSrc.left, y: __positionSrc.top});
			a_pnts.push({x: __positionSrc.left - __margin_x, y: __positionSrc.top});

			a_pnts.push({x: __positionTrg.left - __margin_x, y: __positionTrg.top});
			a_pnts.push({x: __positionTrg.left, y: __positionTrg.top});
		}

		if( self.typeLineDrawng === 2 ) {

			__positionSrc.left += __parent_offset_left + __shiftSrcX - 5;
			__positionSrc.top += __parent_offset_top + __shiftSrcY + 3;

			__positionTrg.left += __parent_offset_left + __shiftTrgX - 5;
			__positionTrg.top += __parent_offset_top + __shiftTrgY;

			if( __positionSrc.left < __positionTrg.left ){

				a_pnts.push({x: __positionSrc.left, y: __positionSrc.top});
				a_pnts.push({x: __positionSrc.left - __margin_x, y: __positionSrc.top});

				a_pnts.push({x: __positionSrc.left - __margin_x, y: __positionTrg.top});
				a_pnts.push({x: __positionTrg.left, y: __positionTrg.top});

			}else{
				a_pnts.push({x: __positionSrc.left, y: __positionSrc.top});
				a_pnts.push({x: __positionTrg.left - __margin_x, y: __positionSrc.top});

				a_pnts.push({x: __positionTrg.left - __margin_x, y: __positionTrg.top});
				a_pnts.push({x: __positionTrg.left, y: __positionTrg.top});
			}

		}

	}


	let __margin = 10;

	if(a_pnts.length > 0) {

		let __min_x = _.min( a_pnts, function ( pnt ) { return pnt.x; } ).x - __margin;
		let __min_y = _.min( a_pnts, function ( pnt ) { return pnt.y; } ).y - __margin;
		let __max_x = _.max( a_pnts, function ( pnt ) { return pnt.x; } ).x + __margin * 2;
		let __max_y = _.max( a_pnts, function ( pnt ) { return pnt.y; } ).y + __margin * 2;

		self.container.style = {
			"z-index": self._zIndex,
			//"pointer-events": self.pointerEvents,
			"display": "block",
			//"position": "absolute",
			"left": __min_x + "px",
			"top": __min_y + "px",
			"width": ( __max_x - __min_x ) + "px",
			"height": ( __max_y - __min_y ) + "px"
		};

		a_pnts = _.map(a_pnts, function ( pnt ) {
			return {
				x: pnt.x - __min_x,
				y: pnt.y - __min_y
			}
		});

		self.srcPoint = a_pnts[0];
		self.trgPoint = a_pnts[a_pnts.length - 1];

		self.points = _.map(a_pnts, function (__pnt) {
			return __pnt.x + ',' + __pnt.y;
		}).join(" ");

		self.arrow = "M" + self.trgPoint.x + " " + self.trgPoint.y;
		self.arrow = self.arrow + " L" + (self.trgPoint.x - 8) + " " + (self.trgPoint.y - 3);
		self.arrow = self.arrow + " L" + (self.trgPoint.x - 8) + " " + (self.trgPoint.y + 3);
		self.arrow = self.arrow + " Z";

	}else{

		self.container.style = {
			"z-index": self._zIndex,
			//"pointer-events": self.pointerEvents,
			"display": "none",
			//"position": "absolute",
			"left": "0px",
			"top": "0px",
			"width": "0px",
			"height":  "0px"
		};

		self.srcPoint = self.zeroPoint;
		self.trgPoint = self.zeroPoint;
		self.points = self.zeroPoint.x + ',' + self.zeroPoint.y;
		self.arrow = "";
	}

	// self.visible = __src_builder_info.display && ___trg_builder_info.display;

};

$RbModelBuilderDataRelation.prototype.select = function( __event ){
	const self = this;

	self.container.linkClass = "rb-designer-relation-link-line-selected";

	self.menu = {
		style: {
			top: __event.clientY +  "px",
			left: __event.clientX + "px"
		}
	};

	return self;
};

$RbModelBuilderDataRelation.prototype.unSelect = function(){
	const self = this;

	self.container.linkClass = "rb-designer-relation-link-line-normal";

	self.menu = {
		style: {
			top: "0px",
			left: "0px"
		}
	};

	return null;
};

$RbModelBuilderDataRelation.prototype.toJSONimage = function () {
	const self = this;
	return self.relation;
};

export default $RbModelBuilderDataRelation;