/**
 * @class Controller
 * @abstract
 */
export abstract class Controller {
    /**
     * @private
     * @type {string}
     */
    private url : string;

    /**
     * @constructor
     * @param   url {string}    URL
     */
    constructor(url : string) {
        this.url = url;
    }

    /**
     * @method  get
     * @abstract
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public abstract get(request, response) : void;

    /**
     * @method  post
     * @abstract
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public abstract post(request, response) : void;

    /**
     * @method  put
     * @abstract
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public abstract put(request, response) : void;

    /**
     * @method  delete
     * @abstract
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public abstract delete(request, response) : void;


    /**
     * Getter(url)
     * @return {string}
     */
    public getUrl() : string {
        return this.url;
    }

    /**
     * Setter(url)
     * @param   url {string}    URL
     * @return  {void}
     */
    public setUrl(url : string) : void {
        this.url = url;
    }

}