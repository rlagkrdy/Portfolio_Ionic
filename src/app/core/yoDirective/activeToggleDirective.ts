import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[toggleActive]'
})
export class ToggleActiveDirective {
    @Input('toggleActive') private className: string;

    constructor(private _el: ElementRef) {}
    @HostListener('click')
    toggle(_eventTarget: EventTarget) {
        let classArr: any = document.querySelectorAll('.' + this.className);
        classArr.forEach(element => {
            element.classList.remove('active');
        });

        this._el.nativeElement.classList.add('active');
    }
}
