import { Type } from './type';
import { Technical } from '../technical/technical';

/**
 * @class TypeList
 * @extends { Type }
 */
export class TypeList extends Type {

    /**
     * スタイルシート
     * @type { Object }
     */
    style : Object;

    /**
     * リスト表示アイテム
     * @type { Array<any> }
     */
    items : Array<any>;

    constructor( style : Object, items : Array<any> ) {
        super( 'list' );
        this.style = style;
        this.items = items;
    }

}