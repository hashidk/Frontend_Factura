import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteF, FacturaF } from '../models';
import { Global } from '../service/global';
import { isAuthService } from '../service/isAuth.service';
import { MasterService } from '../service/login.service';
import { ClienteService } from './services/cliente.services';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [MasterService, ClienteService, isAuthService],
})
export class ClientesComponent implements OnInit{
  objR: string;
  option: number = 0;
  public data: ClienteF;
  public facturas: FacturaF[];
  public ab:string = "1"
  public direc = Global.url+"cliente/facturas/"
  dtoptions: DataTables.Settings = {};  //para tabla

  constructor(
    private _router: Router, 
    private _MasterService:MasterService,
    private _ClienteService:ClienteService,
    private __isAuthService:isAuthService
    ) {
    this._ClienteService.getInfo().subscribe(resp=>{
      this.data = resp.data;
    },err=>{
      this._router.navigate(['/login']);
    })

    this._ClienteService.getMisFacturas().subscribe(resp=>{
      this.facturas = resp.data;
    },err=>{
      this._router.navigate(['/login']);
    })

  }

  click(){
    this.__isAuthService.setAuth(true, "okok55")
  }

  ngOnInit(): void {
    this.dtoptions = {
        pagingType: 'full_numbers'
        ,
        searching: true,
        //  paging:false
        language: {
            searchPlaceholder: 'Escribir Nombre'
        }
    };
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

  activarComponente(@Output() opcion: number) {
    this.option = opcion;
  }

  getInputValue(inputValue: string) {
    this.objR = inputValue;
  }

}
