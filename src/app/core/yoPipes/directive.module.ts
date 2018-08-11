import { NgModule } from '@angular/core';
import { PunctuationPipe } from './punctuation';

@NgModule({
    declarations: [PunctuationPipe],
    exports: [PunctuationPipe]
})
export class YoPipeModule {}
