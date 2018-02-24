// http request
import {XMLHttpRequest } from '../../../node_modules/xmlhttprequest';
const XHR : XMLHttpRequest = new XMLHttpRequest();

// Extends
import { Batch } from '../common/Batch';

// Config
import OnlineConfig = require('../../../../common/config/OnlineConfig.json');

// Entity
import { OnlineEntity } from './OnlineEntity';

export class OnlineBatch extends Batch {

    url : string;

    constructor() {
        super();
        this.url = OnlineConfig['url'];
        this.logger.printInfo(OnlineBatch.name, 'constructor', 'url : ' + this.url);
    }

    /**
     * get
     * @return { Array<OnlineEntity> }
     */
    public get() : Array<OnlineEntity> {
        let data : Array<OnlineEntity> = [];
        try {
            XHR.open('GET', this.url, false);           // データ取得
            XHR.send();
            this.logger.printInfo( OnlineBatch.name, 'get', XHR.responseText );

            let date  = new Date();                                 // 実行日時
            for( let q of JSON.parse( XHR.responseText ).quotes ) { // データ作成
                data.push(new OnlineEntity(
                      q.currencyPairCode
                    , date
                    , date.getHours()
                    , date.getMinutes()
                    , date.getSeconds()
                    , q.open
                    , q.high
                    , q.ask
                    , q.bid
                    , q.low
                ));
            }
        }
        catch( e ) {
            this.logger.printError( OnlineBatch.name, 'get', e );
        }
        return data;
    }

    /**
     * 
     * @param data { OnlineEntity }
     */
    public save( data : OnlineEntity ) : void {
        this.logger.printInfo( OnlineBatch.name, 'save', 'start');
        try {
            this.pool.connect( ( error, client, done ) => {     // DB(pool)に接続
                if( error ) {       // 接続に失敗した場合
                    this.logger.printError( OnlineBatch, 'save', 'pool.connect Error : ' + error);
                }
                else {              // 接続に成功した場合
                    let sql = 'INSERT INTO online VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
                    let param = [data['code'], data['date'], data['hour'], data['min'], data['sec'], data['open'], data['high'], data['ask'], data['bid'], data['low']];
                    this.logger.printInfo(OnlineBatch.name, 'save', 'sql : ' + sql);
                    this.logger.printInfo(OnlineBatch.name, 'save', 'param : ' + JSON.stringify(param));
                    client.query( sql, param, ( error, res ) => {       // DBに登録
                        if( error ) {
                            this.logger.printError( OnlineBatch, 'save', 'client.query Error : ' + error);
                        }
                        done();
                    });
                }
            });
        } catch( e ) {
            this.logger.printError( OnlineBatch, 'save', 'e : ' + e);
            this.logger.printError( OnlineBatch, 'save', 'data : ' + JSON.stringify(data));
        }
        this.logger.printInfo( OnlineBatch.name, 'save', 'end');
    }

}