/**
 * Created by stokaboka on 21.03.2016.
 * igorhorev@gmail.com
 */

/**
 * Oracle database plugin for Impress Application Server
 */

'use strict';

var db = api.db;

api.oracledb = require('oracledb', true);
api.simpleOracleDB = require('simple-oracledb', true);

if (api.oracledb && api.simpleOracleDB) {

    db.oracle = {};
    db.oracle.schema = {};
    db.drivers.oracle = api.oracledb;

    api.simpleOracleDB.extend(api.oracledb);

    /**
     * Open oracle database, create connection pool
     * @param database
     * @param callback
     */

    db.oracle.open = function(database, callback) {
        database.retryCounter++;
        var application = database.application;
        var __a_url = database.url.split(":");

        if(__a_url.length != 4){
            application.log.error("Incorrect URL string. Format URL string - oracle:user:password:oracle tns connection string");
        }

        /**
         *
         * config/databases.js
         *
         otm_agat: {
            // schema:user:password:oracle tns connection string
		    url: "oracle:otm:otm:(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = oracle)(PORT = 1521))(CONNECT_DATA = (SID = agatz)))",	// schema:user:password:oracle tns connection string
		    slowTime: 1000
		}
         */
        // 0 -schema = oracle
        database.user = __a_url[1];
        database.password = __a_url[2];
        database.connectString =  __a_url[3];

        api.oracledb.createPool (
            {
                // simple-oracledb options
                retryCount: 5, //The max amount of retries to get a connection from the pool in case of any error (default to 10 if not provided)
                retryInterval: 500, //The interval in millies between get connection retry attempts (defaults to 250 millies if not provided)
                runValidationSQL: true, //True to ensure the connection returned is valid by running a test validation SQL (defaults to true)
                validationSQL: 'SELECT 1 FROM DUAL', //The test SQL to invoke before returning a connection to validate the connection is open (defaults to 'SELECT 1 FROM DUAL')

                // oracledb options
                user          : database.user,
                password      : database.password,
                connectString : database.connectString,
                _enableStats  : false,   // true - to enable logs: pool._logStats();
                externalAuth  : false
            },
            function(err, pool)
            {
                pool.getConnection (function(err, connection){});
                db.oracle.pool = pool;
                database.pool = pool;

                if (err) {
                    application.log.error(JSON.stringify(err));
                }else{
                    application.log.debug("OracleDb pool created for user ["+database.user+"]");
                }

            }
        );

        callback();
    };

}
