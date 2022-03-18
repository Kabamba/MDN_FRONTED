import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ThemeService } from '../../../services/admin/theme.service';
import { StatService } from '../../../services/admin/stat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  tooltip = false;
  isWrapper = false;
  addActive = false;

  nbrerdv : any;

  constructor(
    private stat: StatService,
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
    event.stopPropagation();
  }

  canvas: any;
  canvas_y: any;
  canvas_z: any;
  ctx: any;
  cty: any;
  ctz: any;

  @ViewChild('mychart') mychart: any;
  @ViewChild('mypie') mypie: any;
  @ViewChild('mydounut') mydounut: any;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.canvas_y = this.mypie.nativeElement;
    this.canvas_z = this.mydounut.nativeElement;

    this.ctx = this.canvas.getContext('2d');
    this.cty = this.canvas_y.getContext('2d');
    this.ctz = this.canvas_z.getContext('2d');

    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mais',
          'Juin',
          'Juillet',
          'Aôut',
          'Octombre',
          'Septembre',
          'Novembre',
          'Decembre',
        ],
        datasets: [
          {
            data: [12, 19, 3, 80, 2, 55, 10, 60, 90, 55, 14, 69],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
              'rgba(301, 203, 100, 0.2)',
              'rgba(200, 102, 25, 0.2)',
              'rgba(20, 10, 205, 0.2)',
              'rgba(50, 155, 205, 0.2)',
              'rgba(10, 305, 60, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
              'rgba(301, 203, 100)',
              'rgba(200, 102, 25)',
              'rgba(50, 155, 205)',
              'rgba(50, 155, 205)',
              'rgba(10, 305, 60)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'rgb(255,99,132)',
            },
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    new Chart(this.cty, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
          },
        ],
      },
    });

    new Chart(this.ctz, {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
          },
        ],
      },
    });

    document.querySelector('html').addEventListener('click', (e) => {
      this.addActive = false;
      e.stopPropagation();
    });
  }

  ngOnInit(): void {
    this.night(this.theme.butu());
    this.totrdv();
  }

  totrdv() {
    this.stat.totrdv().subscribe(
      (res:any) => {
        this.nbrerdv = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
