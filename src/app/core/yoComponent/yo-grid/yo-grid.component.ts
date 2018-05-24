import {
    Component,
    Input,
    Output,
    OnInit,
    EventEmitter,
    SimpleChanges,
    SimpleChange,
    ViewChild,
    ViewChildren,
    OnChanges
} from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid/main';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AgEvent } from 'ag-grid/dist/lib/events';
import { Router } from '@angular/router';
import { ColDef, ColGroupDef } from 'ag-grid/dist/lib/entities/colDef';
import { ParamUtils } from '../../yoService/utils/params/param.service';

@Component({
    selector: 'yo-grid',
    templateUrl: './yo-grid.component.html',
    styleUrls: ['./yo-grid.component.scss']
})
export class YoGridComponent implements OnInit, OnChanges {
    @Input() private columnDefs: (ColDef | ColGroupDef)[];
    @Input() private rowData: Array<any>;
    @Input() private usePage: boolean = true;
    @Input() private pageSize: number = 10;
    @Input() private rowheight: number = 40;
    @Input() private headerHeight: number = 40;
    @Output() private cellClick: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('yoGrid') yoGrid;
    @ViewChildren('pageNumber') pageNumber;

    private defaultWidth: number = 0;
    private gridApi: GridApi;
    private pageHis: number;
    private pages: Array<Array<number>> = [];
    private pagesIndex: number = 0;
    private pageSizeArr: Array<number> = [10, 25, 50];
    private localeText: object = {
        noRowsToShow: '데이터가 없습니다.',
        loadingOoo: '데이터 로딩중...'
    };

    private isShow: boolean = true;

    constructor(private paramUtils: ParamUtils, private _router: Router) {
        const urlParams: object = this._router['currentUrlTree'].queryParams;
        if (urlParams['pages']) {
            this.pageHis = urlParams['pages'];
        }
        if (urlParams['pageSize']) {
            this.pageSize = urlParams['pageSize'];
        }
    }

    ngOnInit() {
        this.valid();
    }

    ngOnChanges(_changes: SimpleChanges) {
        if (_changes.rowData && _changes.rowData.currentValue) {
            const length = _changes.rowData.currentValue.length;
            this.setGridPagination(length);
        }
    }

    valid(): void {
        if (!this.columnDefs) {
            console.error('columnDefs를 넘겨주세요!!!');
            this.isShow = false;
            this.columnDefs = [];
        }
    }

    onModelUpdated(_gridObj: any): void {
        if (_gridObj.newData) {
            this.moveGridPaging(this.pageHis);
        }
    }

    onGridSizeChanged(_gridObj: any): void {
        const gridWidth = _gridObj.columnApi.columnController.bodyWidth,
            bodyWidth = _gridObj.clientWidth;
        this.gridColumnsFit(bodyWidth, gridWidth);
    }

    moveGridPaging(_page: number): void {
        const gridApi: GridApi = this.yoGrid.api;
        gridApi.paginationGoToPage(_page - 1);
    }

    setGridPagination(_rowDataLength?: number): void {
        const gridApi: GridApi = this.yoGrid.api,
            gridRowCount: number = gridApi ? gridApi.getDisplayedRowCount() : 0;

        const totalItem: number =
                _rowDataLength > 0 ? _rowDataLength : gridRowCount,
            demiNum: number = totalItem / this.pageSize;

        let pageArr: Array<number> = [];

        this.pages = [];
        for (let i = 0; i < demiNum; i++) {
            pageArr.push(i + 1);
            if (pageArr.length % 10 === 0) {
                this.pages.push(pageArr);
                pageArr = [];
            }
        }
        this.pages.push(pageArr);
    }

    pageSizeChange(_pageSize: number): void {
        const gridApi: GridApi = this.yoGrid.api,
            bodyWidth =
                gridApi['alignedGridsService'].columnController.bodyWidth;
        this.pageSize = _pageSize;

        gridApi.paginationSetPageSize(this.pageSize);
        this.gridColumnsFit(bodyWidth);
        this.setGridHistory('pageSize', this.pageSize);
        this.setGridPagination();
    }

    gridColumnsFit(_bodyWidth: number, _gridWidth?: number) {
        const gridApi: GridApi = this.yoGrid.api;

        if (this.getDefaultWidth() === 0) {
            this.setDefaultWidth(_gridWidth);
        }

        if (this.getDefaultWidth() < _bodyWidth) {
            gridApi.sizeColumnsToFit();
        }
    }

    getDefaultWidth(): number {
        return this.defaultWidth;
    }

    setDefaultWidth(_width: number): void {
        this.defaultWidth = _width;
    }

    onCellClick(_params): void {
        this.cellClick.emit(_params);
    }

    onPaginationChanged(): void {
        const gridApi: GridApi = this.yoGrid.api,
            currentNum = gridApi.paginationGetCurrentPage() + 1;
        this.setGridHistory('pages', currentNum);
        this.setPagingArray(currentNum);
        this.setPaginationActive(currentNum);
    }

    setPaginationActive(_currentNum: number): void {
        const className: string = 'active';
        setTimeout(() => {
            this.pageNumber.filter(item => {
                const demiNum: number = parseInt(
                        item.nativeElement.innerHTML,
                        10
                    ),
                    action: string = demiNum === _currentNum ? 'add' : 'remove';
                item.nativeElement.classList[action](className);
            });
        }, 0);
    }

    setPagingArray(_currentNum: number): void {
        let demiNum: number = _currentNum / 10 - 0.1;
        demiNum = demiNum < 0 ? 0 : Math.floor(demiNum);
        this.pagesIndex = demiNum;
    }

    onBtnPagination(_eventsName): void {
        const gridApi: GridApi = this.yoGrid.api,
            eventName: string = `paginationGoTo${_eventsName}Page`;
        gridApi[eventName]();
    }

    setGridHistory(_paramName: string, _currentNum: number): void {
        if (!_paramName || !_currentNum) {
            return;
        }
        const param = {};
        param[_paramName] = _currentNum;
        this.paramUtils.setUrlHis(param);
    }

    excelDown(): void {
        alert('엑셀다운로드 클릭!!!');
    }
}
