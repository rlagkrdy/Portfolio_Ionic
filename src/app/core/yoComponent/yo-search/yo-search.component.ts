import {
    Component,
    OnInit,
    Input,
    Output,
    ViewChild,
    EventEmitter,
    ViewChildren,
    QueryList,
    ContentChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from '@angular/router/src/events';
import { Router } from '@angular/router';
import { MatCheckbox } from '@angular/material';
import { ParamUtils } from '../../yoService/utils/params/param.service';
import { CheckCtrl } from '../../yoService/uiCtrl/CheckCtrl';
import { DateCtrl } from '../../yoService/uiCtrl/DateCtrl';
import { SelRaCtrl } from '../../yoService/uiCtrl/SelRaCtrl';

@Component({
    selector: 'yo-search',
    templateUrl: './yo-search.component.html',
    styleUrls: ['./yo-search.component.scss']
})
export class YoSearchComponent implements OnInit {
    @Input()
    private searchObj: Array<SearchObj>;
    @Output()
    private searchClick: EventEmitter<object> = new EventEmitter<object>();
    @ViewChild('searchForm')
    searchForm: NgForm;

    @ViewChildren(MatCheckbox)
    matchk: QueryList<MatCheckbox>;
    @ContentChild(MatCheckbox)
    matchk2: MatCheckbox;

    formIsShow: boolean = true;
    private urlParams: Object;

    // 라우터로 부터 url 파람 가지고옴
    constructor(
        private _paramUtils: ParamUtils,
        private _router: Router,
        private _chkCtrl: CheckCtrl,
        private _dateCtrl: DateCtrl,
        private _selRaCtrl: SelRaCtrl
    ) {
        this.urlParams = this._router['currentUrlTree'].queryParams;

        console.log('bbbbb');
        console.log('a');
    }

    ngOnInit(): void {
        if (!this.componentValid()) {
            return;
        }

        setTimeout(() => {
            this.initUiCtrl().formSet(this.urlParams, this.searchForm);
        }, 0);
    }

    private initUiCtrl(): YoSearchComponent {
        this._dateCtrl.init(this.searchObj, this.searchForm, this._dateCtrl.setRange);
        this._chkCtrl.init(this.searchObj, this.matchk, this.searchForm, this._chkCtrl.set);

        this._selRaCtrl.init(this.searchObj, this._selRaCtrl.reset);
        return this;
    }

    // search component validation
    private componentValid(): boolean {
        if (!this.searchObj || this.searchObj.length === 0 || this.searchObjValid()) {
            this.formIsShow = false;
        }
        return this.formIsShow;
    }

    // searchObj validation
    // 만약 select, radio, check타입 일때 data객체 여부
    private searchObjValid(): boolean {
        const regExp: RegExp = new RegExp(/select|radio|check/),
<<<<<<< HEAD
=======
<<<<<<< HEAD
            result: boolean = this.searchObj.some((item: SearchObj, idx: number, arr: SearchObj[]) => {
                return regExp.test(item.type) && !item.data;
            });
=======
>>>>>>> 1d85d45dd76727b9770f4ea3cd539ce80fb21094
            result: boolean = this.searchObj.some(
                (item: SearchObj, idx: number, arr: SearchObj[]) => {
                    return regExp.test(item.type) && !item.data;
                }
            );
<<<<<<< HEAD
=======
>>>>>>> origin/tests
>>>>>>> 1d85d45dd76727b9770f4ea3cd539ce80fb21094

        if (result) {
            console.error('select, radio, check타입은 data객체도 같이 넘겨줘야 합니다.');
        }
        return result;
    }

    // enter search
    private enterSearch(event: Event, form: NgForm) {
        if (event['which'] === 13) {
            this.search(form);
        }
    }

    // form value setting
    private formSet(_urlParams: any, _searchForm: NgForm) {
        if (!_urlParams || !_searchForm) {
            return;
        }

        const formObj: NgForm['controls'] = _searchForm.controls,
            keys: string[] = Object.keys(_urlParams);

        keys.forEach((item: string, idx: number) => {
            if (formObj[item]) {
                formObj[item].setValue(decodeURI(_urlParams[item]));
            }
        });
    }

    // form value reset
    private reset(form: NgForm, func?: Function): void {
        const resetObj: Object = this.searchObj.reduce((result: Object, item: SearchObj) => {
            if (item.type === 'date') {
                result[item.id + '_ST'] = '';
                result[item.id + '_ED'] = '';
            } else if (item.type === 'select' || item.type === 'radio') {
                result[item.id] = item.data[0].value;
            } else {
                result[item.id] = '';
            }
            return result;
        }, {});
        form.reset(resetObj);
        this.search(form);
    }

    // search
    private search(form: NgForm): void {
        const param: Object = Object.assign({}, this.urlParams, form.value);

        this._chkCtrl.init(this.searchObj, this.matchk, this.searchForm, this._chkCtrl.get);

        for (const key in param) {
            if (param[key] && typeof param[key] === 'object') {
                param[key] = param[key].format('YYYY-MM-DD');
            }
        }

        this._paramUtils.setUrlHis(param);
        this.searchClick.emit(param);
    }
}

export interface SearchObj {
    id: string;
    name: string;
    type: string;
    value: string;
    data?: SearchData[];
}

export interface SearchData {
    name: string;
    value: string;
}
