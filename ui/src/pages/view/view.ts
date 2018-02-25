// Angular
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController } from 'ionic-angular';

// Entity
import { ViewConfigEntity } from '../../entity/view/view-config-entity';
// import { ChartOption } from '../../entity/view/ChartOption';
import { IntervalOption } from '../../entity/view/interval-option';
import { GoogleChartParam } from '../../entity/view/google-chart-param';

// Provider
import { ViewConfigProvider } from '../../providers/view-config/view-config'; 
import { ApiAccessorProvider } from '../../providers/api-accessor/api-accessor';

// Modal
import { ViewConfigPage } from '../view-config/view-config';

// RequestParam
import { OnlineParam } from '../../../../common/requestParam/online/OnlineParam';


/**
 * @class ViewPage
 * @export
 */
@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
  providers : [ ViewConfigProvider ]
})
export class ViewPage {

    /**
     * GoogleChart
     * @type { any }
     */
    private chartData : any;

    /**
     * ビューコンフィグ
     * @type { ViewConfigEntity }
     */
    private viewConfig : ViewConfigEntity = new ViewConfigEntity();

    /**
     * @constructor
     * @param navCtrl   { NavController }
     * @param navParams { NavParams }
     * @param modalCtrl { ModalController }
     * @param viewConfigProvider { ViewConfigProvider }
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
            ( value ) => {
                if( value ) {
                    this.viewConfig = value;
                }
                console.dir( this.viewConfig );
                this.getViewData();
            }
        );
    }

    ionViewDidLoad() {
    }

    /**
     * @method saveChartOption
     * @return { void }
     */
    private saveChartOption() : void {
        this.viewConfigProvider.save(this.viewConfig)
        .then(
            (result) => {
                console.log(result);
                // todo:保存成功を通知
                this.getViewData();     // データの再取得
            }
        ).catch(
            (error) => {
                console.error(error);
            }
        );
    }

    /**
     * @method getViewData
     * @return { void }
     */
    private getViewData() : void {
        let api = this.accessor.getOnlineAccessor();
        let param : OnlineParam = new OnlineParam();
        param.code = 'USDJPY';
        param.date = '2018年01月01日';

        api.get(param).subscribe(
            (result) => {
                console.dir(result);
                // チャートデータの作成
                this.chartData = this.createChartData(result);
            }
        );
    }

    /**
     * @method createChartData
     * @param result { any }
     * @return { GoogleChartParam }
     */
    private createChartData(result : any) : GoogleChartParam {
        let title : string = '';
        for( let selected of this.viewConfig.intervalOption ) { // 選択しているタイトルを取得する｡
            if( selected.value ) {
                title = selected.label;
            }
        }

        let chartType : string = 'ComboChart';
        let options : any = {
            'title' : title
          , 'legend': 'none'
          , 'seriesType' : 'candlesticks'
          , 'series' : { '1' : { 'type' : 'line' } }
        };
        let dataTable : Array<any> = [];
        for( let data of result ) {
            let pData = [];
            pData.push(data.hour + ':' + data.min)  // Label
            pData.push(data.low);                   // Low
            pData.push(data.open);                  // Open
            pData.push(data.bid);                   // Close
            pData.push(data.high);                  // High
            pData.push(50);                         // MA
            dataTable.unshift(pData);
        }
        dataTable.unshift( [ 'Label', 'Low', 'Open', 'Close', 'High', 'MA' ] );
        return new GoogleChartParam(chartType, dataTable, options);
    }


    /**
     * メニューボタンクリックイベント
     * @method onClickMenuButton
     * @private
     * @return { void }
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

    /**
     * @method openMenu
     * @return { void }
     */
    private openMenu() : void {
        console.log('openMenu')
        this.menuCtrl.open();
    }

}
