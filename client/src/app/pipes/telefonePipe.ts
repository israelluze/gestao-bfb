import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'telefone'
})
export class TelefonePipe implements PipeTransform {
    transform(value: string): any {
        if (!value) {
            return null;
        }
        return value.replace(/(\d)(\d{4})$/, '$1-$2');
    }
}