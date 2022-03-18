import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../services/admin/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
    return this.auth.statut().pipe(
      map((LoggedIn:boolean) =>{
        if(LoggedIn){
          // const permission = route.data['permission'];
          // const permissions = this.auth.getPerms();
          // return permissions.includes(permission);
          return true
        }else{
          return this.router.navigate(['/admin/login']);
        }
      })
    )
  }
  
}
