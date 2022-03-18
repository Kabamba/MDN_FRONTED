import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/admin/auth.service';
import { ThemeService } from '../../../services/admin/theme.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  dark = false;
  @Output() public night: EventEmitter<any> = new EventEmitter();

  constructor(private auth: AuthService, private theme: ThemeService) {}

  modeNight() {
    const localData: any = localStorage.getItem('user');
    const userObj = JSON.parse(localData);

    const localtheme: any = localStorage.getItem('theme');
    const butu = JSON.parse(localtheme);

    if (butu == false) {
      localStorage.setItem('theme', 'true');
    } else {
      localStorage.setItem('theme', 'false');
    }

    this.auth.theme(userObj.id).subscribe(
      (res: any) => {},
      (err) => {}
    );

    if (this.dark == false) {
      this.dark = true;
      this.night.emit(this.dark);
    } else {
      this.dark = false;
      this.night.emit(this.dark);
    }
  }

  ngOnInit(): void {
    this.dark = this.theme.butu();
  }
}
