"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PunctuationPipe = /** @class */ (function () {
    function PunctuationPipe() {
    }
    PunctuationPipe.prototype.transform = function (value, demiStr, demiNum) {
        if (!value) {
            return 0;
        }
        var str = value.toString(), length = str.length;
        if (length < 10 || length > 11) {
            return str;
        }
        demiNum = demiNum ? demiNum : 3;
        demiStr = demiStr ? demiStr : ',';
        var demiFirst = length % demiNum, returnValue = '';
        for (var i = 0; i < length; i = demiFirst) {
            if (i !== 0) {
                demiFirst += demiNum;
            }
            returnValue += str.substring(i, demiFirst);
            if (i + demiNum < length) {
                returnValue += demiStr;
            }
        }
        return returnValue;
    };
    PunctuationPipe = __decorate([
        core_1.Pipe({
            name: 'punctuation'
        })
    ], PunctuationPipe);
    return PunctuationPipe;
}());
exports.PunctuationPipe = PunctuationPipe;
//# sourceMappingURL=punctuation.js.map