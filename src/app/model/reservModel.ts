import { ColDef, ColGroupDef } from 'ag-grid';
import { FormatterUtils } from '../core/yoService/utils/formatter/formatter.service';
import { CommonCode } from '../commonCode';

export class ReservModel {
    constructor(private _fu: FormatterUtils) {}
    private reservObj: Array<any> = [
        {
            id: 'RESERV_DATE',
            name: '예약일시',
            type: 'date',
            value: ''
        },
        {
            id: 'RESERV_STATE',
            name: '예약상태',
            type: 'select',
            data: CommonCode.getCode('reserv'),
            value: ''
        },
        {
            id: 'KEYWORD',
            name: '키워드',
            type: 'input',
            value: ''
        }
    ];

    private reservDefs: (ColDef | ColGroupDef)[] = [
        { headerName: '스터디룸명', field: 'ROOM_NAME', width: 150 },
        { headerName: '예약일시', field: 'RESERV_DATE_NM', width: 100 },
        { headerName: '예약시간', field: 'RESERV_TIME_NM', width: 100 },
        { headerName: '예약자명', field: 'RESERV_USR_NAME', width: 100 },
        { headerName: '연락처', field: 'RESERV_USR_TEL', width: 100 },
        { headerName: '예약인원', field: 'RESERV_USR_NUM', width: 100 },
        { headerName: '예약상태', field: 'RESERV_STATE', width: 100 }
    ];

    private reservTitle: string = '예약관리';
}
