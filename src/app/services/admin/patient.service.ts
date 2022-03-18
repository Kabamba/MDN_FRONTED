import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PatientService {

  constructor(private http: HttpClient) {}

  recherche(word){
    return this.http.post(environment.apiUrl + `/admin/patients/search`, {
      search: word
    });
  }
}
