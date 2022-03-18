import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../../services/admin/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.css']
})
export class NavLeftComponent implements OnInit {
  @Output() public wrapper: EventEmitter<any> = new EventEmitter();
  @Input() addActive: any;

  activeLink = false;
  isWrapper = false;
  user:any


  constructor(private auth: AuthService, private router: Router) {}


  addClass() {
    if (this.activeLink == false  && this.isWrapper == false) {
        this.activeLink = true
        this.isWrapper = true;
    } else {
      this.activeLink = false;
      this.isWrapper = false;
    }
    this.wrapper.emit(this.isWrapper);
  }

  ngOnInit(): void {
    this.getRole();
  }

  getRole(){
    const localData: any = localStorage.getItem('user');
    const userObj = JSON.parse(localData);
    this.user = userObj;
  }
  
  logout(){
    this.auth.Logout().subscribe((res)=>{
      localStorage.removeItem('user')
      localStorage.removeItem('theme')
      this.auth.toggleLogin(false);
      this.router.navigate(['/admin/login']);
    }, (err) =>{
      this.router.navigate(['/admin/login']);
    });
  }

}
