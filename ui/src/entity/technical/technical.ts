
export abstract class Technical {
    /**
     * テクニカルチャート種別
     * @type { string }
     */
    type : string;

    /**
     * ラベル
     * @type { string }
     */
    label : string;

    /**
     * チャートパラメータ
     * @type { Array<any> }
     */
    params : Array<any>;

    constructor( type : string, label : string ) {
        this.type = type;
        this.label = label;
        this.params = new Array();
    }

}