import { Injectable } from '@angular/core';
import { DaumPostEle, DataEleArr, LngLatEleArr } from './DaumPostModel';

declare var daum;
declare var google;

@Injectable()
export class DaumPostService {
    public _objId: string = 'daumPostCode';
    private _dataEleArr: Array<DaumPostEle> = DataEleArr;
    private _lngLatEleArr: Array<DaumPostEle> = LngLatEleArr;
    // private geocoder: any = new google.maps.Geocoder();
    // google.js 추가 해야함

    constructor() {}

    public openPost(): void {
        const daumPostEle = document.getElementById(this._objId),
            daumPostCode = new daum.Postcode({
                oncomplete: function(data) {
                    daumPostEle.style.display = 'none';
                    this.setPostData(data);
                },
                width: '100%',
                height: '100%'
            });
        daumPostCode.embed(daumPostEle);
        daumPostEle.style.display = 'block';
    }

    private setPostData(data): void {
        // (R)도로명 주소, (J)지번 주소
        data.userSelectAddr =
            data.userSelectedType === 'R'
                ? data.roadAddress
                : data.jibunAddress;
        // this.geocoder.geocode({ address: data.userSelectAddr }, this.setGoogleLngLat);
        this.setEleValue(data);
    }

    private setEleValue(data: any): void {
        this._dataEleArr.forEach(item => {
            document.querySelector('.' + item.target)['value'] = data[item.key];
        });
    }

    private setGoogleLngLat(results, status): void {
        if (status === google.maps.GeocoderStatus.OK) {
            this._lngLatEleArr.forEach(item => {
                document.querySelector('.' + item.target)['value'] =
                    results[0].geometry.location[item.key];
            });
        }
    }
}
