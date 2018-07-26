/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

/**
 * Created by stokaboka on 12.08.2016.
 */

/**
 * DataRourceEvent
 */

"use strict";

let $RbDataSourceEvent = function(___id, ___listener){
    const self = this;
    self.id = ___id;
    self.listener = ___listener;
};

$RbDataSourceEvent.prototype.EVENTS = {
    BEFORE_QUERY: 'BEFORE_QUERY',
    BEFORE_RELATION_QUERY: 'BEFORE_RELATION_QUERY',
    BEFORE_NEW_ROW: 'BEFORE_NEW_ROW',
    BEFORE_COMMIT_TRANSACTION: 'BEFORE_COMMIT_TRANSACTION',
    BEFORE_ROLLBACK_TRANSACTION: 'BEFORE_ROLLBACK_TRANSACTION',

    ON_RECORD_SELECTED: 'ON_RECORD_SELECTED',

    AFTER_DATA_LOADED: 'AFTER_DATA_LOADED',
    AFTER_DATA_SAVED: 'AFTER_DATA_SAVED',
    AFTER_SEQUENCER: 'AFTER_SEQUENCER'
};

export default $RbDataSourceEvent;