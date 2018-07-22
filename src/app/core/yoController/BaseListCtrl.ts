import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { YoaxService } from '../yoService/http/yoax.service';
import { ColDef, ColGroupDef } from '../../../../node_modules/ag-grid';

export class BaseListCtrl {
    private searchObj: Array<object> = [];
    private columnDefs: (ColDef | ColGroupDef)[] = [];
    private rowData: Array<any> = [];
    public routeParam: any;

    private checkBool: RegExp = /true|false/;
    private title: string = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private yoaxService: YoaxService,
        private router: Router,
        private url: string
    ) {}

    setListData(): void {
        this.activatedRoute.data.subscribe(data => {
            this.setDefaultData(data.modelResolve);
            this.rowData = data.ListResolve;
        });
        this.activatedRoute.queryParams.subscribe(data => {
            this.routeParam = data;
        });
    }

    setDefaultData(data: any): void {
        for (const key in data) {
            if (this.hasOwnProperty(key)) {
                this[key] = this.checkBool.test(data[key])
                    ? JSON.parse(data[key])
                    : data[key];
            }
        }
    }

    searchClick(params: any): void {
        this.yoaxService
            .yoax('/' + this.url + '/', 'get', params)
            .subscribe(result => {
                this.rowData = result;
            });
    }

    insert(): void {
        this.router.navigate([this.url + '-detail']);
    }

    cellClick(key: string, queryParam?: NavigationExtras): void {
        this.router.navigate([this.url + '-detail/' + key], queryParam);
    }
}
