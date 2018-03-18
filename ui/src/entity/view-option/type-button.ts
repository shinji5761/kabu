import { Type } from './type';

/**
 * @class TypeList
 * @extends { Type }
 */
export class TypeButton extends Type {

    /**
     * ボタン名
     */
    label : string;

    /**
     * ボタン色
     * @type { string }
     */
    color : string;

    /**
     * ボタン押下イベントハンドラ
     * @type { Function }
     */
    onClick : Function;

    /**
     * @constructor
     * @param label   { string }    ラベル名
     * @param color   { string }    ボタン色
     * @param onClick { Function }  ボタン押下イベントハンドラ
     */
    constructor( label : string, color : string, onClick : Function ) {
        super( 'button' );
        this.label = label;
        this.color = color;
        this.onClick = onClick;
    }

}