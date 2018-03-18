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

// ViewOption
import { ViewOption } from '../../entity/view-option/view-option';
import { TypeList } from '../../entity/view-option/type-list';
import { TypeButton } from '../../entity/view-option/type-button';
import { TypeButtons } from '../../entity/view-option/type-buttons';
import { Emvelopes } from '../../entity/technical/emvelopes';
import { ViewOptionProvider } from '../../providers/view-option/view-option';

/**
 * @class ViewPage
 * @export
 */
@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
  providers : [ ViewConfigProvider, ViewOptionProvider ]
})
export class ViewPage {

    /**
     * GoogleChart
     * @type { any }
     */
    private chartData : any = new GoogleChartParam('', [], {});

    /**
     * ビューコンフィグ
     * @type { ViewConfigEntity }
     */
    private viewConfig : ViewConfigEntity = new ViewConfigEntity();

    /**
     * viewOption
     * チャートに表示するデータの開始日やトレード種別
     * テクニカルに関するデータをまとめる｡
     * @type { Array<any> }
     */
    private viewOption : Array<any>;


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
        , public viewOptionProvider : ViewOptionProvider
        , public menuCtrl : MenuController
        , public accessor : ApiAccessorProvider) {
        // 初期値設定
        this.init();
    }

    /**
     * 画面を離れたときに呼ばれるイベントハンドラ
     */
    ionViewDidLeave() {
        this.saveViewOption().then(
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
     * 初期値設定処理
     * @private
     * @return { void }
     */
    private init() : void {
        this.viewOption = (new ViewOption( '2018-03-01', 'USDJPY', '1min')).viewOption;
        this.viewOption[1].push(
            new TypeList({  'max-height' : ( ( screen.height ) - ( screen.height / 3 ) - 200 ) + 'px', 'overflow' : 'scroll' }, [ new Emvelopes() ] )
        );
        this.viewOption[1].push( new TypeButtons( [ new TypeButton( '追加', 'success', () => { this.addTechnical() } ), new TypeButton('削除', 'danger', () => {console.log('onDanger');}) ] ) );

        // 保存しているチャートオプションを取得する｡
        let saveConfig = this.viewOptionProvider.query();
        saveConfig.then(
            ( value ) => {
                if( value ) {
                    this.viewOption[0] = value[0];
                    this.viewOption[1][0] = value[1][0];
                }
                console.dir( this.viewOption );
                this.getViewData();
            }
        );
    }

    /**
     * 
     * @return { any }
     */
    private saveViewOption() : any {
        return this.viewOptionProvider.save(this.viewOption);
    }

    /**
     * 表示データの取得
     * @private
     * @return { void }
     */
    private getViewData() : void {
        let api = this.accessor.getOnlineAccessor();
        let param : OnlineParam = new OnlineParam();
        param.date = this.viewOption[0][0].value;       // 日付
        param.code = this.viewOption[0][1].value;       // 取引コード

        api.get(param).subscribe(
            (result) => {
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
        let chartType : string = 'ComboChart';
        let options : any = {
              'title' : this.viewOption[0][2].selected
            , 'width' : ( screen.width )
            , 'height': ( screen.height / 3 )
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
     * 追加ボタンクリックイベント
     * @private
     * @return { void }
     */
    private addTechnical() : void {
        console.log('addTechnical')
        this.saveViewOption().then(
            (result) => {
                this.getViewData();     // データの再取得
            }
        ).catch(
            (error) => {
                console.error(error);
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
