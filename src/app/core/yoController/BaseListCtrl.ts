import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { YoaxService } from '../yoService/db/yoax.service';

export class BaseListCtrl {
    public rowData: Array<any> = [];
    public routeParam: any;

    private checkBool: RegExp = /true|false/;

    public titles: string = '';

    constructor(
        public activatedRoute: ActivatedRoute,
        public yoaxService: YoaxService,
        public router: Router,
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
        params = Object.assign(params, this.routeParam);

        this.yoaxService
            .yoax('/' + this.url + '/', 'get', params)
            .subscribe(result => {
                this.rowData = result;
            });
    }

    insertUsr(): void {
        this.router.navigate([this.url + '-detail']);
    }

    cellClick(params: any, queryParam?: NavigationExtras): void {
        this.router.navigate(
            [this.url + '-detail/' + params.data.USR_KEY],
            queryParam
        );
    }
}
