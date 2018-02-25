// Common
import { Dao } from '../common/Dao';

// Online
import { OnlineParam } from '../../../../common/requestParam/online/OnlineParam';

// Logger
import { Logger } from '../../../../common/logger/Logger';
const logger = new Logger('server');

/**
 * @class ExchaneDao
 * @extends Dao
 */
export class OnlineDao extends Dao {

    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * @method get
     * @param param     {OnlineEntity} 検索パラメータ
     * @param callback  {Function}       コールバック関数
     */
    public get(param : OnlineParam, callback : Function) : void {
        logger.printInfo(OnlineDao.name, 'get', 'start');
        let pool = this.getPool();

        // Postgreに接続
        pool.connect((err, client, done) => {
            if(err) {
                callback.call(err);
            }
            let sql : string = `
                    SELECT
                          hour
                        , min
                        , high
                        , open
                        , ask
                        , bid
                        , low
                    FROM online_one_min
                    WHERE
                        code = $1
                    AND
                        date = $2
                    ORDER BY hour DESC, min DESC;`;
            logger.printInfo(
                OnlineDao.name, 'get', 'sql = ' + sql
                + ', $1 = ' + param.code
                + ', $2 = ' + param.date
            );
            // Queryを実行
            client.query(
                sql, [ param.code, param.date ], (err, result) => {
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