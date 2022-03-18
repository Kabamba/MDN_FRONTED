import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DoctorService } from '../../../services/admin/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../services/admin/service.service';
import { ThemeService } from '../../../services/admin/theme.service';
import { RoleService } from '../../../services/admin/role.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit, AfterViewInit {
  errors = {
    name: '',
    email: '',
    password: '',
    telephone: '',
    service: '',
    role: '',
  };

  isLoading = false;
  isAdding = false;
  isLoadindTable = false;
  showModal = false;
  openSchedule = false;

  isWrapper = false;

  addActive = false;

  doctors: any[] = [];
  services: any[] = [];
  roles: any[] = [];

  key = 'id';
  reverse: boolean = false;
  p: number = 1;

  nom: any;

  brandForm: FormGroup;

  ScheduleForm: FormGroup;

  constructor(
    private doctor: DoctorService,
    private role : RoleService,
    private service: ServiceService,
    private toastr: ToastrService,
    private theme:ThemeService
  ) {}

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
    this.errors.service = '';
    this.errors.password = '';
    this.errors.role = '';
  }

  night(data){
    const body = document.querySelector('body');
    if(data){
      body.classList.add('dark')
    }else{
      body.classList.remove('dark')
    }
  }
  
  stop(event: Event) {
    event.stopPropagation();
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      name: new FormControl(''),
      email: new FormControl(''),
      telephone: new FormControl(''),
      service: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.list();
    this.getService();
    this.getRoles();
    this.resetForm();
    this.night(this.theme.butu());
  }

  list() {
    this.isLoadindTable = true;
    this.doctor.list().subscribe(
      (res: any) => {
      this.isLoadindTable = false;
        this.doctors = res.data;
      },
      (err) => {this.isLoadindTable = false;}
    );
  }

  getService() {
    this.service.list().subscribe(
      (res: any) => {
        this.services = res;
      },
      (err) => {}
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
      this.doctor
        .ajouter(
          this.brandForm.value.name,
          this.brandForm.value.email,
          this.brandForm.value.telephone,
          this.brandForm.value.service,
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
      this.doctor
        .editer(
          this.brandForm.value.id,
          this.brandForm.value.name,
          this.brandForm.value.email,
          this.brandForm.value.telephone,
          this.brandForm.value.service,
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
            this.errors = err.error.errors;
            console.log(this.errors)
            this.isAdding = false;
          }
        );
    }
  }

  show(id) {
    this.doctor.show(id).subscribe(
      (res: any) => {
        console.log(res);
        this.brandForm = new FormGroup({
          id: new FormControl(res.id),
          name: new FormControl(res.name),
          email: new FormControl(res.email),
          role: new FormControl(res.role_id),
          telephone: new FormControl(res.telephone),
          service: new FormControl(res.service_id),
          password: new FormControl(),
        });

        this.activeModal();
      },
      (err) => {}
    );
  }

  activer(id: any) {
    this.doctor.active(id).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.ngOnInit();
      },
      (err) => {}
    );
  }

  delete(id) {
    this.doctor.delete(id).subscribe(
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
      this.doctors = this.doctors.filter((res: any) => {
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
