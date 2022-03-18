import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ScheduleService } from '../../../services/admin/schedule.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../services/admin/doctor.service';
import { ThemeService } from '../../../services/admin/theme.service';

@Component({
  selector: 'app-disponibility',
  templateUrl: './disponibility.component.html',
  styleUrls: ['./disponibility.component.css'],
})
export class DisponibilityComponent implements OnInit {
  errors = {
    day: '',
    heure_deb: '',
    heure_fin: '',
    max_pat: '',
  };

  isWrapper = false;
  tooltip = true;
  addActive = false;
  isLoading = false;

  brandForm: FormGroup;

  user_id: any;
  doctor: any;

  days : any;

  key = 'id';
  reverse: boolean = false;

  dispos : any[];

  constructor(
    private schedule: ScheduleService,
    private doc: DoctorService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
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
      day: new FormControl('1'),
      dispo: new FormControl(''),
      heure_deb: new FormControl(''),
      heure_fin: new FormControl(''),
      max_pat: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.resetForm();
    this.getScheduleDay();
    this.getDoctor();
    this.getDays();
    this.night(this.theme.butu());
  }

  getDays(){
    this.user_id = this.route.snapshot.params['id'];

    this.schedule.listDoctor(this.user_id).subscribe((res:any)=>{
      this.dispos = res.days;
    },(err)=>{  
      console.log(err)
    })
  }

  getDoctor() {
    this.user_id = this.route.snapshot.params['id'];

    this.doc.show(this.user_id).subscribe(
      (res) => {
        this.doctor = res;
      },
      (err) => {
        this.router.navigate(['/admin/doctors']);
      }
    );
  }

  getScheduleDay() {
    this.isLoading = true;

    this.user_id = this.route.snapshot.params['id'];
    this.schedule.dispo(this.brandForm.value.day, this.user_id).subscribe(
      (res: any) => {
        if (res) {
          this.brandForm.patchValue({
            day: res.day_id,
            dispo: 1,
            heure_deb: res.heure_deb,
            heure_fin: res.heure_fin,
            max_pat: res.max_patient,
          });
        } else {
          this.brandForm = new FormGroup({
            day: new FormControl(this.brandForm.value.day),
            dispo: new FormControl(''),
            heure_deb: new FormControl(''),
            heure_fin: new FormControl(''),
            max_pat: new FormControl(''),
          });
        }
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );

    this.errors.day = '';
    this.errors.heure_deb = '';
    this.errors.heure_fin = '';
    this.errors.max_pat = '';
  }

  saveSchedule() {
    this.isLoading = true;
    this.user_id = this.route.snapshot.params['id'];

    this.schedule
      .save(
        this.brandForm.value.day,
        this.user_id,
        this.brandForm.value.heure_deb,
        this.brandForm.value.heure_fin,
        this.brandForm.value.max_pat
      )
      .subscribe(
        (res: any) => {
          this.isLoading = false;
          this.getScheduleDay();
          this.toastr.success(res.message);
          this.getDays();
        },
        (err) => {
          this.errors = err.error.errors;
          console.log(this.errors);
          this.isLoading = false;
        }
      );
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
