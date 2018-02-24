import log4js = require('../../server/node_modules/log4js');


export class Logger {
    LOGGER : any;
    constructor(type : string) {
        // 
        const CONFIG_FILE = require('./' + type + '.json');
        // log4jsに設定
        log4js.configure(CONFIG_FILE);
        this.LOGGER = log4js.getLogger(type);
    }
    private createLog(cName : any, mName : string, message : string) : string {
        return '[' + cName + ']' + mName + ' : ' + message;
    }

    public printInfo(cName : any, mName : string, message : string) : void {
        this.LOGGER.info(this.createLog(cName, mName, message));
    }

    public printError(cName : any, mName : string, message : string) : void {
        this.LOGGER.info(this.createLog(cName, mName, message));
    }
}