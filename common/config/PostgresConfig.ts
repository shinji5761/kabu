/**
 * @class PostgresConfig
 * @export
 */
export class PostgresConfig {
    /**
     * @type {string}
     */
    user : string;

    /**
     * @type {string}
     */
    host : string;

    /**
     * @type {string}
     */
    port : string;

    /**
     * @type {string}
     */
    database : string;

    /**
     * @constructor
     * @param user      {string} ユーザー名
     * @param host      {string} ホスト
     * @param port      {string} ポート
     * @param database  {string} データベース名
     */
    constructor(user : string, host : string, port : string, database : string) {
        this.user = user;
        this.host = host;
        this.port = port;
        this.database = database;
    }
}