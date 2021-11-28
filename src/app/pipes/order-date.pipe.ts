import { Pipe, PipeTransform } from '@angular/core';
import { Repositories } from '../types/Repositories';

@Pipe({ name: 'orderByDate' })
export class OrderByDatePipe implements PipeTransform {
  transform(array: any[], filterValue: string) {
    array.sort((a, b) => {
      a = new Date(a.created_at);
      b = new Date(b.created_at);
      if (filterValue === 'Ascending') return a - b;
      else if (filterValue === 'Descending') return b - a;
    });
  }
}
