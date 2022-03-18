import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../services/admin/patient.service';
import { MotifService } from '../../../services/admin/motif.service';
import { DoctorService } from '../../../services/admin/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../../../services/admin/theme.service';
import { AppointService } from '../../../services/admin/appoint.service';

@Component({
  selector: 'app-appointoday',
  templateUrl: './appointoday.component.html',
  styleUrls: ['./appointoday.component.css'],
})
export class AppointodayComponent implements OnInit {
  error = false;

  isLoading = false;
  isLoadindTable = false;
  isAdding = false;
  isApproving = false;
  isSearching: boolean;
  closeList = false;

  showModal = false;
  activeDetail = false;
  activeApprouv = false;

  tooltip = false;
  isWrapper = false;
  addActive = false;

  errors = {
    date_heure_appoint: '',
    description: '',
    doctor_id: '',
    motif: '',
  };

  patients: any[] = [];
  doctors: any[] = [];

  todays: any[] = [];
  searchToday: string;

  brandForm: FormGroup;
  finalForm: FormGroup;

  searchWord: string;

  detail: any;

  user: any;

  motifs: any[];

  key = 'id';
  reverse: boolean = false;
  p: number = 1;

  file: any;

  constructor(
    private patient: PatientService,
    private motif: MotifService,
    private doctor: DoctorService,
    private appoint: AppointService,
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
    this.activeDetail = false;
    this.activeApprouv = false;

    this.resetError();
  }

  showTooltip(event: Event) {
    if (!this.tooltip) {
      this.tooltip = true;
      event.stopPropagation();
    } else {
      this.tooltip = false;
      event.stopPropagation();
    }
  }

  stop(event: Event) {
    this.closeList = false;
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

  ngAfterViewInit() {
    const accordions: any = Array.from(document.querySelectorAll('.r-title'));
    const panels: any = Array.from(document.querySelectorAll('.rendez-bloc-2'));
    let index = 0;

    // Premier boucle pour les accordions
    // Premier boucle pour les accordions

    for (var i = 0; i < accordions.length; i++) {
      panels[index].classList.add('active');
      accordions[i].addEventListener('click', function (e) {
        index = accordions.indexOf(this);
        for (var i = 0; i < panels.length; i++) {
          let panelId = panels.indexOf(panels[i]);

          if (index == panelId) {
            if (panels[i].style.maxHeight) {
              panels[i].classList.remove('active');
            } else {
              panels[i].classList.toggle('active');
            }
          } else {
            panels[i].classList.remove('active');
          }
        }
      });
    }

    document.querySelector('html').addEventListener('click', (e) => {
      this.tooltip = false;
      this.addActive = false;
      this.closeList = false;
      e.stopPropagation();
    });
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      name: new FormControl(''),
      prenom: new FormControl(''),
      telephone: new FormControl(''),
      matricule: new FormControl(''),
      date: new FormControl(''),
      docteur: new FormControl(''),
      motif: new FormControl(''),
      description: new FormControl(''),
    });
  }

  resetFinalForm() {
    this.finalForm = new FormGroup({
      id: new FormControl(''),
      observations: new FormControl(''),
      piece: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.resetForm();
    this.resetFinalForm();
    this.getDoctors();
    this.getAppointsToday();
    this.getRole();
    this.getMotif();
    this.night(this.theme.butu());
  }

  getMotif() {
    this.motif.list().subscribe(
      (res: any) => {
        this.motifs = res;
      },
      (err) => {}
    );
  }

  getDoctors() {
    this.doctor.list().subscribe(
      (res: any) => {
        this.doctors = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sauvegarder() {
    this.isAdding = true;

    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const recep_id = userObj.id;

    this.appoint
      .save(
        this.brandForm.value.motif,
        this.brandForm.value.description,
        recep_id,
        this.brandForm.value.docteur,
        this.brandForm.value.id,
        this.brandForm.value.date
      )
      .subscribe(
        (res: any) => {
          this.isAdding = false;

          if (res.visibility == false) {
            this.toastr.warning(res.message);
          } else {
            this.toastr.success(res.message);
            this.closeModal();
            this.ngOnInit();
          }
          this.resetError();
        },
        (err) => {
          console.log(err);
          this.errors = err.error.errors;
          this.isAdding = false;
        }
      );
  }

  resetError() {
    this.errors.date_heure_appoint = '';
    this.errors.description = '';
    this.errors.doctor_id = '';
    this.errors.motif = '';
  }

  getPatient() {
    this.isSearching = true;

    if (this.searchWord == '') {
      this.patients = [];
      this.closeList = false;
      this.isSearching = false;
    } else {
      setTimeout(() => {
        this.patient.recherche(this.searchWord).subscribe(
          (res: any) => {
            this.isSearching = false;
            this.closeList = true;
            this.patients = res;
          },
          (err) => {
            console.log(err);
            this.isSearching = false;
            this.closeList = false;
          }
        );
      }, 1500);
    }
  }

  getAppointsToday() {
    this.isLoadindTable = true;
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const admin_level = userObj.admin_level;
    const id = userObj.id;

    if (admin_level == '1' || admin_level == '3') {
      this.appoint.listToday().subscribe(
        (res: any) => {
          this.todays = res.data;
          this.isLoadindTable = false;
        },
        (err) => {
          this.isLoadindTable = false;
        }
      );
    } else {
      this.appoint.listTodayDoctor(id).subscribe(
        (res: any) => {
          this.todays = res.data;
          this.isLoadindTable = false;
          console.log(this.todays);
        },
        (err) => {
          this.isLoadindTable = false;
        }
      );
    }
  }

  patientInfos(id, name, prenom, matricule, telephone) {
    this.closeList = false;
    this.brandForm = new FormGroup({
      id: new FormControl(id),
      name: new FormControl(name),
      prenom: new FormControl(prenom),
      telephone: new FormControl(telephone),
      matricule: new FormControl(matricule),
      date: new FormControl(''),
      docteur: new FormControl(''),
      motif: new FormControl(''),
      description: new FormControl(''),
    });
  }

  showDetail(id) {
    this.activeDetail = true;

    this.appoint.show(id).subscribe(
      (res: any) => {
        this.detail = res;
      },
      (err) => {}
    );
  }

  onSelectedFile(event) {
    this.file = event.target.files[0];
  }

  loadApprouv(id) {
    this.isApproving = true;

    this.appoint.show(id).subscribe(
      (res: any) => {
        this.finalForm = new FormGroup({
          id: new FormControl(res.id),
          observations: new FormControl(''),
          piece: new FormControl(''),
        });
        this.isApproving = false;
        this.activeApprouv = true;
      },
      (err) => {}
    );
  }

  approuver() {
    this.isApproving = true;

    const formData = new FormData();

    formData.append('id', this.finalForm.value.id);
    formData.append('observations', this.finalForm.value.observations);
    if (this.file) {
      formData.append('piece', this.file, this.file.name);
    }

    this.appoint.approuver(formData).subscribe(
      (res: any) => {
        if (res.visibility == false) {
          this.toastr.warning(res.message);
        } else {
          this.toastr.success(res.message);
          this.ngOnInit();
        }
        this.isApproving = false;
        this.activeApprouv = false;
      },
      (err) => {
        this.isApproving = false;
        this.activeApprouv = false;
      }
    );
  }

  getRole() {
    const localData: any = localStorage.getItem('user');
    const userObj = JSON.parse(localData);
    this.user = userObj;
  }

  search() {
    if (this.searchToday == '') {
      this.ngOnInit();
      this.isLoadindTable = false;
    } else {
      this.todays = this.todays.filter((res: any) => {
        this.isLoadindTable = false;
        return (
          res.patient_name
            .toLocaleLowerCase()
            .match(this.searchToday.toLocaleLowerCase()) ||
          res.doctor_name
            .toLocaleLowerCase()
            .match(this.searchToday.toLocaleLowerCase())
        );
      });
    }
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  montrer(id, event: Event) {
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
}
