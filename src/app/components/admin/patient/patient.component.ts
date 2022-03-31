import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/admin/patient.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ThemeService } from '../../../services/admin/theme.service';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../../services/admin/doctor.service';
import { CategoryService } from '../../../services/admin/category.service';
import { SocietyService } from '../../../services/admin/society.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  errors = {
    pays_natal: '',
    pays_residence: '',
    docteur: '',
    category: '',
    society: '',
    num_dossier: '',
    nom: '',
    prenom: '',
    date_naiss: '',
    lieu_naiss: '',
    num_carte: '',
    langue: '',
    sexe: '',
    etat_civil: '',
    adresse: '',
    boite_postal: '',
    email: '',
    telephone_fixe: '',
    telephone_mobile: '',
    profession: '',
  };

  isLoading = false;
  isAdding = false;
  isShowing = false;
  showModal = false;
  isWrapper = false;
  isLoadindTable = false;
  addActive = false;

  patients: any[] = [];
  pays: any[] = [];
  docteurs: any[] = [];
  categories: any[] = [];
  societies: any[] = [];

  key = 'id';
  reverse: boolean = false;
  p: number = 1;

  nom: any;

  brandForm: FormGroup;

  constructor(
    private patient: PatientService,
    private doctor: DoctorService,
    private cat: CategoryService,
    private socie: SocietyService,
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

    this.errors.nom = '';
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
      pays_natal: new FormControl('0'),
      pays_residence: new FormControl('0'),
      docteur: new FormControl('0'),
      category: new FormControl('0'),
      society: new FormControl('0'),
      num_dossier: new FormControl(''),
      nom: new FormControl(''),
      prenom: new FormControl(''),
      date_naiss: new FormControl(''),
      lieu_naiss: new FormControl(''),
      num_carte: new FormControl(''),
      langue: new FormControl('0'),
      sexe: new FormControl(''),
      etat_civil: new FormControl(''),
      adresse: new FormControl(''),
      boite_postal: new FormControl(''),
      email: new FormControl(''),
      telephone_fixe: new FormControl(''),
      telephone_mobile: new FormControl(''),
      profession: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.list();
    this.getPays();
    this.getDoctor();
    this.getCategory();
    this.resetForm();
    this.night(this.theme.butu());
  }

  list() {
    this.isLoadindTable = true;
    this.patient.list().subscribe(
      (res: any) => {
        this.isLoadindTable = false;
        this.patients = res.data;
      },
      (err) => {
        console.log(err);
        this.isLoadindTable = false;
      }
    );
  }

  getPays() {
    this.patient.Payslist().subscribe(
      (res: any) => {
        this.pays = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getDoctor() {
    this.doctor.list().subscribe(
      (res: any) => {
        this.docteurs = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCategory() {
    this.cat.list().subscribe(
      (res: any) => {
        this.categories = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sauvegarder() {
    this.isAdding = true;
    if (this.brandForm.value.id == '0') {
      this.patient
        .ajouter(
          this.brandForm.value.pays_natal,
          this.brandForm.value.pays_residence,
          this.brandForm.value.docteur,
          this.brandForm.value.category,
          this.brandForm.value.society,
          this.brandForm.value.num_dossier,
          this.brandForm.value.nom,
          this.brandForm.value.prenom,
          this.brandForm.value.date_naiss,
          this.brandForm.value.lieu_naiss,
          this.brandForm.value.num_carte,
          this.brandForm.value.langue,
          this.brandForm.value.sexe,
          this.brandForm.value.etat_civil,
          this.brandForm.value.adresse,
          this.brandForm.value.boite_postal,
          this.brandForm.value.email,
          this.brandForm.value.telephone_fixe,
          this.brandForm.value.telephone_mobile,
          this.brandForm.value.profession
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            this.toastr.success(res.message);
            this.ngOnInit();
            this.closeModal();
            this.isAdding = false;
            this.isShowing = false;
          },
          (err) => {
            console.log(err);
            this.errors = err.error.errors;
            this.isAdding = false;
            this.isShowing = false;
          }
        );
    } else {
      this.patient
        .editer(
          this.brandForm.value.id,
          this.brandForm.value.pays_natal,
          this.brandForm.value.pays_residence,
          this.brandForm.value.docteur,
          this.brandForm.value.category,
          this.brandForm.value.society,
          this.brandForm.value.num_dossier,
          this.brandForm.value.nom,
          this.brandForm.value.prenom,
          this.brandForm.value.date_naiss,
          this.brandForm.value.lieu_naiss,
          this.brandForm.value.num_carte,
          this.brandForm.value.langue,
          this.brandForm.value.sexe,
          this.brandForm.value.etat_civil,
          this.brandForm.value.adresse,
          this.brandForm.value.boite_postal,
          this.brandForm.value.email,
          this.brandForm.value.telephone_fixe,
          this.brandForm.value.telephone_mobile,
          this.brandForm.value.profession
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
            console.log(err);
          }
        );
    }
  }

  show(id) {
    this.isShowing = true;
    this.patient.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.data.id),
          nom: new FormControl(res.data.nom),
          prenom: new FormControl(res.data.prenom),
          sexe: new FormControl(res.data.sexe),
          date_naiss: new FormControl(res.data.date_naiss),
          lieu_naiss: new FormControl(res.data.lieu_naiss),
          pays_natal: new FormControl(res.data.pays_natal),
          num_dossier: new FormControl(res.data.num_dossier),
          num_carte: new FormControl(res.data.num_carte),
          langue: new FormControl(res.data.langue),
          docteur: new FormControl(res.data.docteur),
          etat_civil: new FormControl(res.data.etat_civil),
          adresse: new FormControl(res.data.adresse),
          boite_postal: new FormControl(res.data.boite_postal),
          pays_residence: new FormControl(res.data.pays_residence),
          email: new FormControl(res.data.email),
          telephone_fixe: new FormControl(res.data.telephone_fixe),
          telephone_mobile: new FormControl(res.data.telephone_mobile),
          profession: new FormControl(res.data.profession),
        });
        this.activeModal();
      },
      (err) => {}
    );
  }

  delete(id) {
    this.patient.delete(id).subscribe(
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

  loadSociety() {
    this.socie.SocietePerCategorie(this.brandForm.value.category).subscribe(
      (res:any) => {
        this.societies = res.data
      },
      (err) => {
        console.log(err)
      }
    );
  }

  search() {
    if (this.nom == '') {
      this.ngOnInit();
    } else {
      this.patients = this.patients.filter((res: any) => {
        return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
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
