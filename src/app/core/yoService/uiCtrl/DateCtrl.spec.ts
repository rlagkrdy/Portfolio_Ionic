import { TestBed } from '@angular/core/testing';
import { DateCtrl } from './DateCtrl';
import { UserModel } from '../../../model/data/userModel';
import { NgForm } from '@angular/forms';

describe('DateCtrl', () => {
  let dateCtrl: DateCtrl;
  const usrModel: any = new UserModel();
  const usrObjArr: Array<any> = usrModel.usrDetailObj;
  const testForm = {
    controls: {
      USR_CREATE_NM: {
        setValue: value => {
          console.log('value', value);
        }
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateCtrl]
    });
    dateCtrl = TestBed.get(DateCtrl);
  });

  it('should be create', () => {
    expect(dateCtrl).toBeTruthy();
  });

  it('init() :: dateCtrl.setOne를 인자값으로 넘겼을 때 dateCtrl.setOne함수가 실행되어야 한다.', () => {
    const setOne: jasmine.Spy = spyOn(dateCtrl, 'setOne');
    usrObjArr[6].value = '2018-06-22';
    dateCtrl.init(usrObjArr, testForm, dateCtrl.setOne);
    expect(setOne).toHaveBeenCalled();
  });

  it('init() :: dateCtrl.setRange를 인자값으로 넘겼을 때 dateCtrl.setRange함수가 실행되어야 한다.', () => {
    const setOne: jasmine.Spy = spyOn(dateCtrl, 'setRange');
    usrObjArr[6].value = '2018-06-22';
    dateCtrl.init(usrObjArr, testForm, dateCtrl.setRange);
    expect(setOne).toHaveBeenCalled();
  });
});
