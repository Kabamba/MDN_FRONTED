import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../services/admin/auth.service';


@Injectable({
  providedIn: 'root'
})
export class IsConnectGuard implements CanActivate {
  
  constructor(private auth:AuthService, private router: Router){}

  canActivate():any {
    return this.auth.statut().pipe(
      map((LoggedIn:boolean) =>{
        if(!LoggedIn){
          return true;
        }else{
          return this.router.navigate(['/admin/home']);
        }
      })
    )
  }
  
}
