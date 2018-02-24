import { Controller } from '../common/Controller';

// User
import { UserDao } from './UserDao';
import { UserService } from './UserService';
const dao = new UserDao();
const service = new UserService();


// Log
import { Logger } from '../../../../common/logger/Logger';
const logger = new Logger('server');

/**
 * @class UserController
 * @extends Controller
 */
export class UserController extends Controller {
    /**
     * @constructor
     */
    constructor() {
        super('/user');
    }

    /**
     * @method  get
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public get(request, response) : void {
        logger.printInfo(UserController.name, 'get', 'start');
        response.send('user');
    }

    /**
     * @method  post
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public post(request, response) : void {
        logger.printInfo(UserController.name, 'post', 'start');

    }

    /**
     * @method  put
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public put(request, response) : void{
        logger.printInfo(UserController.name, 'put', 'start');
    }

    /**
     * @method  delete
     * @param   request   {any}   リクエスト
     * @param   response  {any}   レスポンス
     * @return {void}
     */
    public delete(request, response) : void{
        logger.printInfo(UserController.name, 'delete', 'start');
    }
}