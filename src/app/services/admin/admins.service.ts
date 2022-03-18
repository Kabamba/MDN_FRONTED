import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + '/admin/admins/list');
  }

  active(id) {
    return this.http.get(environment.apiUrl + `/admin/admins/activate/${id}`);
  }

  ajouter(name, email, telephone, password, role) {
    return this.http.post(environment.apiUrl + '/admin/admins/store', {
      name: name,
      telephone: telephone,
      email: email,
      password: password,
      role: role,
    });
  }

  editer(id, name, email, telephone, password, role) {
    return this.http.post(environment.apiUrl + '/admin/admins/update', {
      id: id,
      name: name,
      email: email,
      telephone: telephone,
      password: password,
      role: role,
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/admins/show/${id}`);
  }

  delete(id) {
    return this.http.post(environment.apiUrl + `/admin/admins/delete`, {
      id: id,
    });
  }
}
