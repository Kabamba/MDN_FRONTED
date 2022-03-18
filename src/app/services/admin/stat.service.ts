import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})

export class StatService {
  constructor(private http: HttpClient) {}

  totrdv() {
    return this.http.get(environment.apiUrl + '/admin/stats/totrdv');
  }

  totdoc(id) {
    return this.http.get(environment.apiUrl + `/admin/stats/totrdv/${id}`);
  }
}
