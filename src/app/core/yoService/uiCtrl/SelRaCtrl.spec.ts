import { TestBed } from '@angular/core/testing';
import { SelRaCtrl } from './SelRaCtrl';
import { UserModel } from '../../../model/data/userModel';

describe('SelRaCtrl', () => {
    let selRaCtrl: SelRaCtrl;
    const usrModel: any = new UserModel();
    const usrObjArr: Array<any> = usrModel.usrDetailObj;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SelRaCtrl]
        });
        selRaCtrl = TestBed.get(SelRaCtrl);
    });

    it('should be create', () => {
        expect(selRaCtrl).toBeTruthy();
    });

    it('init() :: type이 select, radio인데 value가 data에 매칭되는 값이 없다면 value는 ""이야 한다.', () => {
        usrObjArr[3].value = 'gg';
        selRaCtrl.init(usrObjArr);
        usrObjArr.forEach(item => {
            if (selRaCtrl['isTypes'].test(item.type)) {
                expect(item.value).toBe('');
            }
        });
    });

    it('init() :: type이 select, radio인데 value가 data에 매칭되는 값이 있다면 value는 같아야 한다.', () => {
        usrObjArr[3].value = 'NAVER';
        selRaCtrl.init(usrObjArr);
        usrObjArr.forEach(item => {
            if (selRaCtrl['isTypes'].test(item.type)) {
                expect(item.value).toBe('NAVER');
            }
        });
        expect(usrObjArr).toBe(usrObjArr);
    });

    it('init() :: 두번째 인자로 함수를 넣어주면 해당 함수는 호출되어야 한다.', () => {
        this.funcTest = (param: any) => {
            console.log(param);
        };
        const fun: jasmine.Spy = spyOn(this, 'funcTest');
        selRaCtrl.init(usrObjArr, this.funcTest);
        expect(fun).toHaveBeenCalled();
    });

    it('init() :: 두번째 인자로 SelRaCtrl.reset함수를 넘겨주면 value를 ""로 변경되어야 한다.', () => {
        usrObjArr[3].value = 'NAVER';
        selRaCtrl.init(usrObjArr, selRaCtrl.reset);
        usrObjArr.forEach(item => {
            if (selRaCtrl['isTypes'].test(item.type)) {
                expect(item.value).toBe('');
            }
        });
    });
});
