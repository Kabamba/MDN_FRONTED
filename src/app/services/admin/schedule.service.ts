import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  
  listDoctor(id) {
    return this.http.get(environment.apiUrl + `/admin/appoints/listschedule/${id}`);
  }

  dispo(dayId, userId) {
    return this.http.post(environment.apiUrl + `/admin/appoints/dispo`, {
      day_id: dayId,
      doctor_id: userId,
    });
  }

  save(dayId, userId, heure_deb, heure_fin, max_pat) {
    return this.http.post(environment.apiUrl + `/admin/appoints/saveschdule`, {
      day_id: dayId,
      doctor_id: userId,
      heure_deb: heure_deb,
      heure_fin: heure_fin,
      max_pat: max_pat,
    });
  }
}
