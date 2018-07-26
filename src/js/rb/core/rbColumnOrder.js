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
import $RbColumnFilter from "./rbColumnFilter";

/**
 * ORDER BY column class
 */
let $RbColumnOrder = function ( options ) {
    const self = this;

    // if(typeof ___options == "undefined"){
    //     ___options = {};
    // }

    Object.assign(
        self,
        {
            id: '',
	        db_name: '',
	        db_type: '',
            dir: $RbColumnOrder.prototype.ORDERS.NONE,
            num: 0,
            icon: $RbColumnOrder.prototype.ICONS[self.dir],
	        iconUp: $RbColumnOrder.prototype.ICONS.ASC,
	        iconDown: $RbColumnOrder.prototype.ICONS.DESC,
	        classUp: '',
	        classDown: ''
        },
	    options
    );

	self.type = "columnorder";

    self.init();

    return self;
};

$RbColumnOrder.prototype.ORDERS = {
    ASC: 'ASC',
    DESC: 'DESC',
    NONE: 'NONE'
};

$RbColumnOrder.prototype.ICONS = {
    ASC: 'arrow_drop_up',
    DESC: 'arrow_drop_down',
    NONE: 'sort'
};

$RbColumnOrder.prototype.LABELS = {
	ASC: 'Ascending',
	DESC: 'Descending',
	NONE: 'Without ordering'
};

$RbColumnOrder.prototype.toObject = function () {
    const self = this;
    return {
        db_name: self.db_name,
        db_type: self.db_type,
        dir: self.dir,
        num: self.num
    };
};

$RbColumnOrder.prototype.nextSort = function (___num){
    const self = this;
    switch (self.dir){
        case $RbColumnOrder.prototype.ORDERS.ASC:
            return self.setSort($RbColumnOrder.prototype.ORDERS.DESC);
        case $RbColumnOrder.prototype.ORDERS.DESC:
            return self.setSort($RbColumnOrder.prototype.ORDERS.NONE);
        default:
            if(typeof ___num === 'undefined'){
                ___num = self.num;
            }
            return self.setSort($RbColumnOrder.prototype.ORDERS.ASC, ___num);
    }
};

$RbColumnOrder.prototype.setSort = function (___dir, ___num){
    const self = this;

    if(self.dir === $RbColumnOrder.prototype.ORDERS.NONE && ___dir !== $RbColumnOrder.prototype.ORDERS.NONE){
        self.num = ___num+1;
    }

    switch (___dir) {
        case $RbColumnOrder.prototype.ORDERS.ASC:
            if(self.dir === $RbColumnOrder.prototype.ORDERS.ASC){
                self.dir = $RbColumnOrder.prototype.ORDERS.NONE;
            }else{
                self.dir = $RbColumnOrder.prototype.ORDERS.ASC;
            }
            break;
        case $RbColumnOrder.prototype.ORDERS.DESC:
            if(self.dir === $RbColumnOrder.prototype.ORDERS.DESC){
                self.dir = $RbColumnOrder.prototype.ORDERS.NONE;
            }else{
                self.dir = $RbColumnOrder.prototype.ORDERS.DESC;
            }
            break;
        default:
            self.dir = $RbColumnOrder.prototype.ORDERS.NONE;
    }

    return self.init();
};

$RbColumnOrder.prototype.init = function () {
    const self = this;
    switch (self.dir){
        case $RbColumnOrder.prototype.ORDERS.ASC:
            self.classUp = "rb-column-order-asc";
            self.classDown = "rb-column-order-none";
            break;
        case $RbColumnOrder.prototype.ORDERS.DESC:
            self.classUp = "rb-column-order-none";
            self.classDown = "rb-column-order-desc";
            break;
        default:
            self.classUp = "rb-column-order-none";
            self.classDown = "rb-column-order-none";
            self.num = 0;
    }

    self.icon = $RbColumnOrder.prototype.ICONS[self.dir];
    self.label = $RbColumnOrder.prototype.LABELS[self.dir];

    return self;
};

$RbColumnOrder.prototype.isEmpty = function () {
    const self = this;
    return self.dir === $RbColumnOrder.prototype.ORDERS.NONE;
};

$RbColumnOrder.prototype.getDescription = function() {
	const self = this;
	return self.db_name + ':' + self.dir + ':' + self.num;
};

$RbColumnOrder.prototype.toJSONimage = function() {
    const self = this;
	return {
	    db_name: self.db_name,
	    db_type: self.db_type,
	    dir: self.dir,
	    num: self.num
    };
};

export default $RbColumnOrder;