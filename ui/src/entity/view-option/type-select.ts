import { Type } from './type';

/**
 * @class TypeSelect
 * @extends Type
 */
export class TypeSelect extends Type {
    /**
     * ラベル
     * @type { string }
     */
    label : string;

    /**
     * 選択中のアイテム
     * @type { string }
     */
    selected : string;

    /**
     * 選択肢リスト
     * @type { Array<any> }
     */
    options : Array<any>;

    /**
     * @constructor
     * @param label     { string }      ラベル
     * @param selected  { string }      選択中のアイテム
     * @param options   { Array<any> }  選択肢リスト
     */
    constructor( label : string, selected : string, options : Array<any> ) {
        super( 'select' );
        this.label = label;
        this.selected = selected;
        this.options = options;
    }



}