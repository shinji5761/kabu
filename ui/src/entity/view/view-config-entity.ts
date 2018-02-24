import { ChartOption } from './chart-option';
import { IntervalOption } from './interval-option';

/**
 * @class ViewConfigEntity
 * @export
 */
export class ViewConfigEntity {
    // 
    public chartOption : Array<ChartOption> = [
          new ChartOption('average', '移動平均線', false)
        , new ChartOption('polinger', 'ポリンジャーバンド', false)
    ];

    // 表示感覚の設定
    public intervalOption : Array<IntervalOption> = [
          new IntervalOption('1min', '1分足', false)
        , new IntervalOption('5min', '5分足', false)
        , new IntervalOption('60min', '60分足', false)
        , new IntervalOption('1day', '1日足', true)
    ];

}