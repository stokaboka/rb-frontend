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

import $RbHierarchyItem from './rbHierarchyItem';
import $RbModel from './rbModel';

let $RbHierarchyModel = function(__model, __datasource, __options, __connection){
    const self = this;

    self.type = 'RbHierarchyModel';

    self.model = __model;

    self.show_hier_arrow = false;

    if(typeof __datasource === 'string'){
        self.datasource_id = __datasource;
        self.datasource = null;
    }else{
        self.datasource_id = __datasource.id;
        self.datasource = __datasource;
    }

    self.options = __options;
    self.connection = __connection;

    self.callback = __options.callback;

    self.current_item = null;
    self.loaded_parent_item = null;

    self.busy = false;

    self.columns = null;

    self.root = new $RbHierarchyItem({
        data: null
    });

    if(!self.datasource) {
        if (self.model.ready) {
            self.datasource = self.model.get_registered_service(self.datasource_id);
            self.columns = self.datasource.columns;
        } else {
            self.model.addEventListener($RbModel.prototype.events.READY, function () {
                self.datasource = self.model.get_registered_service(self.datasource_id);
                self.columns = self.datasource.columns;
            });
        }
    }else{
        self.columns = self.datasource.columns;
    }

    return self;
};

$RbHierarchyModel.prototype.setOptions = function (__options) {
    const self = this;
    self.options = __options;
};

$RbHierarchyModel.prototype.loadChildren = function (__parent_item) {
    const self = this;
    self.busy = true;

    self.model.$log.debug("$RbHierarchyModel.loadChildren");
    if(typeof __parent_item === 'undefined'){
        self.loaded_parent_item = self.root;
    }else{
        self.loaded_parent_item = __parent_item;
    }

    if(self.loaded_parent_item.is_root){
        if(self.datasource){
            self.datasource.createFilterForColumn(self.connection.children_column, {value: self.connection.root_value}, true);
        }
    }else{
        if(self.datasource){
            self.datasource.createFilterForColumn(self.connection.children_column, {value: self.loaded_parent_item.data[self.connection.parent_column]}, true);
        }
    }

    self.loaded_parent_item.items = null;
    self.busy = true;
    self.model.load(self.datasource_id, self.options);

    return self;
};

$RbHierarchyModel.prototype.dataLoaded = function (__complete) {
    const self = this;
    self.model.$log.debug('__dataLoaded: '+__complete);
    if(__complete){
        if(self.loaded_parent_item) {

            self.loaded_parent_item.items = [];
            self.loaded_parent_item.is_node = self.datasource.dataset.length > 0;
            self.loaded_parent_item.is_leaf = self.datasource.dataset.length === 0;

            self.loaded_parent_item.items_loadded = true;
            self.loaded_parent_item.expanded = self.loaded_parent_item.is_node;

            self.initIcons(self.loaded_parent_item);

            _.each(self.datasource.dataset, function (__row) {

                if(self.connection.index_column){
                    if(self.loaded_parent_item.data){
                        __row[self.connection.index_column] = self.loaded_parent_item.data[self.connection.index_column] + __row[self.connection.index_column] + '.';
                    }else{
                        __row[self.connection.index_column] = __row[self.connection.index_column] + '.';
                    }
                }
                let __options = {
                    data: __row,
                    parent: self.loaded_parent_item
                };
                if(self.connection.is_node_column){
                    __options["is_node"] = __row[self.connection.is_node_column];
                }
                if(self.connection.is_leaf_column){
                    __options["is_leaf"] = __row[self.connection.is_leaf_column];
                }

                self.loaded_parent_item.items.push(self.initIcons(new $RbHierarchyItem(__options)));
            });
        }
    }

    self.datasource.dataset = null;

    self.busy = false;
};

$RbHierarchyModel.prototype.onRowClick = function (__hier_item) {
    const self = this;
    self.model.$log.debug("$RbHierarchyModel..onRowClick");
    self.setCurrentItem(__hier_item);
};

$RbHierarchyModel.prototype.onRowDoubleClick = function (__hier_item) {
    const self = this;
    self.model.$log.debug("$RbHierarchyModel..onRowDoubleClick");
    self.setCurrentItem(__hier_item);
};

$RbHierarchyModel.prototype.setCurrentItem = function(__hier_item) {
    const self = this;
    if(typeof __hier_item === 'undefined' || __hier_item == null){
        return;
    }
    self.current_item = __hier_item;
    self.datasource.dataset = [];
    self.datasource.dataset.push(self.current_item.data);

    self.model.select_row(self.datasource, 0);
};

$RbHierarchyModel.prototype.onNodeClick = function (__hier_item) {
    const self = this;
    self.model.$log.debug("$RbHierarchyModel..onNodeClick");

    if(typeof __hier_item ==='undefined' || __hier_item === null){
        return;
    }
    if(self.busy){
        return;
    }

    if(__hier_item.items_loadded){
        if(__hier_item.is_node){
            self.setExpanded(__hier_item, !__hier_item.expanded);
            self.initIcons(__hier_item);
        }
    }else{
        self.loadChildren(__hier_item);
    }

};

$RbHierarchyModel.prototype.initIcons = function(__hier_item){

    if(__hier_item.is_node) {
        if (__hier_item.expanded) {
            __hier_item.expanded_icon = $RbHierarchyItem.prototype.ICONS.EXPANDED;
            __hier_item.expanded_style = $RbHierarchyItem.prototype.STYLES.EXPANDED;
            __hier_item.node_icon =  $RbHierarchyItem.prototype.ICONS.EXPANDED_NODE;
        } else {
            __hier_item.expanded_icon = $RbHierarchyItem.prototype.ICONS.COLLAPSED;
            __hier_item.expanded_style = $RbHierarchyItem.prototype.STYLES.COLLAPSED;
            __hier_item.node_icon =  $RbHierarchyItem.prototype.ICONS.COLLAPSED_NODE;
        }
        __hier_item.node_style =  $RbHierarchyItem.prototype.STYLES.NODE;
    }else{
        __hier_item.node_icon =  $RbHierarchyItem.prototype.ICONS.LEAF;
        __hier_item.node_style =  $RbHierarchyItem.prototype.STYLES.LEAF;

        __hier_item.expanded_icon = $RbHierarchyItem.prototype.ICONS.LEAF;
        __hier_item.expanded_style = $RbHierarchyItem.prototype.STYLES.LEAF;
    }
    return __hier_item;
};

$RbHierarchyModel.prototype.setExpanded = function (__hier_item, __expanded) {
    __hier_item.expanded = __expanded;

    if(__hier_item.expanded){
        __hier_item.items = __hier_item.back_items;
        __hier_item.back_items = null;
    }else{
        __hier_item.back_items = __hier_item.items;
        __hier_item.items = null;
    }
};

export default $RbHierarchyModel;