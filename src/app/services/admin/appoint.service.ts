import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppointService {
  constructor(private http: HttpClient) {}

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/appoints/one/${id}`);
  }

  approuver(form) {
    return this.http.post(
      environment.apiUrl + `/admin/appoints/approuver`,
      form
    );
  }

  listToday() {
    return this.http.get(environment.apiUrl + '/admin/appoints/listoday');
  }

  listFuture() {
    return this.http.get(environment.apiUrl + '/admin/appoints/listfuture');
  }

  listLast() {
    return this.http.get(environment.apiUrl + '/admin/appoints/listlast');
  }

  listTodayDoctor(id) {
    return this.http.get(environment.apiUrl + `/admin/appoints/listoday/${id}`);
  }

  listFutureDoctor(id) {
    return this.http.get(
      environment.apiUrl + `/admin/appoints/listfuture/${id}`
    );
  }

  listLastDoctor(id) {
    return this.http.get(environment.apiUrl + `/admin/appoints/listlast/${id}`);
  }

  grilleDate(date_deb, date_fin) {
    return this.http.post(environment.apiUrl + `/admin/appoints/grille/date`, {
      date_deb: date_deb,
      date_fin: date_fin,
    });
  }

  grilleAll() {
    return this.http.get(environment.apiUrl + `/admin/appoints/grille/all`);
  }

  save(
    motif,
    description,
    recep_id,
    doctor_id,
    patient_id,
    date_heure_appoint
  ) {
    return this.http.post(environment.apiUrl + `/admin/appoints/store`, {
      motif: motif,
      description: description,
      recep_id: recep_id,
      doctor_id: doctor_id,
      patient_id: patient_id,
      date_heure_appoint: date_heure_appoint,
    });
  }
}
