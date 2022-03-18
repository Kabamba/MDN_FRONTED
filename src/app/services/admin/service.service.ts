import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + '/admin/services/list');
  }

  ajouter(libelle) {
    return this.http.post(environment.apiUrl + '/admin/services/store', {
      libelle: libelle,
    });
  }

  editer(id, libelle) {
    return this.http.post(environment.apiUrl + '/admin/services/update', {
      id: id,
      libelle: libelle,
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/services/show/${id}`);
  }

  delete(id) {
    return this.http.post(environment.apiUrl + `/admin/services/delete`, {
      id: id,
    });
  }
}
