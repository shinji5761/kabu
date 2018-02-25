/**
 * 表示足間隔オプション
 */
export class IntervalOption {
    /**
     * キー
     * 為替情報を取得するさいに
     * 検索するキーとなる｡
     * @type { string }
     */
    key : string = '';
    /**
     * ラベル
     * @type { string }
     */
    label : string = '';
    
    /**
     * 選択状態
     * @type { boolean }
     */
    value : boolean = false;

    constructor(key : string, label : string, value : boolean) {
        this.key = key;
        this.label = label;
        this.value = value;
    }

}