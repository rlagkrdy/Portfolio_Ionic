import { ColDef, ColGroupDef } from 'ag-grid';

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
            data: [
                { name: '전체', value: '' },
                { name: '네이버', value: 'NAVER' },
                { name: '페이스북', value: 'FACE' },
                { name: '구글', value: 'GOOGLE' }
            ]
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

export class UserDetailModel {}
