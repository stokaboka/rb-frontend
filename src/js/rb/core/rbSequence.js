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

import $RbDisplayGadget from "../ui/rbDisplayGadget";

/**
 *
 * @param options
 * @returns {$RbSequence}
 */
let $RbSequence = function ( options ) {
    const self = this;

    self.type = "sequence";

    Object.assign(
        self,
        {
	        database: '',
	        database_engine: '',
	        sequence_id: '',
	        target: ''
        },
        options
    );

    // self.database = __sequence.hasOwnProperty('database') ?  __sequence['database'] : '';
    // self.database_engine = __sequence.hasOwnProperty('database_engine') ?  __sequence['database_engine'] : '';
    // self.sequence_id = __sequence.hasOwnProperty('sequence_id') ?  __sequence['sequence_id'] : '';
    // self.target = __sequence.hasOwnProperty('target') ?  __sequence['target'] : '';

    // if(!self.sequence_id){
    //     //self.model.$log.error('SEQUENCE: expected "sequence_id" property');
    // }
    return self;
};

$RbSequence.prototype.toJSONimage = function() {
    const self = this;

	return {
        database: self.database,
        database_engine: self.database_engine,
        sequence_id: self.sequence_id,
        target: self.target
    };

};

$RbSequence.prototype.getDescription = function() {
	const self = this;
	return self.sequence_id + '>' + self.target;
};

let $RbSequencer = function(__model){
    const self = this;
    self.model = __model;
    self.sequence = null;
    self.target_data_row = null;
};

$RbSequencer.prototype.__sequencer = function( __action){
    const self = this;
    let deffered = self.model.$q.defer();

    if(__action === undefined){
        __action = "NEXTVAL";
    }

    self.model.$http({
        method: 'POST',
        url: self.model.url+"/sequencer.json",
        data: {
            sequence: self.sequence.sequence_id,
            action: __action,
            database: self.sequence.database,
            database_engine: self.sequence.database_engine
        }
    }).then(function( data ) {
        deffered.resolve( data.data, data.status );
    }).catch(function( data ) {
        deffered.reject( data.data, data.status );
    });

    return deffered.promise;
};

$RbSequencer.prototype.do_sequence = function(__action){
    const self = this;
    let __sq = self.__sequencer(__action);
    __sq.then(
        function(__data) {
            if(self.target_data_row) {
                if(self.target_data_row.hasOwnProperty(self.sequence.target)) {
                    self.target_data_row[self.sequence.target] = __data["result"][0]["value"];
                }else{
                    self.model.$log.error('$RbSequencer: property ['+self.sequence.target+'] of target data source expected.');
                }
            }
        },
        function(__data, __status) {
            self.model.$log.error('$RbSequencer: status='+__status+' response='+__data);
        }
    );
};

$RbSequencer.prototype.init = function (___sequence_column) {
    const self = this;
    if(typeof ___sequence_column === 'string'){
        ___sequence_column = JSON.parse(___sequence_column);
    }
    self.target_data_row = self.model.transaction.data;
    self.sequence = ___sequence_column.sequence;
};

$RbSequencer.prototype.nextValue = function(){
    const self = this;
    self.do_sequence("NEXTVAL");
};

$RbSequencer.prototype.currentValue = function(){
    const self = this;
    self.do_sequence("CURRVAL");
};

$RbSequencer.prototype.reset = function(){
    const self = this;
    self.do_sequence("RESET");
};

export { $RbSequence, $RbSequencer };