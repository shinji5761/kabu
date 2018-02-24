// Angular
import { HttpClient } from '@angular/common/http';

/**
 * 
 */
export abstract class CommonAccessor {
    /**
     * host
     * @type {string}
     */
    protected host : string = "http://localhost";

    /**
     * port
     * @type {string}
     */
    protected port : string = "8080";

    /**
     * url
     * @type {string}
     */
    protected url : string;

    constructor(protected http : HttpClient, url : string) {
        this.url = url;
    }


    protected getUrl() : string {
        return this.host + ":" + this.port + "/" + this.url;
    }

}