import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from 'src/app/services/admin/permission.service';
import { RoleService } from 'src/app/services/admin/role.service';
import { ThemeService } from 'src/app/services/admin/theme.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  errors = {
    libelle: '',
    permissions: '',
  };

  isLoading = false;
  isAdding = false;
  isShowing = false;
  showModal = false;
  isWrapper = false;
  isLoadindTable = false;
  addActive = false;

  roles: any[] = [];
  permissions: any[] = [];
  actives: any[] = [];
  perms: any[] = [];

  key = 'id';
  reverse: boolean = false;
  p: number = 1;

  libelle: any;

  brandForm: FormGroup;

  constructor(
    private role: RoleService,
    private permission: PermissionService,
    private toastr: ToastrService,
    private theme: ThemeService
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

  activeModal(id) {
    this.showModal = true;
    if (id == 1) {
      this.isShowing = false;
    } else {
      this.isShowing = true;
    }
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();

    this.errors.libelle = '';
  }

  stop(event: Event) {
    event.stopPropagation();
  }

  night(data) {
    const body = document.querySelector('body');
    if (data) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      libelle: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.list();
    this.getPermissions();
    this.resetForm();
    this.night(this.theme.butu());
  }

  list() {
    this.isLoadindTable = true;
    this.role.list().subscribe(
      (res: any) => {
        this.isLoadindTable = false;
        this.roles = res;
      },
      (err) => {
        this.isLoadindTable = false;
      }
    );
  }

  getPermissions() {
    this.isLoadindTable = true;
    this.permission.list().subscribe(
      (res: any) => {
        this.isLoadindTable = false;
        this.permissions = res;
      },
      (err) => {
        this.isLoadindTable = false;
      }
    );
  }

  sauvegarder() {
    this.isAdding = true;

    var Formperm = document.getElementById('Formperm');
    var inputs = Formperm.getElementsByTagName('input');

    var selected = new Array();

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == 'checkbox') {
        if (inputs[i].checked && inputs[i].value != "on") {
          selected.push(inputs[i].value);
        }
      }
    }

    if (this.brandForm.value.id == '0') {
      this.role.ajouter(this.brandForm.value.libelle, selected).subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success(res.message);
          this.ngOnInit();
          this.closeModal();
          this.isAdding = false;
          this.isShowing = false;
        },
        (err) => {
          this.errors = err.error.errors;
          this.isAdding = false;
          this.isShowing = false;
        }
      );
    } else {
      this.role
        .editer(this.brandForm.value.id, this.brandForm.value.libelle, selected)
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
            this.isAdding = false;
          }
        );
    }
  }

  show(id) {
    this.isShowing = true;
    this.role.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.id),
          libelle: new FormControl(res.libelle),
        });
        
        var selected = new Array();
        this.perms = res.permissions;

        for (var i = 0; i < this.perms.length; i++) {
          selected.push(this.perms[i].id);
        }
        this.actives = selected;
        this.activeModal(2);
      },
      (err) => {}
    );
  }

  isActive(id) {
    return this.actives.includes(id);
  }

  delete(id) {
    this.role.delete(id).subscribe(
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
    if (this.libelle == '') {
      this.ngOnInit();
    } else {
      this.roles = this.roles.filter((res: any) => {
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

  SelectAll() {
    var Formperm = document.getElementById('Formperm');
    var inputs = Formperm.getElementsByTagName('input');
    
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == 'checkbox') {
        if (inputs[i].id != 'all') {
          if (inputs[i].checked == false) {
            inputs[i].checked = true;
          }else{
            inputs[i].checked = false;
          }
        }
      }
    }
  }

  ngAfterViewInit() {
    document.querySelector('html').addEventListener('click', (e) => {
      this.addActive = false;
      e.stopPropagation();
    });
  }
}
