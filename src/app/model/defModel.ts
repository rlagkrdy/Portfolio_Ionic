import { ColDef, ColGroupDef } from 'ag-grid';
import { CommonCode } from '../commonCode';

export class DefModel {
    private defDetailObj: Array<any> = [
        {
            name: '이용약관동의',
            id: 'DEF_USE',
            type: 'editor',
            value: '',
            required: true
        },
        {
            name: '개인정보수집',
            id: 'DEF_PERSON',
            type: 'editor',
            value: '',
            required: true
        }
    ];

    private defTitle: string = '설정관리';
}
