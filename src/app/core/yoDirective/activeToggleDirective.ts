import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[toggleActive]'
})
export class ToggleActiveDirective {
    @Input('toggleActive') private classNames: string;

    constructor(private _el: ElementRef) {}
    @HostListener('click')
    toggle(_eventTarget: EventTarget) {
        const classArr: any = document.querySelectorAll('.' + this.classNames);
        classArr.forEach(element => {
            element.classList.remove('active');
        });

        this._el.nativeElement.classList.add('active');
    }
}
