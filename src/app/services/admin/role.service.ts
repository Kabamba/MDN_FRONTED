import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + '/admin/roles/list');
  }

  ajouter(libelle,permissions) {
    return this.http.post(environment.apiUrl + '/admin/roles/store', {
      libelle: libelle,
      permissions: permissions
    });
  }

  editer(id, libelle,permissions) {
    return this.http.post(environment.apiUrl + '/admin/roles/update', {
      id: id,
      libelle: libelle,
      permissions: permissions
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/roles/show/${id}`);
  }

  delete(id) {
    return this.http.post(environment.apiUrl + `/admin/roles/delete`, {
      id: id,
    });
  }
}
