import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SocietyService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + '/admin/societies/list');
  }

  ajouter(libelle, category_id) {
    return this.http.post(environment.apiUrl + '/admin/societies/store', {
      libelle: libelle,
      category_id: category_id,
    });
  }

  editer(id, libelle, category_id) {
    return this.http.post(environment.apiUrl + '/admin/societies/update', {
      id: id,
      libelle: libelle,
      category_id: category_id,
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/societies/show/${id}`);
  }

  delete(id) {
    return this.http.post(environment.apiUrl + `/admin/societies/delete`, {
      id: id,
    });
  }
}
