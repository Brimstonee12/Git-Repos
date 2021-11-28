import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderByValue' })
export class OrderByValuePipe implements PipeTransform {
  transform(array: any, filterValue: string) {
    array.sort((a, b) => {
      if (filterValue === 'Name') {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      } else if (filterValue === 'Language') {
        if (a.language < b.language) {
          return -1;
        }
        if (a.language > b.language) {
          return 1;
        }
        return 0;
      }
    });
  }
}
