// Angular
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// API
import { CommonAccessor } from './common-accessor';
import { IAccessor } from './i-accessor';

// RequestParam
import { OnlineParam } from '../../../../common/requestParam/online/OnlineParam';

export class OnlineAccessor extends CommonAccessor implements IAccessor {
    constructor(http : HttpClient) {
        super(http, 'online');
    }

    get(param : any) : any {
        return this.http.get(
              this.getUrl()
            , { params : param }
        );
    }
    query() : any {

    }
    post() : any {

    }
    put() : any {

    }
}