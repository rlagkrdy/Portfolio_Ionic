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
var router_1 = require("@angular/router");
var param_service_1 = require("../../yoService/utils/params/param.service");
var YoGridComponent = /** @class */ (function () {
    function YoGridComponent(paramUtils, _router) {
        this.paramUtils = paramUtils;
        this._router = _router;
        this.usePage = true;
        this.pageSize = 10;
        this.rowheight = 40;
        this.headerHeight = 40;
        this.cellClick = new core_1.EventEmitter();
        this.defaultWidth = 0;
        this.pages = [];
        this.pagesIndex = 0;
        this.pageSizeArr = [10, 25, 50];
        this.localeText = {
            noRowsToShow: '데이터가 없습니다.',
            loadingOoo: '데이터 로딩중...'
        };
        this.isShow = true;
        var urlParams = this._router['currentUrlTree'].queryParams;
        if (urlParams['pages']) {
            this.pageHis = urlParams['pages'];
        }
        if (urlParams['pageSize']) {
            this.pageSize = urlParams['pageSize'];
        }
    }
    YoGridComponent.prototype.ngOnInit = function () {
        this.valid();
    };
    YoGridComponent.prototype.ngOnChanges = function (_changes) {
        if (_changes.rowData && _changes.rowData.currentValue) {
            var length_1 = _changes.rowData.currentValue.length;
            this.setGridPagination(length_1);
        }
    };
    YoGridComponent.prototype.valid = function () {
        if (!this.columnDefs) {
            console.error('columnDefs를 넘겨주세요!!!');
            this.isShow = false;
            this.columnDefs = [];
        }
    };
    YoGridComponent.prototype.onModelUpdated = function (_gridObj) {
        if (_gridObj.newData) {
            this.moveGridPaging(this.pageHis);
        }
    };
    YoGridComponent.prototype.onGridSizeChanged = function (_gridObj) {
        var gridWidth = _gridObj.columnApi.columnController.bodyWidth, bodyWidth = _gridObj.clientWidth;
        this.gridColumnsFit(bodyWidth, gridWidth);
    };
    YoGridComponent.prototype.moveGridPaging = function (_page) {
        var gridApi = this.yoGrid.api;
        gridApi.paginationGoToPage(_page - 1);
    };
    YoGridComponent.prototype.setGridPagination = function (_rowDataLength) {
        var gridApi = this.yoGrid.api, gridRowCount = gridApi ? gridApi.getDisplayedRowCount() : 0;
        var totalItem = _rowDataLength > 0 ? _rowDataLength : gridRowCount, demiNum = totalItem / this.pageSize;
        var pageArr = [];
        this.pages = [];
        for (var i = 0; i < demiNum; i++) {
            pageArr.push(i + 1);
            if (pageArr.length % 10 === 0) {
                this.pages.push(pageArr);
                pageArr = [];
            }
        }
        this.pages.push(pageArr);
    };
    YoGridComponent.prototype.pageSizeChange = function (_pageSize) {
        var gridApi = this.yoGrid.api, bodyWidth = gridApi['alignedGridsService'].columnController.bodyWidth;
        this.pageSize = _pageSize;
        gridApi.paginationSetPageSize(this.pageSize);
        this.gridColumnsFit(bodyWidth);
        this.setGridHistory('pageSize', this.pageSize);
        this.setGridPagination();
    };
    YoGridComponent.prototype.gridColumnsFit = function (_bodyWidth, _gridWidth) {
        var gridApi = this.yoGrid.api;
        if (this.getDefaultWidth() === 0) {
            this.setDefaultWidth(_gridWidth);
        }
        if (this.getDefaultWidth() < _bodyWidth) {
            gridApi.sizeColumnsToFit();
        }
    };
    YoGridComponent.prototype.getDefaultWidth = function () {
        return this.defaultWidth;
    };
    YoGridComponent.prototype.setDefaultWidth = function (_width) {
        this.defaultWidth = _width;
    };
    YoGridComponent.prototype.onCellClick = function (_params) {
        this.cellClick.emit(_params);
    };
    YoGridComponent.prototype.onPaginationChanged = function () {
        var gridApi = this.yoGrid.api, currentNum = gridApi.paginationGetCurrentPage() + 1;
        this.setGridHistory('pages', currentNum);
        this.setPagingArray(currentNum);
        this.setPaginationActive(currentNum);
    };
    YoGridComponent.prototype.setPaginationActive = function (_currentNum) {
        var _this = this;
        var className = 'active';
        setTimeout(function () {
            _this.pageNumber.filter(function (item) {
                var demiNum = parseInt(item.nativeElement.innerHTML, 10), action = demiNum === _currentNum ? 'add' : 'remove';
                item.nativeElement.classList[action](className);
            });
        }, 0);
    };
    YoGridComponent.prototype.setPagingArray = function (_currentNum) {
        var demiNum = _currentNum / 10 - 0.1;
        demiNum = demiNum < 0 ? 0 : Math.floor(demiNum);
        this.pagesIndex = demiNum;
    };
    YoGridComponent.prototype.onBtnPagination = function (_eventsName) {
        var gridApi = this.yoGrid.api, eventName = "paginationGoTo" + _eventsName + "Page";
        gridApi[eventName]();
    };
    YoGridComponent.prototype.setGridHistory = function (_paramName, _currentNum) {
        if (!_paramName || !_currentNum) {
            return;
        }
        var param = {};
        param[_paramName] = _currentNum;
        this.paramUtils.setUrlHis(param);
    };
    YoGridComponent.prototype.excelDown = function () {
        alert('엑셀다운로드 클릭!!!');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], YoGridComponent.prototype, "columnDefs", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], YoGridComponent.prototype, "rowData", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], YoGridComponent.prototype, "usePage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], YoGridComponent.prototype, "pageSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], YoGridComponent.prototype, "rowheight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], YoGridComponent.prototype, "headerHeight", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], YoGridComponent.prototype, "cellClick", void 0);
    __decorate([
        core_1.ViewChild('yoGrid'),
        __metadata("design:type", Object)
    ], YoGridComponent.prototype, "yoGrid", void 0);
    __decorate([
        core_1.ViewChildren('pageNumber'),
        __metadata("design:type", Object)
    ], YoGridComponent.prototype, "pageNumber", void 0);
    YoGridComponent = __decorate([
        core_1.Component({
            selector: 'yo-grid',
            templateUrl: './yo-grid.component.html',
            styleUrls: ['./yo-grid.component.scss']
        }),
        __metadata("design:paramtypes", [param_service_1.ParamUtils, router_1.Router])
    ], YoGridComponent);
    return YoGridComponent;
}());
exports.YoGridComponent = YoGridComponent;
//# sourceMappingURL=yo-grid.component.js.map