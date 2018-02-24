// Angular
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

// API
import { CommonAccessor } from './common-accessor';
import { IAccessor } from './i-accessor';

/**
 * 
 */
export class ExchangeAccessor extends CommonAccessor implements IAccessor {
    constructor(http : HttpClient) {
        super(http, 'exchange');
    }

    get(param : any) : any {
        return this.http.get(
            this.getUrl() + '?symbol=EURUSD'
        );
    }
    query() : any {

    }
    post() : any {

    }
    put() : any {

    }

}