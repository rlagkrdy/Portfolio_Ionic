import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'punctuation'
})
export class PunctuationPipe implements PipeTransform {
    transform(value: string, demiStr?: string, demiNum?: number) {
        if (!value) {
            return 0;
        }
        let str: string = value.toString(),
            length: number = str.length;

        if (length < 10 || length > 11) {
            return str;
        }

        demiNum = demiNum ? demiNum : 3;
        demiStr = demiStr ? demiStr : ',';

        let demiFirst: number = length % demiNum,
            returnValue: string = '';

        for (let i: number = 0; i < length; i = demiFirst) {
            if (i !== 0) {
                demiFirst += demiNum;
            }

            returnValue += str.substring(i, demiFirst);

            if (i + demiNum < length) {
                returnValue += demiStr;
            }
        }

        return returnValue;
    }
}
