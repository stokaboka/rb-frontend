/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */
/**
 * Created by stokaboka on 30.11.2016.
 */

"use strict";


let $RbModelBuilderTable = function ( options ) {
    const self = this;

    // if(typeof __options == 'undefined'){
    //     __options = {};
    // }

    Object.assign(
        self,
        {
	        TABLE_NAME: '',
	        table_name: '',
	        COMMENTS: '',
	        comments: ''
        },
	    options
    );

	self.table = self.TABLE_NAME ? self.TABLE_NAME : self.table_name ? self.table_name : '';
	self.comments = self.COMMENTS ? self.COMMENTS : self.comments;

    // self.table = __options.hasOwnProperty('TABLE_NAME') ?  __options['TABLE_NAME'] : __options.hasOwnProperty('table_name') ?  __options['table_name'] : '';
    // self.comments = __options.hasOwnProperty('COMMENTS') ?  __options['COMMENTS'] : __options.hasOwnProperty('comments') ?  __options['comments'] : '';

    self.counter = 0;

    self.designer = null;
    self.database_info = null;
    self.database = null;
    self.schema = null;
    self.database_engine = null;

    self.x = 0;
    self.y = 0;

};

$RbModelBuilderTable.prototype.setDatabase = function (__db) {
    const self = this;
    self.database_info = __db;
    self.database = __db.name;
    self.schema = __db.schema;
    self.database_engine = __db.schema;
};

export default $RbModelBuilderTable;