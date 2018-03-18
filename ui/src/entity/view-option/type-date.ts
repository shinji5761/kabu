import { Type } from './type';

/**
 * @class TypeDate
 * @extends { Type }
 */
export class TypeDate extends Type {
    /**
     * ラベル
     * @type { string }
     */
    label : string;

    /**
     * 値(日付 : yyyy-MM-dd)
     * type { string }
     */
    value : string;

    /**
     * 表示フォーマット
     * @type { string }
     */
    format : string;

    /**
     * @constructor
     * @param label  { string } ラベル
     * @param value  { string } 値(日付)
     * @param format { string } 表示フォーマット
     */
    constructor( label : string, value : string, format : string ) {
        super( 'date' );
        this.label = label;
        this.value = value;
        this.format = format;
    }
}