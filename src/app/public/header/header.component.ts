import { Component, OnInit } from '@angular/core';
import { isAuthService } from 'src/app/service/isAuth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [isAuthService]
})
export class HeaderComponent implements OnInit {
  public isAuth:boolean;
  public rol:string;

  constructor(
    private _isAuthService:isAuthService
  ){
    this.isAuth = false;
    this.rol = localStorage.getItem("rol") || "";
  }

  ngOnInit(): void {
    // if (this.comprobarCookie("access_token")) {
    //   this.isAuth = true;
    // }else{
    //   this.isAuth = false;
    // }
    this._isAuthService.getAuth().subscribe(resp=>{
      this.rol = resp.rol;
    })
  }

  // obtenerCookie(clave):String {
  //   var name = clave + "=";
  //   var ca = document.cookie.split(';');
  //   for (var i = 0; i < ca.length; i++) {
  //       var c = ca[i];
  //       while (c.charAt(0) == ' ') c = c.substring(1);
  //       if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  //   }
  //   return "";
  // }

  // comprobarCookie(clave):Boolean {
  //   var clave:any = this.obtenerCookie(clave);
  //   return clave !== "";
  // }

}
