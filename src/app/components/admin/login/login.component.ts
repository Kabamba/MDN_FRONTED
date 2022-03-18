import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/admin/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../../assets/css/loginReset.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean;

  brandForm: FormGroup;

  invalide: any;

  errors = {
    email: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router,private tostr:ToastrService) {}

  ngAfterViewInit() {
    document.querySelector('body').classList.add('login');
    document.querySelector('body').classList.remove('dark');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('login');
    document.querySelector('body').classList.remove('dark');
  }

  resetForm() {
    this.brandForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  login() {
    this.isLoading = true;

    this.auth
      .Login(this.brandForm.value.email, this.brandForm.value.password)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.visibility == true) {
            localStorage.setItem('user', JSON.stringify(res));
            localStorage.setItem('theme', JSON.stringify(res.theme));
            this.auth.toggleLogin(true);
            this.router.navigate(['/admin/home']);
          } else {
            this.tostr.error(res.message)
            this.errors.email = '';
            this.errors.password = '';
          }
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
          this.errors = err.error.errors;
        }
      );
  }
}
