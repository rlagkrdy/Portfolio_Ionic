"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DaumPostModel_1 = require("./DaumPostModel");
var DaumPostService = /** @class */ (function () {
    // private geocoder: any = new google.maps.Geocoder();
    // google.js 추가 해야함
    function DaumPostService() {
        this._objId = 'daumPostCode';
        this._dataEleArr = DaumPostModel_1.DataEleArr;
        this._lngLatEleArr = DaumPostModel_1.LngLatEleArr;
    }
    DaumPostService.prototype.openPost = function () {
        var daumPostEle = document.getElementById(this._objId), daumPostCode = new daum.Postcode({
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
    DaumPostService.prototype.setPostData = function (data) {
        // (R)도로명 주소, (J)지번 주소
        data.userSelectAddr =
            data.userSelectedType === 'R'
                ? data.roadAddress
                : data.jibunAddress;
        // this.geocoder.geocode({ address: data.userSelectAddr }, this.setGoogleLngLat);
        this.setEleValue(data);
    };
    DaumPostService.prototype.setEleValue = function (data) {
        this._dataEleArr.forEach(function (item) {
            document.querySelector('.' + item.target)['value'] = data[item.key];
        });
    };
    DaumPostService.prototype.setGoogleLngLat = function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            this._lngLatEleArr.forEach(function (item) {
                document.querySelector('.' + item.target)['value'] =
                    results[0].geometry.location[item.key];
            });
        }
    };
    DaumPostService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], DaumPostService);
    return DaumPostService;
}());
exports.DaumPostService = DaumPostService;
//# sourceMappingURL=daum-post.service.js.map