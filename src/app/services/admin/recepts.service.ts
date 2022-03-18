import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReceptsService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + '/admin/recepts/list');
  }

  active(id) {
    return this.http.get(environment.apiUrl + `/admin/recepts/activate/${id}`);
  }

  ajouter(name, email, telephone, password, role) {
    return this.http.post(environment.apiUrl + '/admin/recepts/store', {
      name: name,
      telephone: telephone,
      email: email,
      password: password,
      role: role,
    });
  }

  editer(id, name, email, telephone, password, role) {
    return this.http.post(environment.apiUrl + '/admin/recepts/update', {
      id: id,
      name: name,
      email: email,
      telephone: telephone,
      password: password,
      role: role,
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/recepts/show/${id}`);
  }

  delete(id) {
    return this.http.post(environment.apiUrl + `/admin/recepts/delete`, {
      id: id,
    });
  }
}
