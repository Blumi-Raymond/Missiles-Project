import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'missile',
  standalone: true
})
export class MissilePipe implements PipeTransform {

  transform(value: string) {
    return value+'🚀'
   }

}
