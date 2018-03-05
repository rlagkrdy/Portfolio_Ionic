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
    @Output() private atozSearch: EventEmitter<object> = new EventEmitter<object>();

    @ViewChild('signupForm') signupForm: NgForm;

    //라우터로 부터 url 파람 가지고옴
    constructor(private _router: Router, private element: ElementRef) {
        let urlParams: object = this._router['currentUrlTree'].queryParams;
        setTimeout(() => {
            for (let key in urlParams) {
                let formObj: any = this.signupForm.controls;
                if (formObj[key]) {
                    formObj[key].setValue(urlParams[key]);
                }
            }
        }, 0);
    }
    ngOnInit() {}

    //엔터시 검색
    private enterSearch(event: Event, form: NgForm) {
        if (event['which'] === 13) {
            this.childSearch(form);
        }
    }

    //초기화
    private reset(form: NgForm): void {
        let obj = {};
        this.searchObj.forEach((item, index, array) => {
            obj[item['id']] = '';
        });
        form.reset(obj);
        ParamsUtils.resetUrlHis();
        this.atozSearch.emit(form);
    }

    //검색
    private childSearch(form: NgForm): void {
        let param = form.value;
        for (let key in param) {
            if (param[key] && typeof param[key] === 'object') {
                param[key] = param[key].format('YYYY-MM-DD');
            }
        }
        ParamsUtils.setUrlHis(form.value);
        this.atozSearch.emit(param);
    }
}
