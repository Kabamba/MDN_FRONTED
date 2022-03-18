import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterToday'
})
export class SearchFilterTodayPipe implements PipeTransform {

  transform(todays: [],searchToday:string): unknown {
    return null;
  }

}
