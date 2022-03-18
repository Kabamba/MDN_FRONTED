import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/admin/permission.service';
import { ThemeService } from 'src/app/services/admin/theme.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class PermissionsComponent implements OnInit {
  isLoadindTable = false;
  isWrapper = false;
  addActive = false;

  key = 'id';
  reverse: boolean = false;
  p: number = 1;
  libelle: any;

  permissions: any[] = [];

  constructor(private perm: PermissionService, private theme: ThemeService) {}

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

  ngOnInit(): void {
    this.getPerms();
    this.night(this.theme.butu());
  }

  night(data) {
    const body = document.querySelector('body');
    if (data) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }

  getPerms() {
    this.isLoadindTable = true;
    this.perm.list().subscribe(
      (res: any) => {
        this.permissions = res;
        this.isLoadindTable = false;
      },
      (err) => {
        this.isLoadindTable = false;
      }
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
      this.permissions = this.permissions.filter((res: any) => {
        return res.libelle
          .toLocaleLowerCase()
          .match(this.libelle.toLocaleLowerCase());
      });
    }
  }
}
