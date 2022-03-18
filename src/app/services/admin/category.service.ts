import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + '/admin/categories/list');
  }

  ajouter(libelle) {
    return this.http.post(environment.apiUrl + '/admin/categories/store', {
      libelle: libelle,
    });
  }

  editer(id, libelle) {
    return this.http.post(environment.apiUrl + '/admin/categories/update', {
      id: id,
      libelle: libelle,
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/categories/show/${id}`);
  }

  delete(id) {
    return this.http.post(environment.apiUrl + `/admin/categories/delete`, {
      id: id,
    });
  }

}
