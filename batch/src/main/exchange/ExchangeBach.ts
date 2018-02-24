import { ForexDataClient } from '../../../node_modules/forex-quotes/ForexDataClient';
import { Pool, Clinet }  from '../../../node_modules/pg';

// configファイル
import { PostgresConfig } from '../../../../common/config/PostgresConfig';
import config = require('../../../../common/config/ExchangeConfig.json');
import psConfig = require('../../../../common/config/PostgresConfig.json');

// Logger
import { Logger } from '../../../../common/logger/Logger';
const logger = new Logger('batch');

// 1FORGE API KEY
const KEY : string = config.apiKey; 

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

// Postgres Pool
const POOL = new Pool(pgConfig);

/**
 * @class ExchangeBatch
 */
export class ExchangeBatch {
    /**
     * @type {any}
     */
    ForexDataClient : any;

    /**
     * 
     */
    pgClient : any;

    symbols : Array<string>;
    
    constructor() {
        logger.printInfo(ExchangeBatch.name, 'constructor', 'start');
        this.ForexDataClient = new ForexDataClient(KEY);
        POOL.on('error', (err, client) => {
            logger.printError(ExchangeBatch.name, 'constructor', err);
            process.exit(-1);
        });
    }

    getSymbols(callback) : void {
        logger.printInfo(ExchangeBatch.name, 'getSymbols', 'start');
        this.ForexDataClient.getSymbols().then(response => {
            logger.printInfo(ExchangeBatch.name, 'getSymbols', 'get OK');
            this.symbols = response;
            callback.call();
        });
    }


    getQuotes(symbol : any) : void {
        logger.printInfo(ExchangeBatch.name, 'getQuotes', 'start');
        this.ForexDataClient.getQuotes(symbol).then((res) => {
            logger.printInfo(ExchangeBatch.name, 'getQuotes', 'OK');
            // dbに登録する
            for(let data of res) {
                POOL.connect((err, client, done) => {
                    if(err) {
                        logger.printError(ExchangeBatch.name, 'getQuotes', err);
                    }
                    // 取得したデータを登録する｡
                    let sql = 'INSERT INTO exchange VALUES($1, $2, $3, $4, $5)';
                    let param = [data.symbol, data.bid, data.price, data.ask, data.timestamp];
                    logger.printInfo(ExchangeBatch.name, 'getQuotes', 'sql=' + sql);
                    logger.printInfo(ExchangeBatch.name, 'getQuotes', 'param=' + JSON.stringify(param));
                    client.query(sql, param, (error, res) => {
                        if(err) {
                            logger.printError(ExchangeBatch.name, 'getQuotes', err);
                        }
                        done();
                    });
                });
            };
        });
    }


}