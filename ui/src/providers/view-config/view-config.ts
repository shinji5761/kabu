// Angular
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ViewChild } from '@angular/core/src/metadata/di';

// Entity
import { ViewConfigEntity } from '../../entity/view/view-config-entity';

/**
 * @class ViewConfigProvider
 * @export
 */
@Injectable()
export class ViewConfigProvider {

    /**
     * @constructor
     * @param storage {Strage} WebSQL Strage
     */
    constructor(public storage : Storage) {
        console.log('[ViewConfigProvider]');
    }

    /**
     * 取得
     * @method saveViewConfig
     * @param viewConfig {ViewConfigEntity}
     * @return {any}
     */
    public query() : any {
        console.log('ViewConfigProvider.queryViewConfig');
        return this.storage.get('viewConfig');
    }


    /**
     * ビューコンフィグ 保存
     * @method saveViewConfig
     * @param viewConfig {ViewConfigEntity}
     * @return {any}
     */
    public save(viewConfig : ViewConfigEntity) : any {
        console.log('ViewConfigProvider.saveViewConfig');
        // Config
        return this.storage.set('viewConfig', viewConfig);
    }
}
