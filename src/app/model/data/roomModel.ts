import { ColDef, ColGroupDef } from 'ag-grid';
import { FormatterUtils } from '../../core/yoService/utils/formatter/formatter.service';
import { SearchObj } from '../../core/yoComponent/yo-search/yo-search.component';
import { DetailObj } from '../../core/yoComponent/yo-detail/yo-detail.component';

export class RoomModel {
    constructor(private _fu: FormatterUtils) {}
    private roomTitle: string = '스터디룸관리';
    private roomObj: SearchObj[] = [
        {
            id: 'ROOM_CREATE',
            name: '등록일시',
            type: 'date',
            value: ''
        }
    ];

    private roomDefs: (ColDef | ColGroupDef)[] = [
        { headerName: '스터디룸명', field: 'ROOM_NAME', width: 150 },
        { headerName: '인원', field: 'ROOM_MEM_RANGE', width: 100 },
        {
            headerName: '금액/시간',
            field: 'ROOM_PRICE',
            width: 150,
            valueFormatter: this._fu.moneyFommat
        },
        { headerName: '등록일시', field: 'ROOM_CREATE_NM', width: 100 }
    ];

    private roomDetailTitle: string = '스터디룸관리 > 스터디룸상세';
    private roomDetailObj: DetailObj[] = [
        {
            name: '스터디룸명',
            id: 'ROOM_NAME',
            type: 'input',
            value: '',
            required: true
        },
        {
            name: '최소 인원',
            id: 'ROOM_MEM_MIN',
            type: 'input',
            value: '',
            required: true
        },
        {
            name: '최대 인원',
            id: 'ROOM_MEM_MAX',
            type: 'input',
            value: '',
            required: true
        },
        {
            name: '금액/시간',
            id: 'ROOM_PRICE',
            type: 'input',
            value: '',
            required: true
        },
        {
            name: '소개',
            id: 'ROOM_INTRO',
            type: 'editor',
            value: ''
            // required: true
        }
    ];
}
