// logger
import { Logger } from '../../../../common/logger/Logger';

// postgres
import { PostgresConfig } from '../../../../common/config/PostgresConfig';
import { Pool, Clinet }  from '../../../node_modules/pg';
import psConfig = require('../../../../common/config/PostgresConfig.json');

// Postgres User ID
const PG_USER : string = psConfig.pgUser;
// Postgres Host
const PG_HOST : string = psConfig.pgHost;
// Postgres Port
const PG_PORT : string = psConfig.pgPort;
// Postgres Database
const DATABASE : string = psConfig.database;
// PostgresConfig
let pgConfig = new PostgresConfig(PG_USER, PG_HOST, PG_PORT, DATABASE);


/**
 * バッチ共有用クラス
 * loggerやpostgresなどの設定を共有する｡
 * @class Batch
 * @abstract
 */
export abstract class Batch {
    /**
     * Log4Js
     * @type {any}
     */
    logger : any;

    /**
     * Postgres Pool
     * @type {any}
     */
    pool : any;

    constructor() {
        this.logger = new Logger('batch');
        this.pool = new Pool(pgConfig);
    }
}