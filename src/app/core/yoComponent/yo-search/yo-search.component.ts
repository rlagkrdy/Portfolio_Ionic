import {
    Component,
    OnInit,
    Input,
    Output,
    ViewChild,
    EventEmitter,
    ElementRef,
    ViewChildren,
    QueryList,
    ContentChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from '@angular/router/src/events';
import { Router } from '@angular/router';
import { MatCheckboxChange, MatCheckbox } from '@angular/material';
import { ParamUtils } from '../../yoService/utils/params/param.service';
import { CheckCtrl } from '../../yoService/ctrl/CheckCtrl';
import { DateCtrl } from '../../yoService/ctrl/DateCtrl';
import { SelRaCtrl } from '../../yoService/ctrl/SelRaCtrl';
import { createTimelineInstruction } from '@angular/animations/browser/src/dsl/animation_timeline_instruction';

@Component({
    selector: 'yo-search',
    templateUrl: './yo-search.component.html',
    styleUrls: ['./yo-search.component.scss']
})
export class YoSearchComponent implements OnInit {
    @Input() private searchObj: Array<SearchObj>;
    @Output()
    private searchClick: EventEmitter<object> = new EventEmitter<object>();
    @ViewChild('searchForm') searchForm: NgForm;
    @ViewChildren(MatCheckbox) matchk: QueryList<MatCheckbox>;

    @ContentChild(MatCheckbox) matchk2: MatCheckbox;

    private formIsShow: boolean = true;
    private urlParams: any;

    // 라우터로 부터 url 파람 가지고옴
    constructor(
        private _paramUtils: ParamUtils,
        private _router: Router,
        private _element: ElementRef,
        private _chkCtrl: CheckCtrl,
        private _dateCtrl: DateCtrl,
        private _selRaCtrl: SelRaCtrl
    ) {
        this.urlParams = this._router['currentUrlTree'].queryParams;
        setTimeout(() => {
            if (!this.formIsShow) {
                return;
            }
            console.log('진입??');
            this._dateCtrl.init(
                this.searchObj,
                this.searchForm,
                this._dateCtrl.setRange
            );

            this.formSet(this.urlParams, this.searchForm);

            this._chkCtrl.init(
                this.searchObj,
                this.matchk,
                this.searchForm,
                this._chkCtrl.set
            );
        }, 0);
    }

    ngOnInit(): void {
        this.searchObj = this._selRaCtrl.init(this.searchObj);
        this.componentValid();
    }
    // search component validation
    private componentValid(): void {
        if (
            !this.searchObj ||
            this.searchObj.length === 0 ||
            this.searchObjDuplicate(this.searchObj) === false ||
            this.searchObjValid() === false
        ) {
            this.formIsShow = false;
        }
    }

    // searchObj check duplicate
    private searchObjDuplicate(_arr: Array<any>): boolean {
        const result: boolean = _arr.some((pItem: any) => {
            return _arr.filter(cItem => cItem.id === pItem.id).length > 1;
        });

        if (result) {
            console.error('SearchObj에 중복되는 값이 있습니다.');
        }

        return !result;
    }

    // searchObj validation
    // 만약 select, radio, check타입 일때 data객체 여부
    private searchObjValid(): boolean {
        const validObj = this.searchObj.filter(
            (item: SearchObj, idx: number, arr: SearchObj[]) => {
                if (
                    (item.type === 'select' ||
                        item.type === 'radio' ||
                        item.type === 'check') &&
                    !item.data
                ) {
                    return item;
                }
            }
        );
        if (validObj.length > 0) {
            console.error(
                'select, radio, check타입은 data객체도 같이 넘겨줘야 합니다.'
            );
            return false;
        }
        return true;
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

        const formObj: any = _searchForm.controls;
        const keys: Array<string> = Object.keys(_urlParams);

        keys.forEach((item: string, idx: number) => {
            if (formObj[item]) {
                formObj[item].setValue(decodeURI(_urlParams[item]));
            }
        });
    }

    // form value reset
    private reset(form: NgForm): void {
        const obj = {};
        this._selRaCtrl
            .init(this.searchObj, this._selRaCtrl.reset)
            .forEach(item => {
                if (item.type === 'date') {
                    obj[item['id'] + '_ST'] = item.value;
                    obj[item['id'] + '_ED'] = item.value;
                } else {
                    obj[item['id']] = '';
                }
            });

        form.reset(obj);

        this.search(form);
    }

    // search
    private search(form: NgForm): void {
        let param: any = Object.assign({}, this.urlParams);

        const formParam = form.value;
        param = Object.assign(param, form.value);

        this._chkCtrl.init(
            this.searchObj,
            this.matchk,
            this.searchForm,
            this._chkCtrl.get
        );

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
    data?: Array<any>;
}
