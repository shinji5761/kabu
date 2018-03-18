import { TypeDate } from './type-date';
import { TypeSelect } from './type-select';

/**
 * @class ViewOption
 * @export
 */
export class ViewOption {
    /**
     * 表示オプション
     * @type { Array<any> }
     */
    viewOption : Array<any>;

    /**
     * 
     * @param date  { string } 日付(yyyy-MM-dd) 
     * @param trade { string } 取引種別
     * @param term  { string } 期間
     */
    constructor( date : string, trade : string, term : string) {
        this.viewOption = [
            [],[]
        ];
        // 1列目
        this.viewOption[0].push(new TypeDate('日付', date, 'YYYY年MM月DD日'));
        this.viewOption[0].push(new TypeSelect('トレード種別', trade, [{ selected : true,  value : 'USDJPY', label : 'USDJPY' }, { selected : false,  value : 'EURJPY', label : 'EURJPY' }]));
        this.viewOption[0].push(new TypeSelect('時間足', term, [{ value : '1min', label : '1分足' }, { value : '10min', label : '10分足' }]));

    }
}