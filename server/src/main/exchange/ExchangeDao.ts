// Common
import { Dao } from '../common/Dao';

// Exchange
import { ExchangeEntity } from './ExchangeEntity';

// Logger
import { Logger } from '../../../../common/logger/Logger';
const logger = new Logger('server');

/**
 * @class ExchaneDao
 * @extends Dao
 */
export class ExchangeDao extends Dao {

    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * @method get
     * @param param     {ExchangeEntity} 検索パラメータ
     * @param callback  {Function}       コールバック関数
     */
    public get(param : ExchangeEntity, callback : Function) : void {
        logger.printInfo(ExchangeDao.name, 'get', 'start');
        let pool = this.getPool();
        // Postgreに接続
        pool.connect((err, client, done) => {
            if(err) {
                callback.call(err);
            }
            let sql = 'SELECT * FROM exchange WHERE symbol = $1';
            logger.printInfo(ExchangeDao.name, 'get', 'sql = ' + sql + ', symbol = ' + param.symbol);
            // Queryを実行
            client.query(
                sql, [param.symbol], (err, result) => {
                if(err) {
                    callback.call(err);
                    done();
                }
                // 結果を出力
                this.printQueryLog(result);

                // 結果を返却する｡
                callback.call(false, result.rows);
                done();
            });
        });
    };
}