/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

/**
 * Created by stokaboka on 08.11.2016.
 */

"use strict";

/**
 * the database definition object
 * @param __options
 * @returns {$RbModelBuilderDatabase}
 */

import { $RbSequence } from '../core/rbSequence'
import $RbModelBuilderTable from './rbModelBuilderTable';

let $RbModelBuilderDatabase = function ( options ) {
    const self = this;

    self.type = 'database';

    Object.assign(
        self,
        {
	        name : null,
	        schema : null
        },
	    options
    );

    // if(typeof __options == 'undefined'){
    //     __options = {};
    // }
    //
    // self.name = __options.hasOwnProperty('name') ? __options.name : null;
    // self.schema = __options.hasOwnProperty('schema') ? __options.schema : null;

    self.schema = self.schema.toUpperCase();

    if(!$RbModelBuilderDatabase.prototype.INFO.hasOwnProperty(self.schema)){
        self.schema = "DEFAULT";
    }

    self.info = $RbModelBuilderDatabase.prototype.INFO[self.schema];
    self.icon = self.info.icon;
    self.vendor = self.info.vendor;

    self.tables = [];

	self.sequences = [];

    return self;
};

$RbModelBuilderDatabase.prototype.INFO = {
    "MONGODB":  {icon: null, vendor: 'Mongo'},
    "MYSQL":    {icon: null, vendor: 'Oracle'},
    "ORACLE":   {icon: null, vendor: 'Oracle'},
	"PGSQL":    {icon: null, vendor: 'PostgreSQL'},
    "DEFAULT":  {icon: null, vendor: 'Unknown'}
};

/**
 * reset Data Source object
 * @param __tables
 * @returns {$RbModelBuilderDatabase}
 */
$RbModelBuilderDatabase.prototype.reset = function ( __tables ) {
    const self = this;
    self.tables = null;
    self.tables = [];
    return self;
};

/**
 * add tables from list
 * @param __tables
 * @returns {$RbModelBuilderDatabase}
 */
$RbModelBuilderDatabase.prototype.addTables = function (__tables) {
    const self = this;
    _.each(__tables, function ( __elem ) {
        let __tbl = new $RbModelBuilderTable(__elem);
        self.addTable(__tbl);
    });
    return self;
};

/**
 * insert the table object into tables array
 * @param __table
 * @returns {$RbModelBuilderDatabase}
 */
$RbModelBuilderDatabase.prototype.addTable = function (__table) {
    const self = this;

    __table.setDatabase(self);
    self.tables.push(__table);

    return self;
};

/**
 * delete the table named [__name] from the list of tables
 * @param __table
 * @returns {$RbModelBuilderDatabase}
 */
$RbModelBuilderDatabase.prototype.removeTable = function (__table) {
    const self = this;

    let ___t = null;
    if(typeof __table === 'string'){
        ___t = self.getTable(__table);
    }else{
        ___t = __table;
    }

    if(___t){
        self.tables = _.without(self.tables, ___t);
    }

    return self;
};

/**
 * find the table named [__name] in the list of tables
 * @param __name
 * @returns table object or null
 */
$RbModelBuilderDatabase.prototype.getTable = function (__name) {
    const self = this;

    let ___out = _.findWhere(self.tables, {table: __name});

    if(typeof ___out === 'undefined'){
        ___out = null;
    }
    return ___out;
};

$RbModelBuilderDatabase.prototype.setSequences = function (__sequences) {
	const self = this;
	self.sequences = [];
	_.each(__sequences, function ( __elem ) {
	    _.extendOwn(
	        __elem,
            {
                sequence_id: __elem.id,
                database: self.name,
                database_engine: self.schema
            });
		self.sequences.push(new $RbSequence(__elem));
	});
	return self;
};

export default $RbModelBuilderDatabase;