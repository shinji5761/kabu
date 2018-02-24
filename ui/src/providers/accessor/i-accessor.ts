export interface IAccessor {
    get(param : any) : any;
    query() : any;
    post() : any;
    put() : any;
}