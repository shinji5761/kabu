// Angular
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController } from 'ionic-angular';

// Entity
import { ViewConfigEntity } from '../../entity/view/view-config-entity';
// import { ChartOption } from '../../entity/view/ChartOption';
import { IntervalOption } from '../../entity/view/interval-option';

// Provider
import { ViewConfigProvider } from '../../providers/view-config/view-config'; 
import { ApiAccessorProvider } from '../../providers/api-accessor/api-accessor';

// Modal
import { ViewConfigPage } from '../view-config/view-config';

// RequestParam
import { FinanceParam } from '../../../../common/requestParam/FinanceParam';


/**
 * @class ViewPage
 * @export
 */
@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
  providers : [ViewConfigProvider]
})
export class ViewPage {

    /**
     * GoogleChart
     */
    private chartData : any =  {
        chartType: 'CandlestickChart',
        dataTable: [
          ['Label', 'Low', 'Open', 'Close', 'End'],
          ['9:00', 9, 10, 11, 12],
          ['9:01', 9, 10, 11, 12],
          ['9:02', 9, 10, 11, 12]
        ]
        , options: {'title' : '1分足', 'legend': 'none'},
      };

      /**
       * ビューコンフィグ
       * @type {ViewConfigEntity}
       */
    private viewConfig : ViewConfigEntity = new ViewConfigEntity();

    /**
     * @constructor
     * @param navCtrl   {NavController}
     * @param navParams {NavParams}
     * @param modalCtrl {ModalController}
     * @param viewConfigProvider {ViewConfigProvider}
     */
    constructor(
        public navCtrl: NavController
        , public navParams: NavParams
        , public modalCtrl : ModalController
        , public viewConfigProvider : ViewConfigProvider
        , public menuCtrl : MenuController
        , public accessor : ApiAccessorProvider) {
        // 保存しているチャートオプションを取得する｡
        let saveConfig = this.viewConfigProvider.query();
        saveConfig.then(
            (value) => {
                if(value) {
                    this.viewConfig = value;
                }
                console.dir(this.viewConfig);
                this.getFinance();
            }
        );
    }

    ionViewDidLoad() {
    }

    /**
     * @method saveChartOption
     * @return {void}
     */
    private saveChartOption() : void {
        this.viewConfigProvider.save(this.viewConfig)
        .then(
            (result) => {
                console.log(result);
                // 保存成功を通知
            }
        ).catch(
            (error) => {
                console.error(error);
            }
)
    }


    private getFinance() : void {
        let api = this.accessor.getFinanceAccessor();
        let param : FinanceParam = new FinanceParam();
        param.code = 'USDJPY';
        param.market  = 'CURRENER';
        param.step = 60;
        param.limit = 10;

        api.get(param).subscribe(
            (result) => {
                console.dir(result);
            }
        );
    }


    /**
     * メニューボタンクリックイベント
     * @return {void}
     */
    private onClickMenuButton() : void {
        console.log('Menu');
        
        // モーダルの実行
        let modal = this.modalCtrl.create(ViewConfigPage, { 'viewConfig' : this.viewConfig});
        modal.present();
        modal.onDidDismiss(
            (result) => {
                console.log('onClickMenuButton.onDissmiss');
                this.saveChartOption();
            }
        );
    }

    private openMenu() {
        console.log('openMenu')
        this.menuCtrl.open();
    }

}
