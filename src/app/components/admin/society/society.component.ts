import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SocietyService } from 'src/app/services/admin/society.service';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from 'src/app/services/admin/theme.service';
import { CategoryService } from '../../../services/admin/category.service';

@Component({
  selector: 'app-society',
  templateUrl: './society.component.html',
  styleUrls: ['./society.component.css'],
})
export class SocietyComponent implements OnInit {
  errors = {
    libelle: '',
    category_id: '',
  };

  isLoading = false;
  isAdding = false;
  showModal = false;
  isWrapper = false;
  isLoadindTable = false;
  addActive = false;

  socities: any[] = [];
  categories: any[] = [];

  key = 'id';
  reverse: boolean = false;
  p: number = 1;

  libelle: any;

  brandForm: FormGroup;

  constructor(
    private society: SocietyService,
    private category:CategoryService,
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

  activeModal() {
    this.showModal = true;
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
      category_id: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.list();
    this.getList();
    this.resetForm();
    this.night(this.theme.butu());
  }

  list() {
    this.isLoadindTable = true;
    this.society.list().subscribe(
      (res: any) => {
        this.isLoadindTable = false;
        this.socities = res.data;
      },
      (err) => {
        this.isLoadindTable = false;
      }
    );
  }

  getList(){
    this.category.list().subscribe(
      (res: any) => {
        this.categories = res;
      },
      (err) => { }
    );
  }

  sauvegarder() {
    this.isAdding = true;

    if (this.brandForm.value.id == '0') {
      this.society
        .ajouter(this.brandForm.value.libelle, this.brandForm.value.category_id)
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
      this.society
        .editer(
          this.brandForm.value.id,
          this.brandForm.value.libelle,
          this.brandForm.value.category_id
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
            this.isAdding = false;
          }
        );
    }
  }

  show(id) {
    this.society.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.id),
          libelle: new FormControl(res.libelle),
          category_id: new FormControl(res.category_id),
        });
        this.activeModal();
      },
      (err) => {}
    );
  }

  delete(id) {
    this.society.delete(id).subscribe(
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
      this.socities = this.socities.filter((res: any) => {
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
    });
  }
}
