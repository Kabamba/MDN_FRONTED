import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReceptsService } from '../../../services/admin/recepts.service';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../../../services/admin/theme.service';
import { RoleService } from '../../../services/admin/role.service';

@Component({
  selector: 'app-recepts',
  templateUrl: './recepts.component.html',
  styleUrls: ['./recepts.component.css'],
})
export class ReceptsComponent implements OnInit, AfterViewInit{
  errors = {
    name: '',
    email: '',
    password: '',
    telephone: '',
    role: '',
  };

  isLoading = false;
  isLoadindTable = false;
  isAdding = false;
  showModal = false;
  isWrapper = false;
  addActive = false;

  recepts: any[] = [];
  roles: any[] = [];

  key = 'id';
  reverse: boolean = false;
  p: number = 1;

  nom: any;

  brandForm: FormGroup;

  constructor(private recept: ReceptsService,private role:RoleService,private toastr: ToastrService,private theme:ThemeService) {}

  wrapper(data) {
    this.isWrapper = data;
  }

  toggle(event: Event) {
    if (this.addActive == false) {
      this.addActive = true;
    } else {
      this.addActive = false;
    }
    event.stopPropagation();
  }

  activeModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();

    this.errors.email = '';
    this.errors.name = '';
    this.errors.telephone = '';
    this.errors.password = '';
    this.errors.role = '';
  }

  stop(event: Event) {
    event.stopPropagation();
  }

  night(data){
    const body = document.querySelector('body');
    if(data){
      body.classList.add('dark')
    }else{
      body.classList.remove('dark')
    }
  }
  
  
  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      name: new FormControl(''),
      email: new FormControl(''),
      role: new FormControl('0'),
      telephone: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.list();
    this.getRoles();
    this.resetForm();
    this.night(this.theme.butu());
  }

  list() {
    this.isLoadindTable = true;
    this.recept.list().subscribe(
      (res: any) => {
        this.isLoadindTable = false;
        this.recepts = res.data;
      },
      (err) => {this.isLoadindTable = false;}
    );
  }

  getRoles(){
    this.role.list().subscribe(
      (res: any) => {
        this.roles = res;
      },
      (err) => {
      }
    );
  }


  sauvegarder() {
    this.isAdding = true;

    if (this.brandForm.value.id == '0') {
      this.recept
        .ajouter(
          this.brandForm.value.name,
          this.brandForm.value.email,
          this.brandForm.value.telephone,
          this.brandForm.value.password,
          this.brandForm.value.role
        )
        .subscribe(
          (res: any) => {
            this.toastr.success(res.message);
            this.ngOnInit();
            this.closeModal();
            this.isAdding = false;
          },
          (err) => {
            this.errors = err.error.errors;
            this.isAdding = false;
          }
        );
    } else {
      this.recept
        .editer(
          this.brandForm.value.id,
          this.brandForm.value.name,
          this.brandForm.value.email,
          this.brandForm.value.telephone,
          this.brandForm.value.password,
          this.brandForm.value.role
        )
        .subscribe(
          (res: any) => {
            if (res.visibility == false) {
              this.toastr.error(res.message);
            } else {
              this.toastr.success(res.message);
            }

            this.ngOnInit();
            this.closeModal();
            this.isAdding = false;
          },
          (err) => {
            console.log(err);
            this.errors = err.error.errors;
            this.isAdding = false;
          }
        );
    }
  }

  show(id) {
    this.recept.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.id),
          name: new FormControl(res.name),
          email: new FormControl(res.email),
          role: new FormControl(res.role_id),
          telephone: new FormControl(res.telephone),
          password: new FormControl(res.password),
        });
        this.activeModal();
      },
      (err) => {}
    );
  }

  activer(id: any) {
    this.recept.active(id).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.ngOnInit();
      },
      (err) => {}
    );
  }

  delete(id) {
    this.recept.delete(id).subscribe(
      (res: any) => {
        if (res.visibility == false) {
          this.toastr.error(res.message);
        } else {
          this.toastr.success(res.message);
        }
        this.ngOnInit();
      },
      (err) => {}
    );
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  search() {
    if (this.nom == '') {
      this.ngOnInit();
    } else {
      this.recepts = this.recepts.filter((res: any) => {
        return res.name.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      });
    }
  }

  tooltip(id, event: Event) {
    const divs = document.querySelectorAll(`[id*="dropup-"]`);

    for (let i = 0; i < divs.length; i++) {
      divs[i].classList.remove('active');
    }

    const elem = document.querySelector('#dropup-' + id);
    elem.classList.add('active');

    event.stopPropagation();
  }

  closeAll() {
    const divs = document.querySelectorAll(`[id*="dropup-"]`);

    for (let i = 0; i < divs.length; i++) {
      divs[i].classList.remove('active');
    }
  }

  ngAfterViewInit() {
    document.querySelector('html').addEventListener('click', (e) => {
      this.addActive = false;
      e.stopPropagation();
    })
  }

}
