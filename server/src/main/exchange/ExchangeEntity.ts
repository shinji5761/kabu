/**
 * @class Exchange
 */
export class ExchangeEntity {
    /**
     * @type {string}
     */
    public symbol: string;

    /**
     * 価格
     * @type {number}
     */
    public price: number;

    /**
     * 売値
     * @type {number}
     */
    public bid: number;

    /**
     * 買値
     * @type {number}
     */
    public ask: number;

    /**
     * 時刻
     * @type {number}
     */
    public timestamp: number;

    /**
     * @constructor
     */
    constructor(symbol) {
        this.symbol = symbol;
    }
}