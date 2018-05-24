import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    constructor(private _ar: ActivatedRoute, private _location: Location) {
        this._ar.data.subscribe(data => {
            const rowData = JSON.parse(data.DetailResolve._body);
            console.log(rowData);
        });
    }

    ngOnInit() {}

    private backToList(): void {
        this._location.back();
    }
}
