export class CommonCode {
  public static URL: string = 'http://221.149.240.50:8080';

  public static getTitle(_type): string {
    let result: string;
    if (_type === 'usr') {
      result = '회원';
    } else if (_type === 'comp') {
      result = '회사';
    } else if (_type === 'prod') {
      result = '상품';
    } else if (_type === 'reserv') {
      result = '예약';
    } else if (_type === 'room') {
      result = '스터디룸';
    } else if (_type === 'def') {
      result = '설정관리';
    }
    return result;
  }

  public static getCode(_type): Array<any> {
    let result: Array<any>;
    if (_type === 'sns') {
      result = [
        { name: '전체', value: '' },
        { name: '네이버', value: 'NAVER' },
        { name: '페이스북', value: 'FACEBOOK' },
        { name: '구글', value: 'GOOGLE' }
      ];
    } else if (_type === 'prod') {
      result = [
        { name: '전체', value: '' },
        { name: '음료', value: '1' },
        { name: '과자', value: '2' }
      ];
    } else if (_type === 'reserv') {
      result = [
        { name: '전체', value: '' },
        { name: '예약대기', value: '1' },
        { name: '예약완료', value: '2' },
        { name: '예약취소', value: '3' },
        { name: '예약거절', value: '4' }
      ];
    }
    return result;
  }

  public static getStateObj(_objName: string): any {
    let result: any;
    if (_objName === 'reserv') {
      result = {
        id: 'RESERV_STATE',
        title: '예약상태변경',
        states: [
          { name: '예약대기', value: '1' },
          { name: '예약완료', value: '2' },
          { name: '예약취소', value: '3' },
          { name: '예약거절', value: '4' }
        ]
      };
    }
    return result;
  }
}
