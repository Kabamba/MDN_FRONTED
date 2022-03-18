import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MotifService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + '/admin/motifs/list');
  }

  ajouter(libelle) {
    return this.http.post(environment.apiUrl + '/admin/motifs/store', {
      libelle: libelle,
    });
  }

  editer(id, libelle) {
    return this.http.post(environment.apiUrl + '/admin/motifs/update', {
      id: id,
      libelle: libelle,
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/motifs/show/${id}`);
  }

  delete(id) {
    return this.http.post(environment.apiUrl + `/admin/motifs/delete`, {
      id: id,
    });
  }
}
