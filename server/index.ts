// Application
import express          = require('express');
import session          = require('express-session');
import cookieParser     = require('cookie-parser');
import bodyParser       = require('body-parser');

// OAuth
import passport         = require('passport');
import passportGoogleOAuth = require('passport-google-oauth');
import oauth            = require('./Oauth');

// Logger
import { Logger } from '../common/logger/Logger';
const logger = new Logger('server');

// Controller
import { UserController } from './src/main/user/UserController';
const userCtrl = new UserController();
import { ExchangeController } from './src/main/exchange/ExchangeController';
const exchangeCtrl = new ExchangeController();
import { FinanceController } from './src/main/finance/FinanceController';
const financeCtrl = new FinanceController();

// app const
const app = express();

// passport const
const CLIENT_ID         = oauth.web.client_id;
const CLIENT_SECRE      = oauth.web.client_secret;
const REQUIRED_URIS     = oauth.web.redirect_uris[0];
const GoogleStrategy    = passportGoogleOAuth.OAuth2Strategy;

console.log(CLIENT_ID);

// other
const PORT = process.env.PORT || 8080;
const sessionOption = {
    'secret' : 'secret'
};

/**
 * Server Main
 * @class Main
 */
class Main {
    /**
     * @constructor
     */
    constructor() {
        logger.printInfo(Main.name, 'Constructor', 'start');
        // Setting Midleware
        this.settingMidleware();

        // Setting OAuth
        this.settingOAuth();

        // Setting Router
        this.settingRouter();

        // run
        this.run();
    }

    /**
     * 
     * @return {void}
     */
    private settingMidleware() : void {
        logger.printInfo(Main.name, 'settingMidleware', 'start');
        app.use(express.static('public'));
        app.use(cookieParser());
        app.use(bodyParser());
        app.use(session(sessionOption));
        app.use(passport.initialize());
        app.use(passport.session());

        // Cross-Orign
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');	
            res.header('Access-Control-Allow-Method', 'GET, POST, OPTIONS');	
            next();
        });
    }

    /**
     * 
     * @return {void}
     */
    private settingOAuth() : void {
        logger.printInfo(Main.name, 'settingOAuth', 'start');
        passport.use(
            new GoogleStrategy( {
                'clientID'       : CLIENT_ID
                , 'clientSecret' : CLIENT_SECRE
                , 'callbackURL'  : REQUIRED_URIS
            }, (accessToken, refreshToken, profile, done) => {
                done(null, profile);
            })
        );

        passport.serializeUser((user, done) => {
            logger.printInfo(Main.name, 'serializeUser', 'start');
            // user情報をセッションに登録する｡
            done(null, user);
        });

        passport.deserializeUser((user, done) => {
            // Routerが呼ばれるたびに実行される｡
            // reqに､user情報を付加する｡
            logger.printInfo(Main.name, 'deserializeUser', 'start');

            // findUser (データベースなどから､ユーザーに関する情報を取得する)
            var dbInfo = {'name' : '氏名', 'age' : 20, 'hogehoge' : 'hogehoge'};
            // req.userに追加される
            done(null, dbInfo);
        });
    }

    /**
     * 
     * @return {void}
     */
    private settingRouter() : void {
        logger.printInfo(Main.name, 'settingController', 'start');

        // Controller
        app.get(userCtrl.getUrl(), userCtrl.get);
        app.get(exchangeCtrl.getUrl(), exchangeCtrl.get);
        app.get(financeCtrl.getUrl(), financeCtrl.get);



        // Google OAuth
        app.get('/auth/google', passport.authenticate('google', {'scope' : ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']}));
        // Google OAuth CallBack
        app.get('/auth/google/callback', 
            // 認証に失敗した場合､/loginにリダイレクト
            passport.authenticate('google', { 'failureRedirect': '/login' }),
            (req, res) => {
                // 認証に成功した場合､/homeへリダイレクト
                res.redirect('/home');
        });
        // Home
        app.get('/home', (req, res) => {
            // Sessionごとのユーザー情報
            console.log(req.session.passport.user);
            // deserializeで追加されたユーザー情報
            res.send(req.user);
        })
        // Login
        app.get('/login', (req, res) => {
            res.send(req.user);
        });

    }

    /**
     * Server Run
     */
    private run() : void {
        logger.printInfo(Main.name, 'run', 'start');
        // Listen
        app.listen(PORT, (error) => {
            if( error ) {
                logger.printError(Main.name, 'run', 'error' + error);
                return;
            }
            logger.printInfo(Main.name, 'run', 'Listen port = ' + PORT);
        })
    }

}


var main = new Main();