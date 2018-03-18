import { Type } from './type';
import { TypeButton } from './type-button';

/**
 * @class TypeList
 * @extends { Type }
 */
export class TypeButtons extends Type {

    /**
     * リスト表示アイテム
     * @type { Array<TypeButton> }
     */
    list : Array<TypeButton>;

    /**
     * @constructor
     * @param list { Arrary<TypeButton> }
     */
    constructor( list : Array<TypeButton> ) {
        super( 'buttons' );
        this.list = list;
    }

}