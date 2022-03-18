import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  Login(email, password) {
    return this.http.post(environment.apiUrl + '/login', {
      email: email,
      password: password,
    });
  }

  toggleLogin(state: boolean) {
    this.isLogged.next(state);
  }

  statut() {
    const localData: any = localStorage.getItem('user');

    if (!localData) {
      this.isLogged.next(false);
    } else {
      const userObj = JSON.parse(localData);

      const tokken_expires_at = new Date(userObj.token_expires_at);
      const currentDate = new Date();

      if (tokken_expires_at > currentDate) {
        this.isLogged.next(true);
      } else {
        this.isLogged.next(false);
      }
    }

    return this.isLogged.asObservable();
  }

  Logout() {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const token = userObj.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(environment.apiUrl + '/logout', {
      headers: headers,
    });
  }

  user() {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const token = userObj.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(environment.apiUrl + '/user', {
      headers: headers,
    });
  }

  getPerms(){
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const permissions = userObj.permissions;

    return permissions as Array<string>;
  }

  caher(perm){
    const permissions = this.getPerms();

    return permissions.includes(perm);
  }

  theme(id) {
    return this.http.get(environment.apiUrl + `/admin/admins/theme/${id}`);
  }
}
