import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class FirstLetterCapitalPipe implements PipeTransform {

  transform(data:string){
    if (!data) {
      return '';
    }

    const words = data.split(' ');

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }

    return words.join(' ');
  }

}
