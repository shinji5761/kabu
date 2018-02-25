
export class GoogleChartParam {
    chartType : string;
    dataTable : Array<any>
    options : any;

    constructor(
          chartType : string
        , dataTable : Array<any>
        , options : any
    ) {
        this.chartType = chartType;
        this.dataTable = dataTable;
        this.options = options;
    }
}