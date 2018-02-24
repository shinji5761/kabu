export class OnlineEntity {
    code : string;
    date : Date;
    hour : number;
    min : number;
    sec : number;
    open : number;
    high : number;
    ask : number;
    bid : number;
    low : number;
    constructor(
          code : string
        , date : Date
        , hour : number
        , min : number
        , sec : number
        , open : number
        , high : number
        , ask  : number
        , bid  : number
        , low  : number
    ) {
        this.code = code;
        this.date = date;
        this.hour = hour;
        this.min = min;
        this.sec = sec;
        this.open = open;
        this.high = high;
        this.ask = ask;
        this.bid = bid;
        this.low = low;
    }


}