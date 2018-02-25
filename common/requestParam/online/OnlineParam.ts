import { Param } from '../common/Param';

/**
 * @class
 * 
 */
export class OnlineParam extends Param {

    /**
     * 取引コード
     */
    code : string;

    /**
     * 対象日
     */
    date : string;

    constructor() {
        super();
    }
}