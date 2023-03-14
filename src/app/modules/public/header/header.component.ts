import { Component, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { isAuthService } from '../../../service/isAuth.service';
import { MasterService } from '../../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [isAuthService, MasterService]
})
export class HeaderComponent implements OnInit  {
  public isAuth:boolean;
  public rol:string;
  public cancel:boolean;
  public renderCancel:boolean

  handleCancel($event:boolean){
    if ($event) {
      this.renderCancel = false;
    }else{
      this._MasterService.logout().subscribe(
        resp => {
          this._Router.navigate(['/login']);
        }, err => {
          console.log(err);
        })
    }
  }

  logout(): void {
    this.renderCancel = true;
  }

  constructor(
    private _isAuthService:isAuthService,
    private _MasterService:MasterService,
    private _Router:Router
  ){
    this.cancel = true;
    this.renderCancel = false;
    this.isAuth = false;
    this.rol = localStorage.getItem("rol") || "";
  }

  ngOnInit(): void {
    this._isAuthService.getAuth().subscribe(resp=>{
      this.rol = resp.rol;
    })
  }



}
