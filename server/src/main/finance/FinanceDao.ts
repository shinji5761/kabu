// Common
import { Dao } from '../common/Dao';

// Finance
import { FinanceParam } from '../../../../common/requestParam/FinanceParam';

// Logger
import { Logger } from '../../../../common/logger/Logger';
const logger = new Logger('server');

/**
 * @class ExchaneDao
 * @extends Dao
 */
export class FinanceDao extends Dao {

    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * @method get
     * @param param     {FinanceEntity} 検索パラメータ
     * @param callback  {Function}       コールバック関数
     */
    public get(param : FinanceParam, callback : Function) : void {
        logger.printInfo(FinanceDao.name, 'get', 'start');
        let pool = this.getPool();

        // Postgreに接続
        pool.connect((err, client, done) => {
            if(err) {
                callback.call(err);
            }
            let sql = 'SELECT * FROM finance WHERE '
                    + 'market = $1 AND code = $2 AND step = $3 '
                    + 'ORDER BY time DESC LIMIT $4';
            logger.printInfo(
                FinanceDao.name, 'get', 'sql = ' + sql
                + ', market = ' + param.market
                + ', code = ' + param.code
                + ', step = ' + param.step
                + ', limit = ' + param.limit
            );
            // Queryを実行
            client.query(
                sql, [ param.market, param.code, param.step, param.limit ], (err, result) => {
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