import { ColDef, ColGroupDef } from 'ag-grid';
import { CommonCode } from '../../commonCode';
import { DetailObj } from '../../core/yoComponent/yo-detail/yo-detail.component';
import { SearchObj } from '../../core/yoComponent/yo-search/yo-search.component';

export class UserDeleteModel {
  private usrObj: SearchObj[] = [
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

  private usrDeleteObj: SearchObj[] = [
    {
      id: 'USR_DELETE_DATE',
      name: '탈퇴일시',
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

  private usrDefs: (ColDef | ColGroupDef)[] = [
    { headerName: '회원명', field: 'USR_NAME', width: 100 },
    { headerName: '아이디', field: 'USR_ID', width: 100 },
    { headerName: '연락처', field: 'USR_TEL', width: 150 },
    { headerName: 'SNS여부', field: 'USR_SNS_WAY', width: 100 },
    { headerName: '예약횟수', field: 'RESERV_TIME', width: 100 },
    { headerName: '가입일시', field: 'USR_CREATE_NM', width: 100 }
  ];

  private usrDeleteDefs: (ColDef | ColGroupDef)[] = [
    { headerName: '회원명', field: 'USR_NAME', width: 100 },
    { headerName: '아이디', field: 'USR_ID', width: 100 },
    { headerName: '연락처', field: 'USR_TEL', width: 150 },
    { headerName: 'SNS여부', field: 'USR_SNS_WAY', width: 100 },
    { headerName: '예약횟수', field: 'RESERV_TIME', width: 100 },
    { headerName: '탈퇴일시', field: 'USR_DELETE_DATE_NM', width: 100 }
  ];

  private usrTitle: string = '회원관리 > 유효회원';
  private usrDeleteTitle: string = '회원관리 > 탈퇴회원';

  private usrDetailTitle: string = '회원관리 > 회원상세';
  private usrDetailObj: DetailObj[] = [
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
      data: CommonCode.getCode('sns'),
      required: true
    },
    {
      name: '예약횟수',
      id: 'RESERV_TIME',
      type: 'input',
      value: '',
      disable: true
    },
    {
      name: '사용금액',
      id: 'SUM_PRICE',
      type: 'input',
      value: '',
      disable: true
    },
    {
      name: '가입일시',
      id: 'USR_CREATE_NM',
      type: 'date',
      value: '',
      disable: true
    }
  ];
}
