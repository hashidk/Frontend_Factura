import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../service/login.service';
import { AdminService } from './service/admin.service';
import { AdminF } from '../../models/adminF';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [MasterService, AdminService]
})
export class AdminComponent {
  public objR: string;
  public option: number = 0;
  public admin: AdminF;
  public resumen:any;

  constructor(
    private _router: Router, 
    private _MasterService:MasterService,
    private _AdminService:AdminService,
    ) {
      this.objR = ""
      this.admin = new AdminF("", "", "", "", {email: "", nickname: ""}, "", "", "", "", "", "", "")
      this._AdminService.getInfo().subscribe(resp=>{
        this.admin = resp.data;
        console.log(this.admin);
        this.resumen = resp.resumen;
        console.log(this.resumen);
        
      },err=>{
        this._router.navigate(['/login']);
      })

  }

  logout(): void {
    if (confirm('¿Estás seguro que deseas salir?')) {
      this._MasterService.logout().subscribe(
        resp => {
          this._router.navigate(['/login']);
        }, err => {
          console.log(err);
        })
    }
  }
  
  activarComponente(opcion: number) {
    this.option = opcion;
  }

  getInputValue(inputValue: string) {
    this.objR = inputValue;
  }


}


