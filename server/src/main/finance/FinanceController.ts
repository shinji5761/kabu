// Common
import { Controller }   from '../common/Controller';

// Finance
import { FinanceEntity }   from './FinanceEntity';
import { FinanceDao }      from './FinanceDao';
import { FinanceService }  from './FinanceService';

import { FinanceParam }    from '../../../../common/requestParam/FinanceParam';

const dao = new FinanceDao();
const service = new FinanceService();

// Logger
import { Logger } from '../../../../common/logger/Logger';
const logger = new Logger('server');


/**
 * @class FinanceController
 * @extends Controller
 */
export class FinanceController extends Controller {
    /**
     * @constructor
     */
    constructor() {
        super('/finance');
    }

    /**
     * @method  get
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public get(request, response) : void {
        logger.printInfo(FinanceController.name, 'get', 'start');
        let param : FinanceParam = new FinanceParam();
        param = request.query;

        dao.get(param, (err, result) => {
            if(err) {
                logger.printError(FinanceController.name, 'get', err);
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
        logger.printInfo(FinanceController.name, 'post', 'start');
    }

    /**
     * @method  put
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public put(request, response) : void{
        logger.printInfo(FinanceController.name, 'put', 'start');
    }

    /**
     * @method  delete
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public delete(request, response) : void{
        logger.printInfo(FinanceController.name, 'post', 'start');
    }
}