// Common
import { Controller }   from '../common/Controller';

// Exchange
import { ExchangeEntity }   from './ExchangeEntity';
import { ExchangeDao }      from './ExchangeDao';
import { ExchangeService }  from './ExchangeService';
const dao = new ExchangeDao();
const service = new ExchangeService();

// Logger
import { Logger } from '../../../../common/logger/Logger';
const logger = new Logger('server');


/**
 * @class ExchangeController
 * @extends Controller
 */
export class ExchangeController extends Controller {
    /**
     * @constructor
     */
    constructor() {
        super('/exchange');
    }

    /**
     * @method  get
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public get(request, response) : void {
        logger.printInfo(ExchangeController.name, 'get', 'start');
        let symbol : string = request.query.symbol;
        let exchange : ExchangeEntity = new ExchangeEntity(symbol);
        
        dao.get(exchange, (err, result) => {
            if(err) {
                logger.printError(ExchangeController.name, 'get', err);
                response.send(err);
                return;
            }
            response.send(result);
        });
    }

    /**
     * @method  post
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public post(request, response) : void {
        logger.printInfo(ExchangeController.name, 'post', 'start');
    }

    /**
     * @method  put
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public put(request, response) : void{
        logger.printInfo(ExchangeController.name, 'put', 'start');
    }

    /**
     * @method  delete
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public delete(request, response) : void{
        logger.printInfo(ExchangeController.name, 'post', 'start');
    }
}