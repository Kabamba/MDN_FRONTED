import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  butu(){
    const localData: any = localStorage.getItem('theme');
    const mode = JSON.parse(localData);
    
    return mode;
  }

}
