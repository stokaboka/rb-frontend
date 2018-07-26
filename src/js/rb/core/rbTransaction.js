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

/**
 *  transaction logic
 */

let $RbTransaction = function (__model, __dataSource, __action, __data) {
    const self = this;
    self.model = null;
    self.dataSource = null;
    self.action = '';
    self.row_index = -1;
    self.columns = [];
    self.data = {};
    self.rollback_data = {};

    self.where = null;

    self.title = '';

    if(typeof __model === 'undefined')  self.model = null;
    else self.model = __model;

    if(typeof __dataSource === 'undefined')  self.dataSource = null;
    else self.dataSource = __dataSource;

    if(typeof __action === 'undefined') self.action = '';
    else self.action = __action;

    if(typeof __data === 'undefined') self.data = {};
    else self.data = __data;

    if(__dataSource){
        self.title = __dataSource.title;
        self.row_index = __dataSource.current_row;
    }

    self.columns = __dataSource.columns;
    self.rollback_data = {};

    switch (self.action.toUpperCase()){
        case 'I' :
            self.data = self.dublicateObject(__dataSource.blank);
            self.rollback_data = self.dublicateObject(__dataSource.blank);
            break;
        case 'U' :
            self.row_index = __dataSource.current_row;
            self.data = self.dublicateObject(__dataSource.dataset[self.row_index]);
            self.rollback_data = self.dublicateObject(__dataSource.dataset[self.row_index]);
            break;
        case 'D' :
            break;
        case 'S' :
            break;
        case 'R' :
            break;
        default :
    }
    return self;
};

$RbTransaction.prototype.validate = function () {
    const self = this;
    if(self.dataSource){
	    return self.dataSource.validate(self.data);
    }else{
        return true;
    }
};

$RbTransaction.prototype.dublicateObject = function (obj) {
    return angular.copy(obj);
};

$RbTransaction.prototype.getSaveObject = function(){
	const self = this;
	return {
		database:   self.dataSource.database,
		action:     self.action,
		table:      self.dataSource.update_table,
		datarow:    self.prepareDataRowForSave(),
		where:      self.prepareWhereForSave()
	};
};

$RbTransaction.prototype.prepareRowObject = function( __columns, __data_row ){
	const self = this;
	let ___out = {};

	if( __columns ) {
		_.each( __columns, function ( __column ) {
			let ___db_column = __column[ "db_name" ];
			___out[ ___db_column ] = __data_row[ ___db_column ];
		})
	}

	return ___out;
};

$RbTransaction.prototype.prepareWhereForSave = function(){
	const self = this;

	let __where_columns = [];
	let __columns = self.dataSource.columns;

	switch (self.action.toUpperCase()){
		case 'I' :
			break;
		case 'U' :
		case 'D' :
			__where_columns = _.where( __columns, { db: true, primary_key: true, update: true } );
			if( __where_columns.length === 0) {
				__where_columns = _.where( __columns, { db: true, update: true } );
			}
			break;
		default:
			__where_columns = _.where( __columns, { db: true, update: true } );
	}

	return self.prepareRowObject( __where_columns, self.prepareRowValues( self.rollback_data ) );

};

$RbTransaction.prototype.prepareDataRowForSave = function(){
    const self = this;

	let __statement_columns = [];
	let __columns = self.dataSource.columns;

    switch (self.action.toUpperCase()){
        case 'I' :
	        __statement_columns = _.filter( __columns, function( col ){
		        return col.update && (col.db || col.primary_key)
	        } );
	        break;
	    case 'U' :
		    __statement_columns = _.where( __columns, { db: true, update: true } );
	        break;
        case 'D' :
	        __statement_columns = _.where( __columns, { db: true, primary_key: true } );
	        if(!__statement_columns){
		        __statement_columns = _.where( __columns, { db: true, update: true } );
	        }
            break;
        default:
	        __statement_columns = _.where( __columns, { db: true } );
    }

	return self.prepareRowObject( __statement_columns, self.data );

};

$RbTransaction.prototype.reformatDateValue = function( __value ){
	const self = this;
	let __out = __value;
	try {
		if( moment( __value ).isValid() ) {
			switch ( self.dataSource.database_engine ){
				case 'oracle':
					let localLocale = moment( __value );
					localLocale.locale(' en' );
					__out = localLocale.format( 'DD.MMM.YYYY' );
					break;
				default:
					// __out = moment( __value ).format( 'YYYY-MM-DD HH:mm:ss' );
					__out = moment( __value ).format( 'YYYY-MM-DD' );
			}
		}
	}catch(e){
		self.model.$log.error(e);
	}
	return __out;
};

$RbTransaction.prototype.prepareRowValues = function( __data_row ){
	const self = this;
	let __columns = self.dataSource.columns;
	let __out = {};

	for( let __c=0; __c < __columns.length; __c++ ){
		let ___db_column = __columns[ __c ][ "db_name" ];
		switch ( __columns[ __c ][ "db_type" ] ) {
			case 'DATE' :
				__out[ ___db_column ] = self.reformatDateValue( __data_row[ ___db_column ] );
				break;
			default:
				__out[ ___db_column ] =  __data_row[ ___db_column ];
		}
	}
	return __out;
};

$RbTransaction.prototype.beforeCommit = function(){

    const self = this;

    switch (self.action.toUpperCase()){
        case 'D' :
            break;
        default:
	        self.data = self.prepareRowValues( self.data );
    }
};

$RbTransaction.prototype.fixInsert = function(__result){
    const self = this;

    if(__result) {
        self.data["id"] = __result;
        self.data = self.afterCommit(self.data, self.dataSource.columns, true);
        self.dataSource.dataset.push(self.data);
    }
};

$RbTransaction.prototype.fixUpdate = function(){
    const self = this;
    self.dataSource.dataset[self.row_index] = self.afterCommit(self.data, self.dataSource.columns, false);
};

$RbTransaction.prototype.fixDelete = function(__result){
    const self = this;
    if (__result) {
        if (__result > 0) {
            self.dataSource.dataset = _.reject(self.dataSource.dataset, {select: true});
        }
    }
};

$RbTransaction.prototype.afterCommit = function( __data_row, __columns, __clear_selection ){

    const self = this;

	let __cols_date = _.chain(__columns).where({db_type: 'DATE'}).value();

    if(__clear_selection) {
        __data_row['select'] = false;
        __data_row['current'] = '';
    }

    for(let __c = 0; __c < __cols_date.length; __c++){
	    let ___db_column = __cols_date[__c]["db_name"];
	    let ___dt = __data_row[___db_column];

        try {

	        let ___dt_p = moment(___dt);
            if(___dt_p.isValid()){
                __data_row[___db_column] = new Date(___dt_p);
            } else {
                __data_row[___db_column] = null;
            }

        }catch(e){
            self.model.$log.error(e);
        }

    }

    return __data_row;
};

$RbTransaction.prototype.commit = function(){
    const self = this;

    if(self.dataSource){
        self.dataSource.before_commit_transaction(self);
        self.beforeCommit();
        self.save();
    }else{
        self.rollback();
    }

    return self;
};

$RbTransaction.prototype.save = function(){
    const self = this;
    self.model.save(self);
};

$RbTransaction.prototype.rollback = function(){
    const self = this;

    if(self.dataSource) {
        self.dataSource.before_rollback_transaction(self.rollback_data);

	    switch (self.action.toUpperCase()){
		    case 'I' :
			    break;
		    case 'U' :
			    self.dataSource.dataset[self.row_index] = self.dublicateObject(self.rollback_data);
			    break;
		    case 'D' :
			    break;
		    case 'S' :
			    break;
		    case 'R' :
			    break;
		    default :
	    }
    }

    self.dataSource = null;
    self.row_index = -1;
    self.columns = [];
    self.data = [];
    self.rollback_data = [];
    self.action = '';
};

export default $RbTransaction;