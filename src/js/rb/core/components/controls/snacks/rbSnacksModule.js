/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

/**
 * rb.snacks
 *
 * snacksFloating - drag element
 * set the attribute value for define css selector for drag
 *
 * snacksClickTop - pull element on top
 * set the attribute value for define css selector for select elements which do sorting
 * default value: "[snacks-click-top]" sort elements by attribute name "snacks-click-top"
 *
 *
 * snacksDragAndDrop - drag and drop selected by muse element
 * set the attribute value for define css selector  drag&drop area
 * inside dragged element puts element text
 *
 * snacksFitToContainer - fit element to parent container
 */


angular.module('rb.snacks')
	.directive('snacksFloating', $$$RbSnacksFloatingDirective)
	.directive('snacksDragAndDrop', $$$RbSnacksDragAndDropDirective)
	.directive('snacksDragAndDropData', $$$RbSnacksDragAndDropDataDirective)
	.directive('snacksFloatingStorageInfo', $$$RbSnacksFloatingStorageInfoDirective)
	.directive('snacksFitToContainer', $$$RbSnacksFitToContainerDirective)
	.directive('snacksAutoPosition', $$$RbSnacksAutoPositionDirective)
//.directive('snacksFloatingStorageInfoPosition', $$$RbSnacksFloatingStorageInfoPosition)
;

function $$$RbSnacksFloatingDirective( $document, $localStorage )
{
	return {
		restrict: "A",
		link: function(scope, element, attrs) {

			var startX = 0, startY = 0, x = 0, y = 0;
			var ___selector_click_top = attrs.snacksClickTop ? attrs.snacksClickTop :  "[snacks-click-top]";

			element.css({
				position: 'absolute',
				cursor: 'pointer'
			});

			element.on('mousedown', function(event) {

				angular.element(document.querySelectorAll(___selector_click_top)).css({"z-index": 0});
				element.css({"z-index": 1});

				//console.info("*** SHIPS floating click ***");

				var ___drag = true;

				if(attrs.snacksFloating) {
					var ___target = $(event.target);
					var ___t = ___target.is( attrs.snacksFloating );
					if (!___t) {
						___drag = false;
					}
				}

				if(___drag) {
					event.preventDefault();

					x = element[0].offsetLeft;
					y = element[0].offsetTop;

					startX = event.pageX - x;
					startY = event.pageY - y;
					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);
				}

				if( attrs.snacksClickTopHandler ){
					if( scope[ attrs.snacksClickTopHandler ] && typeof scope[ attrs.snacksClickTopHandler ] === "function") {
						scope[ attrs.snacksClickTopHandler ]( { event: event } );
					}
				}

			});

			function mousemove(event) {
				y = event.pageY - startY;
				x = event.pageX - startX;
				element.css({
					top: y + 'px',
					left:  x + 'px'
				});


				if(attrs.snacksOnDragged){
					if(scope[attrs.snacksOnDragged] && typeof scope[attrs.snacksOnDragged] === "function") {
						scope[attrs.snacksOnDragged](event);
					}
				}
			}

			function mouseup(event) {
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);

				if(attrs.snacksFloatingStorageInfo){

					var storageInfo = Object.assign(
						{},
						$localStorage[ attrs.snacksFloatingStorageInfo ],
						{top: element[0].offsetTop, left: element[0].offsetLeft}
					);

					$localStorage[ attrs.snacksFloatingStorageInfo] = storageInfo;
				}

				if(attrs.snacksOnDragComplete){
					if(scope[attrs.snacksOnDragComplete] && typeof scope[attrs.snacksOnDragComplete] === "function") {
						scope[attrs.snacksOnDragComplete]( { event: event } );
					}
				}

			}

		}
	}
}
$$$RbSnacksFloatingDirective.$inject = ['$document', '$localStorage'];

function $$$RbSnacksDragAndDropDataDirective()
{
	return {
		restrict: "A"
	}
}
$$$RbSnacksDragAndDropDataDirective.$inject = [];

function $$$RbSnacksFloatingStorageInfoDirective($localStorage)
{
	return {
		restrict: "A",
		link: function(scope, element, attrs)
		{

			var initialPosition = { x: 0, y: 0 };
			if( attrs.snacksFloatingStorageInfoPosition ){
				try {
					var __initPosTmp = JSON.parse(attrs.snacksFloatingStorageInfoPosition);
					// initialPosition.x = __initPosTmp.x;
					// initialPosition.y = __initPosTmp.y;
					Object.assign( initialPosition, __initPosTmp );
				}catch(e){}
			}

			if( attrs.snacksFloatingStorageInfo ){

				var storageInfo = Object.assign(
					{top: initialPosition.y, left: initialPosition.x},
					$localStorage[ attrs.snacksFloatingStorageInfo ]
				);

				storageInfo.top = storageInfo.top < 0 ? 0 : storageInfo.top;
				storageInfo.left = storageInfo.left < 0 ? 0 : storageInfo.left;


				storageInfo.top = storageInfo.top + "px";
				storageInfo.left = storageInfo.left + "px";

				element.css( storageInfo );

				// if( !x ){
				// 	x = initialPosition.x;
				// }
				//
				// if( !y ){
				// 	y = initialPosition.y;
				// }

				// element.css( {
				// 	top: y + 'px',
				// 	left:  x + 'px'
				// } );

			}
		}
	}
}
$$$RbSnacksFloatingStorageInfoDirective.$inject = ["$localStorage"];

function $$$RbSnacksFloatingStorageInfoPosition()
{
	return {
		restrict: "A",
		link: function(scope, element, attrs)
		{
			console.log("$$$RbSnacksFloatingStorageInfoPosition  " + attrs.snacksFloatingStorageInfoPosition );
		}
	}
}
$$$RbSnacksFloatingStorageInfoPosition.$inject = [];

function $$$RbSnacksDragAndDropDirective( $document, $compile )
{
	return {
		restrict: "A",
		scope: {
			snacksDragAndDropTarget: '@',
			snacksDragAndDropRestrict: '@',
			snacksDragAndDropOnComplete: '&',
			snacksDragAndDropData: '=',
			snacksDragAndDropTitle: '='
		},
		link: function(scope, element, attrs) {

			var startX = 0, startY = 0, x = 0, y = 0;

			var ___dragState = 0;

			var ___drop = false;

			var ___showDragContainer = {"display": "inline-block", "z-index": 9999};
			var ___hideDragContainer = {"display": "none", "z-index": 0, "cursor": "auto"};

			var ___dragTargetAreaSelector = attrs.snacksDragAndDrop ? attrs.snacksDragAndDrop :  "body";
			var ___dragTargetElementSelector = scope.snacksDragAndDropTarget ? scope.snacksDragAndDropTarget :  ___dragTargetAreaSelector;

			var ___dragAreaElement =  angular.element( document.querySelector( ___dragTargetAreaSelector ) );
			var ___contentDragElement = angular.element( document.querySelector( ".rb-designer-drag-container" ) );

			if(___dragAreaElement.length > 0 && ___contentDragElement.length === 0) {
				var ___incEl = '<div class="rb-designer-drag-container"></div>';
				___contentDragElement = angular.element(___incEl);
				___dragAreaElement.append(___contentDragElement);
				$compile(___contentDragElement)(scope);
			}

			element.on('mousedown', function(event) {
				___drop = false;
				if(___contentDragElement) {
					event.preventDefault();

					startX = event.pageX - x - element[0].offsetLeft - element[0].offsetParent.offsetLeft;
					startY = event.pageY - y - element[0].offsetTop - element[0].offsetParent.offsetTop;

					y = event.pageY - startY;
					x = event.pageX - startX;

					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);

					___contentDragElement.empty();
					if(scope.snacksDragAndDropTitle){
						___contentDragElement.append(scope.snacksDragAndDropTitle);
					}else{
						___contentDragElement.append(element.text());
					}
					$compile(___contentDragElement)(scope);

					___contentDragElement
						.css({
							top: y + "px",
							left: x + "px"
						});

					___dragState = 1;
				}
			});

			function mousemove(event) {
				y = event.pageY - startY;
				x = event.pageX - startX;
				var ___css_cursor = 'auto';

				___drop = true;
				if(___dragTargetElementSelector === "body"){
					___drop = true;
				}else {
					// получить самый вложенный элемент под курсором мыши
					var ___elem = $document[0].elementFromPoint(event.clientX, event.clientY);
					___drop = $(___elem).is(___dragTargetElementSelector);
				}

				___drop = true;

				if (___drop) {
					___css_cursor = 'move';
				}else{
					___css_cursor = 'no-drop';
				}

				if(___dragState === 1){
					___contentDragElement.css(___showDragContainer);
				}
				___dragState = 2;

				___contentDragElement.css({
					top: y + 'px',
					left:  x + 'px',
					cursor: ___css_cursor
				});

				$('*').css('cursor', ___css_cursor);
				//console.log("___css_cursor " + ___css_cursor);
			}

			function mouseup(event) {

				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
				___dragState = 0;
				___contentDragElement.empty();
				___contentDragElement.css(___hideDragContainer);

				$('*').css('cursor', '');

				x = 0;
				y = 0;

				if (___drop) {

					// получить самый верхний элемент под курсором мыши
					var ___elem = $document[0].elementFromPoint(event.clientX, event.clientY);
					var ___target_data = null;
					var ___is_target_drop = false, __is_restrict_drop = false;

					if(___elem) {
						___target_data = angular.element(___elem).attr("snacks-drag-and-drop-data");

						if(!__is_restrict_drop && $(___elem).is(scope.snacksDragAndDropRestrict)){
							__is_restrict_drop = true;
						}
						if(!___is_target_drop && $(___elem).is(___dragTargetElementSelector)){
							___is_target_drop = true;
						}

					}

					if(!___is_target_drop) {
						_.each(event.path, function (__test_elem) {
							__test_elem = $(__test_elem);
							if (!__is_restrict_drop && __test_elem.is(scope.snacksDragAndDropRestrict)) {
								__is_restrict_drop = true;
							}
							if (!___is_target_drop && __test_elem.is(___dragTargetElementSelector)) {
								___is_target_drop = true;
							}
						});
					}

					if(___is_target_drop && !__is_restrict_drop){
						if ( scope.snacksDragAndDropOnComplete ) {
							scope.snacksDragAndDropOnComplete( {
								event: event,
								data: { "source": scope.snacksDragAndDropData, "target": ___target_data}
							} );
						}
					}
				}
				___drop = false;
			}

		}
	}
}
$$$RbSnacksDragAndDropDirective.$inject = ['$document', '$compile'];

function $$$RbSnacksFitToContainerDirective()
{
	return {
		restrict: "A",
		link: function(scope, element, attrs)
		{
			// var initialWidth = $window.innerWidth;
			// var initialHeight = $window.innerHeight;
		}
	}
}
$$$RbSnacksFitToContainerDirective.$inject = [ ];


function $$$RbSnacksAutoPositionDirective() {
	return {
		restrict: "A",
		link: function(scope, element, attrs)
		{
			// var __top = element[0].offsetTop,
			// 	__left = element[0].offsetLeft,
			// 	__height = element[0].offsetHeight,
			// 	__width = element[0].offsetWidth;
			//
			// var __selector = "[snacks-auto-position]";

			// scope.$watch( function() {
			// 	if( __top != element[0].offsetTop ||
			// 		__left != element[0].offsetLeft ||
			// 		__height != element[0].offsetHeight ||
			// 		__width != element[0].offsetWidth
			// 	){
			// 		var __elements = angular.element( document.querySelector( __selector ) );
			// 		if( __elements ) {
			// 			__elements = _.sortBy( __elements, function ( ___element ) {
			// 				var ___top =  parseInt(___element.offsetTop);
			// 				var ___left = parseInt(___element.offsetLeft);
			// 				console.info("left: "+___left+" top:"+___top);
			// 				return 1;
			// 			});
			// 		}
			// 	}
			// 	 __top = element[0].offsetTop;
			// 	 __left = element[0].offsetLeft;
			// 	 __height = element[0].offsetHeight;
			// 	 __width = element[0].offsetWidth;
			// 	console.info("*** __top: "+__left+" __left:"+__top);
			// } );

		}
	}
}
$$$RbSnacksAutoPositionDirective.$inject = [];