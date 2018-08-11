import { NgModule } from '@angular/core';
import { SrcFlickerDirective } from './srcFlickerDirective';
import { ToggleActiveDirective } from './activeToggleDirective';

@NgModule({
    declarations: [ToggleActiveDirective, SrcFlickerDirective],
    exports: [ToggleActiveDirective, SrcFlickerDirective]
})
export class DirectiveModule {}
