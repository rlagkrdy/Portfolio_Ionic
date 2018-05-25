"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commonCode_1 = require("../../../commonCode");
var UserListModel = /** @class */ (function () {
    function UserListModel() {
        this.searchObj = [
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
                data: commonCode_1.CommonCode.getCode('sns')
            },
            {
                id: 'KEYWORD',
                name: '키워드',
                type: 'input',
                value: ''
            }
        ];
        this.columnDefs = [
            { headerName: '회원명', field: 'USR_NAME', width: 100 },
            { headerName: '아이디', field: 'USR_ID', width: 100 },
            { headerName: '연락처', field: 'USR_TEL', width: 150 },
            { headerName: 'SNS여부', field: 'USR_SNS_WAY', width: 100 },
            { headerName: '예약횟수', field: '', width: 100 },
            { headerName: '가입일시', field: 'USR_CREATE_NM', width: 100 }
        ];
    }
    return UserListModel;
}());
exports.UserListModel = UserListModel;
var UserDetailModel = /** @class */ (function () {
    function UserDetailModel() {
        this.usrObj = [
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
                data: commonCode_1.CommonCode.getCode('sns')
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
    return UserDetailModel;
}());
exports.UserDetailModel = UserDetailModel;
//# sourceMappingURL=userModel.js.map