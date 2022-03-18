import { Component, OnInit } from '@angular/core';
import { AppointService } from '../../../services/admin/appoint.service';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../../../services/admin/theme.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css'],
})
export class GrilleComponent implements OnInit {
  error = false;
  isLoading = false;
  showModal = false;
  activeDetail = false;
  tooltip = false;
  isWrapper = false;
  addActive = false;
  showList = true;

  grilles: any[] = [];

  brandForm: FormGroup;

  constructor(
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

  showDetail() {
    this.activeDetail = true;
  }

  closeModal() {
    this.showModal = false;
    this.activeDetail = false;
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

  night(data) {
    const body = document.querySelector('body');

    if (data) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }

  stop(event: Event) {
    this.showList = false;
    event.stopPropagation();
  }

  printFile() {
    window.print();
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
      this.showList = false;
      e.stopPropagation();
    });
  }

  ngOnInit(): void {
    this.grilleAll();
    this.resetForm();
    this.night(this.theme.butu());
  }

  resetForm() {
    this.brandForm = new FormGroup({
      date_deb: new FormControl(''),
      date_fin: new FormControl(''),
    });
  }

  grilleAll() {
    this.appoint.grilleAll().subscribe(
      (res: any) => {
        this.grilles = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  grille() {
    this.appoint
      .grilleDate(this.brandForm.value.date_deb, this.brandForm.value.date_fin)
      .subscribe(
        (res: any) => {
          this.grilles = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
