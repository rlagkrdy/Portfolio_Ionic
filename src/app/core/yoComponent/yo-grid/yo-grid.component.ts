import {
    Component,
    Input,
    Output,
    OnInit,
    EventEmitter,
    SimpleChanges,
    SimpleChange,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid/main';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AgEvent } from 'ag-grid/dist/lib/events';
import { Router } from '@angular/router';
import { ParamsUtils } from '../../yoUtils/paramUtils';

@Component({
    selector: 'yo-grid',
    templateUrl: './yo-grid.component.html',
    styleUrls: ['./yo-grid.component.scss']
})
export class YoGridComponent implements OnInit {
    @Input() private columnDefs: object;
    @Input() private rowData: object;
    @Input() private usePage: boolean = true;
    @Input() private pageSize: number = 10;
    @Input() private headerHeight: number = 36;
    @Input() private rowheight: number = 50;
    @Output() private cellClick: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('atozGrid') atozGrid;
    @ViewChildren('pageNumber') pageNumber;

    private defaultWidth: number = 0;
    private gridApi: any;
    private pageHis: number;
    private pages: Array<Array<number>> = [];
    private pagesIndex: number = 0;
    private pageSizeObj: Array<number> = [10, 25, 50];

    private gridText: object = {
        noRowsToShow: '데이터가 없습니다.',
        loadingOoo: '로딩중...'
    };

    constructor(private _router: Router) {
        let urlParams: object = this._router['currentUrlTree'].queryParams;
        if (urlParams['pages']) {
            this.pageHis = urlParams['pages'];
        }
        if (urlParams['pageSize']) {
            this.pageSize = urlParams['pageSize'];
        }
    }

    ngOnInit() {
        if (!this.columnDefs) {
            alert('columnDefs를 넘겨주세요!!!');
            this.columnDefs = [];
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.rowData && changes.rowData.currentValue) {
            let length = changes.rowData.currentValue.length;
            this.setGridPagination(length);
        }
    }
    //1. 뒤로가기로 페이지 돌아왔을때 페이징 처리
    //2. pagination 처리
    setGridParams(params: any) {
        if (params.newData) {
            this.moveGridPage(this.pageHis);
        }
    }

    // gridSize 변화시 발생
    onGridSizeChange(params: any): void {
        if (!this.gridApi) {
            this.gridApi = params.api;
        }

        if (this.pages.length === 0) {
        }

        let gridWidth = this.gridApi.alignedGridsService.columnController.bodyWidth,
            bodyWidth = params.clientWidth;

        this.gridWidthFit(gridWidth, bodyWidth);
    }

    //페이지 이동
    moveGridPage(paging: number) {
        this.gridApi.paginationGoToPage(paging - 1);
    }

    //페이징 Array 처리
    setGridPagination(rowDataLength?: number): void {
        let totalItem = rowDataLength > 0 ? rowDataLength : this.gridApi.getDisplayedRowCount(),
            demiNum = totalItem / this.pageSize,
            pageArr: Array<number> = [];

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

    //페이지당 노출되는 row숫자 변경시
    gridPageSizeChange(pageSize: number): void {
        this.pageSize = pageSize;
        this.gridApi.paginationSetPageSize(this.pageSize);
        let bodyWidth = this.atozGrid.api.alignedGridsService.columnController.bodyWidth;
        this.gridWidthFit(0, bodyWidth);
        this.setGridPageHis('pageSize', this.pageSize);
        this.setGridPagination();
    }

    // 최초 생성시 width값을 보관해두고
    // body보다 작으면 body width에 맞게 수정
    // body보다 크면 스크롤로 나오게
    // 구현되어 있습니다.
    gridWidthFit(gridWidth, bodyWidth) {
        if (this.defaultWidth === 0) {
            this.defaultWidth = gridWidth;
        }

        if (this.defaultWidth < bodyWidth) {
            this.gridApi.sizeColumnsToFit();
            setTimeout(() => {
                this.gridApi.sizeColumnsToFit();
            }, 300);
        }
    }

    //Cell 클릭시 부모 Componenet에서 이번트 호출
    //이벤트 정의는 부모 Componenet에서 정의하면 됩니다.
    onCellClick(params): void {
        this.cellClick.emit(params);
    }

    //페이징 변화시 Event
    onPaginationChanged(): void {
        if (this.gridApi) {
            let currentNum = this.gridApi.paginationGetCurrentPage() + 1;

            this.setGridPageHis('pages', currentNum);
            this.setPagingArray(currentNum);
            this.setPageActive(currentNum);

            this.setText('#atoz_currentPage', currentNum);
            this.setText('#atoz_totalPages', this.gridApi.paginationGetTotalPages());
            this.setText('#atoz_totalItem', this.gridApi.getDisplayedRowCount());
        }
    }
    //선택된 페이지 active class추가
    setPageActive(currentNum: number) {
        //타이밍 이슈 방어 코드
        setTimeout(() => {
            this.pageNumber.map(item => {
                let demiNum =
                    typeof item.nativeElement.innerHTML === 'string'
                        ? parseInt(item.nativeElement.innerHTML)
                        : item.nativeElement.innerHTML;
                if (demiNum === currentNum) {
                    item.nativeElement.classList.add('active');
                } else {
                    item.nativeElement.classList.remove('active');
                }
            });
        }, 0);
    }
    //그리드 페이지 노출 Index처리
    setPagingArray(currentNum: number) {
        let demiNum = currentNum / 10 - 0.1;
        demiNum = demiNum < 0 ? 0 : Math.floor(demiNum);
        this.pagesIndex = demiNum;
    }
    //그리드 정보 텍스트 처리
    setText(selector, text): void {
        document.querySelector(selector).innerHTML = text;
    }
    //처음 페이지로 이동
    onBtFirst(): void {
        this.gridApi.paginationGoToFirstPage();
    }
    //마지막 페이지로 이동
    onBtLast(): void {
        this.gridApi.paginationGoToLastPage();
    }
    //다음 페이지로 이동
    onBtNext(): void {
        this.gridApi.paginationGoToNextPage();
    }
    //이전 페이지로 이동
    onBtPrevious(): void {
        this.gridApi.paginationGoToPreviousPage();
    }

    //그리드 페이지, 페이지당 노출 건수 URL 변경
    setGridPageHis(_paramName: string, _currentNum: number): void {
        if (!_paramName || !_currentNum) {
            return;
        }
        let param = {};
        param[_paramName] = _currentNum;
        ParamsUtils.setUrlHis(param);
    }

    //엑셀 다운로드
    excelDown(): void {
        alert('엑셀다운로드 클릭!!!');
    }
}
