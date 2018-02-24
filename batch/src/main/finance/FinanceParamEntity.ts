export class FinanceParamEntity {

    /**
     * 銘柄コード､通貨など
     * ex)7433,USDJPY
     * @type {string}
     */
    q : string;
    /**
     * 市場
     * ex) TYO CURRENTCY
     * @type {string}
     */
    x : string;
    /**
     * 間隔(秒)
     * @type {number}
     */
    i : number;
    /**
     * 取得日数
     * ex) 1D 1Y
     * @type {string}
     */
    p : string;
    /**
     * 取得データ
     * @type {string}
     */
    f : string;
    
    /**
     * @constructor
     * @param q {string}
     * @param x {string}
     * @param i {number}
     * @param p {string}
     */
    constructor(q,x,i,p) {
        this.q = q;
        this.x = x;
        this.i = i;
        this.p = p;
        this.f = 'o,h,l,c,v';
    }

    public createParama() : string {
        return (
              '?q=' + this.q
            + '&x=' + this.x
            + '&i=' + this.i
            + '&p=' + this.p
            + '&f=' + this.f);
    }

}