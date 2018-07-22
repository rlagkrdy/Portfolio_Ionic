import { DetailObj } from '../../core/yoComponent/yo-detail/yo-detail.component';

export class DefModel {
    private defDetailTitle: string = '설정관리';
    private defDetailObj: DetailObj[] = [
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
}
