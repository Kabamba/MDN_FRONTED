import { DateAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/DateAxis';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngonga',
  templateUrl: './ngonga.component.html',
  styleUrls: ['./ngonga.component.css'],
})
export class NgongaComponent implements OnInit {
  heure: any;

  constructor() {}

  ngOnInit(): void {
    var today = new Date();
    var jour = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    var dd = today.getDay(),
        dn = today.getDate(),
        mm = today.getMonth() + 1,

        y = today.getFullYear(),
        h = today.getHours(),
        m = today.getMinutes();
    // var date =
    //   today.getFullYear() +
    //   '-' +
    //   (today.getMonth() + 1) +
    //   '-' +
    //   today.getDate();

    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      
    this.heure = `${jour[dd]} , ${(dn > 9) ? dn : "0"+dn}.${(mm > 9) ? mm : "0"+mm}.${y} - ${(h > 9) ? h : "0"+h} : ${(m > 9) ? m : "0"+m}`;
  }
}
