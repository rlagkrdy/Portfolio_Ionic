import { ColDef, ColGroupDef } from 'ag-grid';
import { CommonCode } from '../../../commonCode';

export class UserListModel {
    searchObj: Array<object> = [
        {
            id: 'USR_CREATE',
            name: '가입일시',
            type: 'date',
            value: ''
        },
        {
            id: 'USR_SNS_WAY',
            name: 'SNS여부',
            type: 'radio',
            value: '',
            data: CommonCode.getCode('sns')
        },
        {
            id: 'KEYWORD',
            name: '키워드',
            type: 'input',
            value: ''
        }
    ];

    columnDefs: (ColDef | ColGroupDef)[] = [
        { headerName: '회원명', field: 'USR_NAME', width: 100 },
        { headerName: '아이디', field: 'USR_ID', width: 100 },
        { headerName: '연락처', field: 'USR_TEL', width: 150 },
        { headerName: 'SNS여부', field: 'USR_SNS_WAY', width: 100 },
        { headerName: '예약횟수', field: '', width: 100 },
        { headerName: '가입일시', field: 'USR_CREATE_NM', width: 100 }
    ];
}

export class UserDetailModel {
    usrObj: Array<object> = [
        {
            name: '회원명',
            id: 'USR_NAME',
            type: 'input',
            value: '',
            required: true
        },
        {
            name: '아이디',
            id: 'USR_ID',
            type: 'input',
            value: '',
            required: true
        },
        {
            name: '휴대폰번호',
            id: 'USR_TEL',
            type: 'input',
            value: '',
            required: true
        },
        {
            name: 'SNS경로',
            id: 'USR_SNS_WAY',
            type: 'select',
            value: '',
            required: true,
            data: CommonCode.getCode('sns')
        },
        {
            name: '예약횟수',
            id: 'USR',
            type: 'input',
            value: ''
            // required: true
        },
        {
            name: '사용횟수',
            id: 'USR',
            type: 'input',
            value: ''
            // required: true
        },
        {
            name: '가입일시',
            id: 'USR_CREATE',
            type: 'date',
            value: '',
            disable: true
        }
    ];
}
