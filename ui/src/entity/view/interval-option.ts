/**
 * 表示足間隔オプション
 */
export class IntervalOption {
    /**
     * キー
     * 為替情報を取得するさいに
     * 検索するキーとなる｡
     * @type {String}
     */
    key : String = '';
    /**
     * ラベル
     * @type {String}
     */
    label : String = '';
    
    /**
     * 選択状態
     * @type {boolean}
     */
    value : boolean = false;

    constructor(key : String, label : String, value : boolean) {
        this.key = key;
        this.label = label;
        this.value = value;
    }

}