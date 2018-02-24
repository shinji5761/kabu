import config = require('../../../../common/config/PostgresConfig.json');
import { Pool, Client} from '../../../node_modules/pg';
import { PostgresConfig } from '../../../../common/config/PostgresConfig';
import { Logger } from '../../../../common/logger/Logger';
const logger = new Logger('server');


// Postgres Config
const pgConfig = new PostgresConfig(
    config.user, config.host, config.port, config.database
);

// Postgres Pool
const pool : Pool = new Pool(pgConfig);

/**
 * @class Dao
 * @abstruct
 */
export abstract class Dao {

    /**
     * 
     */
    constructor() {

    }

    /**
     * @method getPool
     * @public
     * @return {Pool}
     */
    getPool() : Pool {
        return pool;
    }

    /**
     * @method get
     * @abstract
     * @param params    {any}       検索パラメータ
     * @param callBack  {Function}  コールバック関数
     */
    public abstract get(params : any, callBack : Function) : void;

    /**
     * 検索結果 ログ出力
     * @param result {any} 検索結果
     */
    protected printQueryLog(result : any) : void{
        logger.printInfo(this.constructor.name, 'printQueryLog', 'command : ' + result.command);
        logger.printInfo(this.constructor.name, 'printQueryLog', 'rows : ' + JSON.stringify(result.rows));
    }
}