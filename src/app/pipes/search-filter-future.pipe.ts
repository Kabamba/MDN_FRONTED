import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterFuture',
})
export class SearchFilterFuturePipe implements PipeTransform {
  transform(futures: any[], searchFuture: string): any {
    if (!futures || !searchFuture) {
      return futures;
    }

    return futures.filter(future => {
      future.patient_name.toLocaleLowerCase().includes(searchFuture.toLocaleLowerCase());
    });
  }
}
