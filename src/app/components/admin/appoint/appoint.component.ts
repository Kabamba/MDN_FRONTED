import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PatientService } from '../../../services/admin/patient.service';
import { DoctorService } from '../../../services/admin/doctor.service';
import { AppointService } from '../../../services/admin/appoint.service';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../../../services/admin/theme.service';
import { MotifComponent } from '../motif/motif.component';
import { MotifService } from '../../../services/admin/motif.service';

@Component({
  selector: 'app-appoint',
  templateUrl: './appoint.component.html',
  styleUrls: ['./appoint.component.css'],
})
export class AppointComponent implements OnInit, AfterViewInit {
  error = false;

  isLoading = false;
  isLoadindTable = false;
  isAdding = false;
  isSearching: boolean;
  closeList = false;

  showModal = false;
  activeDetail = false;

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

  futures: any[] = [];
  searchFuture: string;

  lasts: any[] = [];
  searchLast: string;

  brandForm: FormGroup;

  searchWord: string;

  detail: any;

  user: any;

  motifs: any[];

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

    (this.errors.date_heure_appoint = ''),
      (this.errors.motif = ''),
      (this.errors.description = '');
    this.errors.doctor_id = '';
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

  ngOnInit(): void {
    this.resetForm();
    this.getDoctors();
    this.getAppointsToday();
    this.getAppointsFuture();
    this.getAppointsLast();
    this.getRole();
    this.getMotif();
    this.night(this.theme.butu());
  }

  getMotif() {
    this.motif.list().subscribe(
      (res:any) => {
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
        },
        (err) => {
          console.log(err);
          this.errors = err.error.errors;
          this.isAdding = false;
        }
      );
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
        },
        (err) => {
          this.isLoadindTable = false;
        }
      );
    }
  }

  getAppointsFuture() {
    this.isLoadindTable = true;
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const admin_level = userObj.admin_level;
    const id = userObj.id;

    if (admin_level == '1' || admin_level == '3') {
      this.appoint.listFuture().subscribe(
        (res: any) => {
          this.futures = res.data;
          this.isLoadindTable = false;
        },
        (err) => {
          this.isLoadindTable = false;
        }
      );
    } else {
      this.appoint.listFutureDoctor(id).subscribe(
        (res: any) => {
          this.futures = res.data;
          this.isLoadindTable = false;
        },
        (err) => {
          this.isLoadindTable = false;
        }
      );
    }
  }

  getAppointsLast() {
    this.isLoadindTable = true;
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const admin_level = userObj.admin_level;
    const id = userObj.id;

    if (admin_level == '1' || admin_level == '3') {
      this.appoint.listLast().subscribe(
        (res: any) => {
          this.lasts = res.data;
          this.isLoadindTable = false;
        },
        (err) => {
          console.log(err);
          this.isLoadindTable = false;
        }
      );
    } else {
      this.appoint.listLastDoctor(id).subscribe(
        (res: any) => {
          this.lasts = res.data;
          this.isLoadindTable = false;
        },
        (err) => {
          console.log(err);
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

  approuver(id) {
    this.appoint.approuver(id).subscribe(
      (res: any) => {
        if (res.visibility == false) {
          this.toastr.warning(res.message);
        } else {
          this.toastr.success(res.message);
          this.ngOnInit();
        }
      },
      (err) => {}
    );
  }

  getRole() {
    const localData: any = localStorage.getItem('user');
    const userObj = JSON.parse(localData);
    this.user = userObj;
  }

  search() {
    if (this.searchFuture == '') {
      this.ngOnInit();
      this.isLoadindTable = false;
    } else {
      this.futures = this.futures.filter((res: any) => {
        this.isLoadindTable = false;
        return (
          res.patient_name
            .toLocaleLowerCase()
            .match(this.searchFuture.toLocaleLowerCase()) ||
          res.doctor_name
            .toLocaleLowerCase()
            .match(this.searchFuture.toLocaleLowerCase())
        );
      });
    }
  }
}
