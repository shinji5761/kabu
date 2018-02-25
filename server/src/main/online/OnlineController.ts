// Common
import { Controller }   from '../common/Controller';

// Online
import { OnlineEntity }   from './OnlineEntity';
import { OnlineDao }      from './OnlineDao';
import { OnlineService }  from './OnlineService';

import { OnlineParam }    from '../../../../common/requestParam/online/OnlineParam';

const dao = new OnlineDao();
const service = new OnlineService();

// Logger
import { Logger } from '../../../../common/logger/Logger';
const logger = new Logger('server');


/**
 * @class OnlineController
 * @extends Controller
 */
export class OnlineController extends Controller {
    /**
     * @constructor
     */
    constructor() {
        super('/online');
    }

    /**
     * @method  get
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public get(request, response) : void {
        logger.printInfo(OnlineController.name, 'get', 'start');
        let param : OnlineParam = new OnlineParam();
        param = request.query;

        dao.get(param, (err, result) => {
            if(err) {
                logger.printError(OnlineController.name, 'get', err);
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
        logger.printInfo(OnlineController.name, 'post', 'start');
    }

    /**
     * @method  put
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public put(request, response) : void{
        logger.printInfo(OnlineController.name, 'put', 'start');
    }

    /**
     * @method  delete
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public delete(request, response) : void{
        logger.printInfo(OnlineController.name, 'post', 'start');
    }
}