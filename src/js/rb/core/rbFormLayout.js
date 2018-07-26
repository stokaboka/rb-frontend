/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

let $RbFormLayout = function ( layout ) {
	const self = this;

	Object.assign( self, $RbFormLayout.prototype.FORM_LAYOUTS[ layout ] );

	self.gridMap = 'zero one two three four five'.split(' ');

	return self;
};

$RbFormLayout.prototype.setDataSource = function ( dataSources ) {
	const self = this;

	for( let i = 0; i < self.numberOfBlocks; i++){
		self.grid[ self.gridMap [ i ] ] = dataSources[ i ];
	}

	return self;
};

$RbFormLayout.prototype.getDataSource = function () {
	const self = this;
	let dataSources = new Array( self.numberOfBlocks );
	for( let i = 0; i < self.numberOfBlocks; i++){
		dataSources[ i ] = self.grid[ self.gridMap [ i ] ];
	}
	return dataSources;
};


//template:"<div> <rb-table row-source='' history-source=''></rb-table>  <rb-table row-source='' history-source=''></rb-table> </div>",

$RbFormLayout.prototype.FORM_LAYOUTS =
	{
		SINGLE_DATASOURCE: {
			type: "SINGLE_DATASOURCE",
			label: "Single Data Grid",
			icon: null,
			numberOfBlocks: 1,
			grid: { },
			template: '<div ><rb-table row-source="%row-source%" ></rb-table></div>'
		},
		TWO_DATASOURCE_VERTICAL: {
			type: "TWO_DATASOURCE_VERTICAL",
			label: "Two Data Grid Vertical",
			icon: null,
			numberOfBlocks: 2,
			grid: {	},
			template:   '<div class="rb-grid rb-grid-table">' +

						'   <div class="rb-grid rb-grid-table-row">' +
						'       <div class="rb-grid rb-grid-table-cell">' +
						'           <rb-table row-source="%row-source%"></rb-table> ' +
						'       </div>' +
						'   </div>' +

						'   <div class="rb-grid rb-grid-table-row">' +
						'       <div class="rb-grid rb-grid-table-cell">' +
						'           <rb-table row-source="%row-source%"></rb-table> ' +
						'       </div>' +
						'   </div>' +

						'</div>',
		},
		TWO_DATASOURCE_HORIZONTAL: {
			type: "TWO_DATASOURCE_HORIZONTAL",
			label: "Two Data Grid Horizontal",
			icon: null,
			numberOfBlocks: 2,
			grid: { },
			template:   '<div class="rb-grid rb-grid-table">' +

			'   <div class="rb-grid rb-grid-table-row">' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'   </div>' +

			'</div>',
		},

		THREE_DATASOURCE_VERTICAL: {
			type: "THREE_DATASOURCE_VERTICAL",
			label: "Three Data Grid Vertical",
			icon: null,
			numberOfBlocks: 3,
			grid: {	},
			template:   '<div class="rb-grid rb-grid-table">' +

			'   <div class="rb-grid rb-grid-table-row">' +
			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +
			'   </div>' +

			'   <div class="rb-grid rb-grid-table-row">' +
			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +
			'   </div>' +

			'   <div class="rb-grid rb-grid-table-row">' +
			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +
			'   </div>' +

			'</div>',
		},

		THREE_DATASOURCE_HORIZONTAL: {
			type: "THREE_DATASOURCE_HORIZONTAL",
			label: "Three Data Grid Horizontal",
			icon: null,
			numberOfBlocks: 3,
			grid: {	},
			template:   '<div class="rb-grid rb-grid-table">' +

			'   <div class="rb-grid rb-grid-table-row">' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'   </div>' +

			'</div>',
		},

		ONE_TWO_DATASOURCE: {
			type: "ONE_TWO_DATASOURCE",
			label: "One-Two Data Grid",
			icon: null,
			numberOfBlocks: 3,
			grid: {	},
			template:   '<div class="rb-grid rb-grid-table">' +

			'   <div class="rb-grid rb-grid-table-row">' +
			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +
			'   </div>' +

			'   <div class="rb-grid rb-grid-table-row">' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'   </div>' +

			'</div>',
		},

		TWO_ONE_DATASOURCE: {
			type: "TWO_ONE_DATASOURCE",
			label: "Two-One Data Grid",
			icon: null,
			numberOfBlocks: 3,
			grid: {	},
			template:   '<div class="rb-grid rb-grid-table">' +

			'   <div class="rb-grid rb-grid-table-row">' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'   </div>' +

			'   <div class="rb-grid rb-grid-table-row">' +
			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +
			'   </div>' +

			'</div>',
		},

		FOUR_BOX_DATASOURCE: {
			type: "FOUR_BOX_DATASOURCE",
			label: "Four-Box Data Grid",
			icon: null,
			numberOfBlocks: 4,
			grid: {	},
			template:   '<div class="rb-grid rb-grid-table">' +

			'   <div class="rb-grid rb-grid-table-row">' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'   </div>' +

			'   <div class="rb-grid rb-grid-table-row">' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'   </div>' +

			'</div>',
		},

		ONE_FOUR_BOX_DATASOURCE: {
			type: "ONE_FOUR_BOX_DATASOURCE",
			label: "One-Four-Box Data Grid",
			icon: null,
			numberOfBlocks: 5,
			grid: {	},
			template:   '<div class="rb-grid rb-grid-table">' +

			'   <div class="rb-grid rb-grid-table-row">' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'   </div>' +

			'   <div class="rb-grid rb-grid-table-row">' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'   </div>' +

			'   <div class="rb-grid rb-grid-table-row">' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'       <div class="rb-grid rb-grid-table-cell">' +
			'           <rb-table row-source="%row-source%"></rb-table> ' +
			'       </div>' +

			'   </div>' +

			'</div>',
		},
	};

export default $RbFormLayout;