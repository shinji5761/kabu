// http request
import {XMLHttpRequest } from '../../../node_modules/xmlhttprequest';
const XHR : XMLHttpRequest = new XMLHttpRequest();

import { Batch } from '../common/Batch';

// FinanceConfig
import FinanceConfig = require('../../../../common/config/FinanceConfig.json');

// Entity
import { FinanceParamEntity } from './FinanceParamEntity' ;
import { FinanceEntity } from './FinanceEntity' ;

/**
 * @class FinanceBatch
 * @extends Batch
 */
export class FinanceBatch extends Batch {
    url : string;

    constructor() {
        super();
        this.url = FinanceConfig['url'];
        this.logger.printInfo(FinanceBatch.name, 'constructor', 'url : ' + this.url);
   }

    /**
     * get
     * @param param {FinanceParamEntity} 取得パラメータ
     */
    public get(param : FinanceParamEntity) : void {
        this.logger.printInfo(FinanceBatch.name, 'get', 'start');

        let url : string = this.url + param.createParama();
        this.logger.printInfo(FinanceBatch.name, 'get', 'uri : ' + url);

        try {
            XHR.open('GET', url, false);
            XHR.send();
            this.logger.printInfo(FinanceBatch.name, 'get', XHR.responseText);
        }
        catch(error) {
            this.logger.printError(FinanceBatch.name, 'get', error);
        }
    }

}