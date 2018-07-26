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

let $RbHierarchyItem = function( options ){
    const self = this;
    //self.data = __options.data;

    Object.assign(
        self,
        {
	        parent: null,
	        is_leaf: true,
	        is_node: true,
	        data: null
        },
	    options
    );

	self.is_root = false;
	self.level = 0;

    if( self.parent ){
        self.level = self.parent.level + 1;
    }else{
        self.parent = null;
        self.is_root = true;
    }

    self.items = null;
    self.back_items = null;
    self.items_loadded = false;

    // self.is_leaf = __options.hasOwnProperty("is_leaf") ? __options["is_leaf"] : true;
    // self.is_node = __options.hasOwnProperty("is_node") ? __options["is_node"] : true;

    self.expanded = false;

    self.expanded_icon = $RbHierarchyItem.prototype.ICONS.COLLAPSED;
    self.expanded_style = $RbHierarchyItem.prototype.STYLES.COLLAPSED;

    self.node_icon =  $RbHierarchyItem.prototype.ICONS.NODE;
    self.node_style = $RbHierarchyItem.prototype.STYLES.NODE;

    self.added_to_dom = false;

    self.dom_element = null;

    return self;
};

$RbHierarchyItem.prototype.ICONS = {
	EXPANDED: 'keyboard_arrow_down',
	COLLAPSED: 'keyboard_arrow_right',
	NODE: 'folder',
	EXPANDED_NODE: 'folder_open',
	COLLAPSED_NODE: 'folder',
	LEAF: 'radio_button_unchecked'
};

$RbHierarchyItem.prototype.STYLES = {
	EXPANDED: {fill: "darkred"},
	COLLAPSED: {fill: "green"},
	NODE: {fill: "orange"},
	LEAF: {fill: "blue"}
};

export default $RbHierarchyItem;