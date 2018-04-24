import {
    Component,
    OnInit,
    Input,
    Output,
    ViewChild,
    EventEmitter,
    ElementRef
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from '@angular/router/src/events';
import { Router } from '@angular/router';
import { ParamsUtils } from '../../yoUtils/paramUtils';

@Component({
    selector: 'yo-search',
    templateUrl: './yo-search.component.html',
    styleUrls: ['./yo-search.component.scss']
})
export class YoSearchComponent implements OnInit {
    @Input() private searchObj: Array<SearchObj>;
    @Output() private searchClick: EventEmitter<object> = new EventEmitter<object>();

    @ViewChild('searchForm') searchForm: NgForm;

    private formIsShow: boolean = true;

    // 라우터로 부터 url 파람 가지고옴
    constructor(private _router: Router, private element: ElementRef) {
        const urlParams: object = this._router['currentUrlTree'].queryParams;
        setTimeout(() => {
            for (const key of Object.keys(urlParams)) {
                const formObj: any = this.searchForm.controls;
                if (formObj[key]) {
                    formObj[key].setValue(urlParams[key]);
                }
            }
        }, 0);
    }
    ngOnInit(): void {
        this.searchObj = this.checkDefaultValue(this.searchObj);

        if (
            !this.searchObj ||
            this.searchObj.length === 0 ||
            this.searchObjDuplicate() === false ||
            this.searchObjValid() === false
        ) {
            this.formIsShow = false;
        }
    }

    checkDefaultValue(_searchObj: Array<SearchObj>): Array<SearchObj> {
        const isTypes: RegExp = new RegExp(/select|radio|check/);
        for (let keys in _searchObj) {
            if (isTypes.test(_searchObj[keys]['type'])) {
                let value = _searchObj[keys]['value'];
                let datas = _searchObj[keys]['data'];
                if (value === '' || value === null) {
                    _searchObj[keys]['value'] = datas[0].value;
                } else {
                    let valueAr = datas.filter((item: any, idx: number, arr: any[]) => {
                        return item.value === value;
                    });
                    if (valueAr.length === 0) {
                        _searchObj[keys]['value'] = datas[0].value;
                    }
                }
            }
        }
        return _searchObj;
    }

    private searchObjDuplicate(): boolean {
        for (let i = 0; i < this.searchObj.length; i += 1) {
            const multiObj = this.searchObj.filter((item: SearchObj) => {
                return this.searchObj[i].id === item.id;
            });

            if (multiObj.length > 1) {
                console.error('searchObj에 중복되는 id값이 있습니다.');
                return false;
            }
        }
        return true;
    }

    private searchObjValid(): boolean {
        let validObj = this.searchObj.filter((item: SearchObj, idx: number, arr: SearchObj[]) => {
            if (
                (item.type === 'select' || item.type === 'radio' || item.type === 'check') &&
                !item.data
            ) {
                return item;
            }
        });

        if (validObj.length > 0) {
            console.error('select, radio,check타입은 data객체도 같이 넘겨줘야 합니다.');
            return false;
        }

        return true;
    }

    private enterSearch(event: Event, form: NgForm) {
        if (event['which'] === 13) {
            this.search(form);
        }
    }

    private reset(form: NgForm): void {
        const obj = {};
        this.searchObj.forEach((item, index, array) => {
            obj[item['id']] = '';
        });

        form.reset(obj);
        ParamsUtils.resetUrlHis();
        this.searchClick.emit(form);
    }

    private search(form: NgForm): void {
        const param = form.value;
        console.log(param);
        for (const key in param) {
            if (param[key] && typeof param[key] === 'object') {
                param[key] = param[key].format('YYYY-MM-DD');
            }
        }
        ParamsUtils.setUrlHis(form.value);
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
