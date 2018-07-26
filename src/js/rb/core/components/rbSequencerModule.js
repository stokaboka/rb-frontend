"use strict";
/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

	angular.module('rb.sequencer')
		.directive('sequencerButtonColumn', $$$RbSequencerButtonColumnDirective);

	function $$$RbSequencerButtonColumnDirective(rbCore){
		return {
			link: function(scope, element, attrs) {
				if(attrs.sequencerButtonColumn) {
					rbCore.model.sequencer.init(attrs.sequencerButtonColumn);
				}

				element.bind('click', function() {
					//var __sequencerColumn = JSON.parse(attrs.sequencerButtonColumn);
					if(attrs.sequencerButtonColumn) {
						rbCore.model.sequencer.init(attrs.sequencerButtonColumn);
						rbCore.model.sequencer.nextValue();
					}
				});
			}
		};
	}
	$$$RbSequencerButtonColumnDirective.$inject = ['rbCore'];
