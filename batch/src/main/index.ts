// import { ExchangeBatch } from './exchange/ExchangeBach';

// let exchange = new ExchangeBatch();
// exchange.getSymbols(() => {
//     exchange.getQuotes(exchange.symbols);
//     // for(let symbol of exchange.symbols) {
//     //     exchange.getQuotes(symbol);
//     // }
// });


// import { FinanceBatch } from './finance/FinanceBatch';
// import { FinanceParamEntity } from './finance/FinanceParamEntity';

// let q = process.argv[2];
// let x = process.argv[3];
// let i = process.argv[4];
// let p = process.argv[5];


// let finance = new FinanceBatch();
// let param = new FinanceParamEntity(
//       q
//     , x
//     , i
//     , p
// );
// finance.get(param);


import { OnlineBatch } from './online/OnlineBatch';

let online = new OnlineBatch();
let count = 0;
let interval = setInterval(
    () => {
        let quotes : Array<any> = online.get();
        
        for(let data of quotes ) {
            online.save(data);
        }
        count++;
        if( count > ( 60 / 5 ) ) {
            clearInterval( interval );
        }
    }
    , 5000
);