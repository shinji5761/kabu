/**
 * @class ChartOption
 * @export
 */
export class ChartOption {

    key : String = '';
    label : String = '';
    value : boolean = false;

    /**
     * @constructor
     * @param key   { String }  キー
     * @param label { String }  ラベル
     * @param value { boolean } 値
     */
    constructor(key : String, label : String, value : boolean) {
        this.key = key;
        this.label = label;
        this.value = value;
    }
}