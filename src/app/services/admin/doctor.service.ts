import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + '/admin/doctors/list');
  }

  active(id) {
    return this.http.get(environment.apiUrl + `/admin/doctors/activate/${id}`);
  }

  ajouter(name, email, telephone, service, password,role) {
    return this.http.post(environment.apiUrl + '/admin/doctors/store', {
      name: name,
      email: email,
      telephone: telephone,
      service: service,
      password: password,
      role:role
    });
  }

  editer(id, name, email, telephone, service, password,role) {
    return this.http.post(environment.apiUrl + '/admin/doctors/update', {
      id: id,
      name: name,
      email: email,
      telephone: telephone,
      service: service,
      password: password,
      role:role
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/doctors/show/${id}`);
  }

  delete(id) {
    return this.http.post(environment.apiUrl + `/admin/doctors/delete`, {
      id: id,
    });
  }
}
