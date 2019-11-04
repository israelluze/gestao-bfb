import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cep'
})
export class CepPipe implements PipeTransform {
    transform(value: string): any {
        if (!value) {
            return null;
        }
        value = value.toString().replace(/\D/g, '');

        return value.toString().replace(/(\d{5})(\d{3})/g, '$1-$2');
    }
}