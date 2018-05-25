"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BlankPageComponent = /** @class */ (function () {
    function BlankPageComponent() {
        this.columnDefs = [
            { headerName: 'Make', field: 'make', width: 300 },
            { headerName: 'Model', field: 'model', width: 300 },
            { headerName: 'Price', field: 'price', width: 300 }
        ];
        this.rowData = [
            { make: 'Toyota', model: 'Celica', price: 35000 },
            { make: 'Ford', model: 'Mondeo', price: 32000 },
            { make: 'Porsche', model: 'Boxter', price: 72000 },
            { make: 'Toyota', model: 'Celica', price: 35000 },
            { make: 'Ford', model: 'Mondeo', price: 32000 },
            { make: 'Porsche', model: 'Boxter', price: 72000 },
            { make: 'Toyota', model: 'Celica', price: 35000 },
            { make: 'Ford', model: 'Mondeo', price: 32000 },
            { make: 'Porsche', model: 'Boxter', price: 72000 },
            { make: 'Toyota', model: 'Celica', price: 35000 },
            { make: 'Ford', model: 'Mondeo', price: 32000 },
            { make: 'Porsche', model: 'Boxter', price: 72000 },
            { make: 'Toyota', model: 'Celica', price: 35000 },
            { make: 'Ford', model: 'Mondeo', price: 32000 },
            { make: 'Porsche', model: 'Boxter', price: 72000 },
            { make: 'Toyota', model: 'Celica', price: 35000 }
        ];
        this.searchObj = [
            {
                id: 'aa',
                name: 'aa',
                type: 'input',
                value: 'aa'
            },
            {
                id: 'bb',
                name: 'bb',
                type: 'date',
                value: '2018-04-20'
            },
            {
                id: 'dd',
                name: 'dd',
                type: 'select',
                value: 'ddd',
                data: [
                    { name: 'aaa', value: 'aaa' },
                    { name: 'bbb', value: 'bbb' },
                    { name: 'ccc', value: 'ccc' }
                ]
            },
            {
                id: 'ee',
                name: 'ee',
                type: 'radio',
                value: 'ddd',
                data: [
                    { name: 'aaa', value: 'aaa' },
                    { name: 'bbb', value: 'bbb' },
                    { name: 'ccc', value: 'ccc' }
                ]
            },
            {
                id: 'ff',
                name: 'ff',
                type: 'check',
                value: '5',
                data: [
                    { name: 'aaa', value: '1' },
                    { name: 'bbb', value: '2' },
                    { name: 'ccc', value: '4' }
                ]
            }
        ];
    }
    BlankPageComponent.prototype.ngOnInit = function () { };
    BlankPageComponent.prototype.cellClick = function (params) {
        console.log(params);
    };
    BlankPageComponent = __decorate([
        core_1.Component({
            selector: 'app-blank-page',
            templateUrl: './blank-page.component.html',
            styleUrls: ['./blank-page.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], BlankPageComponent);
    return BlankPageComponent;
}());
exports.BlankPageComponent = BlankPageComponent;
//# sourceMappingURL=blank-page.component.js.map