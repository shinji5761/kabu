// Angular
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ViewChild } from '@angular/core/src/metadata/di';

// Entity
import { ViewOption } from '../../entity/view-option/view-option';

/**
 * @class ViewOptionProvider
 * @export
 */
@Injectable()
export class ViewOptionProvider {

    KEY = 'viewOption';

    /**
     * @constructor
     * @param storage {Strage} WebSQL Strage
     */
    constructor(public storage : Storage) {
    }

    /**
     * 取得
     * @method saveViewConfig
     * @param viewConfig {ViewConfigEntity}
     * @return {any}
     */
    public query() : any {
        return this.storage.get(this.KEY);
    }


    /**
     * ViewOption 保存
     * @param viewOption { Array<any> }
     * @return {any}
     */
    public save( viewOption : Array<any> ) : any {
        // Config
        return this.storage.set(this.KEY, viewOption);
    }
}
