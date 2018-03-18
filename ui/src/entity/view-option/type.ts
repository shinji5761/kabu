/**
 * @class Type
 * @abstract
 * @export
 */
export abstract class Type {
    /**
     * 種別
     * @type { string }
     */
    public type : string;

    /**
     * @constructor
     * @param type { string } 種別
     */
    constructor( type : string ) {
        this.type = type;
    }

}