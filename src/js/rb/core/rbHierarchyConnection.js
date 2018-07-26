/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */
/**
 * Created by stokaboka on 12.08.2016.
 */

"use strict";

let $RbHierarchyConnection = function( options ){
    const self = this;

    Object.assign(
    	self,
	    {
		    parent_column: '',
		    children_column: '',
		    root_value: '',
		    index_column: '',
		    is_node_column: '',
		    is_leaf_column: ''
	    },
	    options
    );

    // self.parent_column = __options.parent_column;
    // self.children_column = __options.children_column;
    // self.root_value  = __options.root_value;
    // self.index_column  = __options.index_column;
    // self.is_node_column  =  __options.hasOwnProperty("is_node_column") ? __options["is_node_column"] : '';
    // self.is_leaf_column  = __options.hasOwnProperty("is_leaf_column") ? __options["is_leaf_column"] : '';

    return self;
};

$RbHierarchyConnection.prototype.toJSONimage = function() {
    const self = this;

	return {
        parent_column: self.parent_column,
        children_column: self.children_column,
        root_value: self.root_value,
        index_column: self.index_column,
        is_node_column: self.is_node_column,
        is_leaf_column: self.is_leaf_column
    };

};

export default $RbHierarchyConnection;