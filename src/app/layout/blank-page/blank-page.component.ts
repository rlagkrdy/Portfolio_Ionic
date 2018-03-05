import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
    private searchObj: Array<object>;
    constructor() {
        this.searchObj = [{ id: 'keyword', type: 'input', value: '' }];
    }

    ngOnInit() {}

    aaa(): void {
        alert('클릭!!!');
    }
}
