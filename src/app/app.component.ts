import { Component, OnInit } from '@angular/core';
import { comprobarCookie } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'Banca Web'

  constructor(){

  }

  ngOnInit(): void {
    if(!(comprobarCookie("access_token"))){
      localStorage.removeItem("rol")
    }
  }
}
