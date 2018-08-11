import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[srcFlicker]'
})
export class SrcFlickerDirective {
    private timeObj: any;
    private separatorST: string = '_n.png';
    private separatorED: string = '_p.png';

    constructor(private _el: ElementRef) {}

    @HostListener('click')
    flicker(_eventTarget: EventTarget) {
        const targetEl = this._el.nativeElement,
            srcED = targetEl
                .getAttribute('src')
                .replace(this.separatorED, this.separatorST),
            srcST = srcED.replace(this.separatorST, this.separatorED);

        targetEl.setAttribute('src', srcST);

        if (this.timeObj) {
            clearTimeout(this.timeObj);
        }

        this.timeObj = setTimeout(() => {
            targetEl.setAttribute('src', srcED);
        }, 125);
    }
}
