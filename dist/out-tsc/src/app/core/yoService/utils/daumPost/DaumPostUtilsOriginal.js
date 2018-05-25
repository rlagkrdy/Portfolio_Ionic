"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DaumPostUtilsOriginal = /** @class */ (function () {
    function DaumPostUtilsOriginal() {
    }
    DaumPostUtilsOriginal.openPost = function () {
        var obj = 'daumPostCode', daumPostEle = document.getElementById(obj), daumPostCode = new daum.Postcode({
            oncomplete: function (data) {
                daumPostEle.style.display = 'none';
                this.setPostData(data);
            },
            width: '100%',
            height: '100%'
        });
        daumPostCode.embed(daumPostEle);
        daumPostEle.style.display = 'block';
    };
    DaumPostUtilsOriginal.setPostData = function (data) {
        var userSelectAddr = '';
        // 도로명 주소 선택시(R)
        // 지번 주소를 선택시(J)
        if (data.userSelectedType === 'R') {
            userSelectAddr = data.roadAddress;
        }
        else {
            userSelectAddr = data.jibunAddress;
        }
        var geocoderOption = { address: userSelectAddr }, geocoder = new google.maps.Geocoder();
        geocoder.geocode(geocoderOption, this.setGoogleLngLat);
        document.querySelector('.addr')['value'] = userSelectAddr;
        document.querySelector('.OADDR')['value'] = data.jibunAddress;
        document.querySelector('.NADDR')['value'] = data.address;
        document.querySelector('.ADDRST')['value'] = data.userSelectedType;
        document.querySelector('.ADDRBC')['value'] = data.bcode;
        document.querySelector('.ADDRZC')['value'] = data.zonecode;
        document.querySelector('.postcode')['value'] = data.zonecode;
    };
    DaumPostUtilsOriginal.setGoogleLngLat = function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            document.querySelector('#LON')['value'] = results[0].geometry.location.lng();
            document.querySelector('#LAT')['value'] = results[0].geometry.location.lat();
        }
    };
    return DaumPostUtilsOriginal;
}());
exports.DaumPostUtilsOriginal = DaumPostUtilsOriginal;
//# sourceMappingURL=DaumPostUtilsOriginal.js.map