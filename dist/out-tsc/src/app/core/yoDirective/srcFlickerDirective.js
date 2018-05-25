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
var SrcFlickerDirective = /** @class */ (function () {
    function SrcFlickerDirective(_el) {
        this._el = _el;
        this.separatorST = '_n.png';
        this.separatorED = '_p.png';
    }
    SrcFlickerDirective.prototype.flicker = function (_eventTarget) {
        var targetEl = this._el.nativeElement, srcED = targetEl
            .getAttribute('src')
            .replace(this.separatorED, this.separatorST), srcST = srcED.replace(this.separatorST, this.separatorED);
        targetEl.setAttribute('src', srcST);
        if (this.timeObj) {
            clearTimeout(this.timeObj);
        }
        this.timeObj = setTimeout(function () {
            targetEl.setAttribute('src', srcED);
        }, 125);
    };
    __decorate([
        core_1.HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [EventTarget]),
        __metadata("design:returntype", void 0)
    ], SrcFlickerDirective.prototype, "flicker", null);
    SrcFlickerDirective = __decorate([
        core_1.Directive({
            selector: '[srcFlicker]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], SrcFlickerDirective);
    return SrcFlickerDirective;
}());
exports.SrcFlickerDirective = SrcFlickerDirective;
//# sourceMappingURL=srcFlickerDirective.js.map