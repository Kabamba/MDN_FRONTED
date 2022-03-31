import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  Payslist() {
    return this.http.get(environment.apiUrl + `/admin/pays/list`);
  }

  list() {
    return this.http.get(environment.apiUrl + `/admin/patients/list`);
  }

  ajouter(
    pays_natal,
    pays_residence,
    docteur,
    category,
    society,
    num_dossier,
    nom,
    prenom,
    date_naiss,
    lieu_naiss,
    num_carte,
    langue,
    sexe,
    etat_civil,
    adresse,
    boite_postal,
    email,
    telephone_fixe,
    telephone_mobile,
    profession
  ) {
    return this.http.post(environment.apiUrl + '/admin/patients/store', {
      pays_natal: pays_natal,
      pays_residence: pays_residence,
      docteur: docteur,
      category: category,
      society: society,
      num_dossier: num_dossier,
      nom: nom,
      prenom: prenom,
      date_naiss: date_naiss,
      lieu_naiss: lieu_naiss,
      num_carte: num_carte,
      langue: langue,
      sexe: sexe,
      etat_civil: etat_civil,
      adresse: adresse,
      boite_postal: boite_postal,
      email: email,
      telephone_fixe: telephone_fixe,
      telephone_mobile: telephone_mobile,
      profession: profession,
    });
  }

  editer(
    id,
    pays_natal,
    pays_residence,
    docteur,
    category,
    society,
    num_dossier,
    nom,
    prenom,
    date_naiss,
    lieu_naiss,
    num_carte,
    langue,
    sexe,
    etat_civil,
    adresse,
    boite_postal,
    email,
    telephone_fixe,
    telephone_mobile,
    profession
  ) {
    return this.http.post(environment.apiUrl + '/admin/patients/update', {
      id: id,
      pays_natal: pays_natal,
      pays_residence: pays_residence,
      docteur: docteur,
      category: category,
      society: society,
      num_dossier: num_dossier,
      nom: nom,
      prenom: prenom,
      date_naiss: date_naiss,
      lieu_naiss: lieu_naiss,
      num_carte: num_carte,
      langue: langue,
      sexe: sexe,
      etat_civil: etat_civil,
      adresse: adresse,
      boite_postal: boite_postal,
      email: email,
      telephone_fixe: telephone_fixe,
      telephone_mobile: telephone_mobile,
      profession: profession,
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/patients/show/${id}`);
  }

  recherche(word) {
    return this.http.post(environment.apiUrl + `/admin/patients/search`, {
      search: word,
    });
  }

  delete(id) {
    return this.http.post(environment.apiUrl + `/admin/patients/delete`, {
      id: id,
    });
  }
}
