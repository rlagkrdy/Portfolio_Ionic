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
    @Input() private searchObj: Array<object>;
    @Output()
    private searchClick: EventEmitter<object> = new EventEmitter<object>();

    @ViewChild('searchForm') searchForm: NgForm;

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
    ngOnInit() {}

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
        for (const key in param) {
            if (param[key] && typeof param[key] === 'object') {
                param[key] = param[key].format('YYYY-MM-DD');
            }
        }
        ParamsUtils.setUrlHis(form.value);
        this.searchClick.emit(param);
    }
}
