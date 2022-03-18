import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../services/admin/auth.service';


@Injectable({
  providedIn: 'root'
})
export class IsActiveGuard implements CanActivate {
  
  constructor(private auth:AuthService, private router: Router){}

  canActivate(): any {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const isActive = userObj.is_active;

    if (isActive == 1) {
      return true;
    } else {
      return this.router.navigate(['/admin/login']);
    }
  }
  
}
