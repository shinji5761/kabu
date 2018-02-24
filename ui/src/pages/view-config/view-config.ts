import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

// Entity
import { ViewConfigEntity } from '../../entity/view/view-config-entity';
import { ChartOption } from '../../entity/view/chart-option';

@IonicPage()
@Component({
    selector: 'page-view-config',
    templateUrl: 'view-config.html',
})
export class ViewConfigPage {
    /**
     * 表示間隔 選択キー
     * @type {String}
     */
    selectedIntervalKey : String = '1min';

    viewConfig : ViewConfigEntity = new ViewConfigEntity();

    /**
     * 
     * @param navCtrl {NavController}
     * @param navParams {NavParams}
     */
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
        this.viewConfig = this.navParams.get('viewConfig');
        console.dir(this.viewConfig);
        
        for(let interval of this.viewConfig.intervalOption) {
            if(interval.value) {
                this.selectedIntervalKey = interval.key;
            }
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ViewConfigPage');
    }

    /**
     * 表示間隔 変更イベント
     * @return {void}
     */
    changeIntervalOption() : void {
        // 選択された表示間隔を保存値に設定する｡
        for(let interval of this.viewConfig.intervalOption) {
            if(interval.key == this.selectedIntervalKey) {
                interval.value = true;
            }
            else {
                interval.value = false;
            }
        }
    }

    close() : void {
        this.viewCtrl.dismiss();
    }

}
