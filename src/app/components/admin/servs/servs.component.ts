import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/admin/service.service';
import { ThemeService } from '../../../services/admin/theme.service';

@Component({
  selector: 'app-servs',
  templateUrl: './servs.component.html',
  styleUrls: ['./servs.component.css']
})
export class ServsComponent implements OnInit, AfterViewInit{
  errors = {
    libelle: '',
  };

  isLoading = false;
  isAdding = false;
  showModal = false;
  isWrapper = false;
  isLoadindTable = false;
  addActive = false;

  services: any[] = [];

  key = 'id';
  reverse: boolean = false;
  p: number = 1;
  
  libelle: any;

  brandForm: FormGroup;

  constructor(private service: ServiceService, private toastr: ToastrService,private theme:ThemeService) {}

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

    this.errors.libelle = ''
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
      libelle: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.list();
    this.resetForm();
    this.night(this.theme.butu());
  }

  list() {
    this.isLoadindTable = true;
    this.service.list().subscribe(
      (res: any) => {
        this.isLoadindTable = false;
        this.services = res;
      },
      (err) => {this.isLoadindTable = false;}
    );
  }

  sauvegarder() {
    this.isAdding = true;

    if (this.brandForm.value.id == '0') {
      this.service
        .ajouter(
          this.brandForm.value.libelle,
        ).subscribe((res: any) => {
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
      this.service
        .editer(
          this.brandForm.value.id,
          this.brandForm.value.libelle,
        ).subscribe((res: any) => {

            if (res.visibility == false) {
              this.toastr.error(res.message);
            }else{
              this.toastr.success(res.message);
            }

            this.ngOnInit();
            this.closeModal();
            this.isAdding = false;
          },
          (err) => {
            this.errors = err.error.errors;
            this.isAdding = false;
          }
        );
    }
  }

  show(id) {
    this.service.show(id).subscribe((res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.id),
          libelle: new FormControl(res.libelle),
        });
        this.activeModal();
      },
      (err) => {}
    );
  }

  delete(id){
    this.service.delete(id).subscribe(
      (res: any) => {
        if (res.visibility == false) {
          this.toastr.error(res.message);
        }else{
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
    if (this.libelle == '') {
      this.ngOnInit();
    } else {
      this.services = this.services.filter((res: any) => {
        return res.libelle
          .toLocaleLowerCase()
          .match(this.libelle.toLocaleLowerCase());
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
