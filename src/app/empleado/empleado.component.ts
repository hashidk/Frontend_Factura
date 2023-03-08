import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { EmpleadoF } from '../models/empleadoF';
import { MasterService } from '../service/login.service';
import { Config, Menu } from '../ui/menu-acordeon/types';
import { EmpleadoService } from './service/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'], 
  providers: [MasterService, EmpleadoService]
})
export class EmpleadoComponent {
  objR: string;
  option: number = 0;
  public empleado: EmpleadoF;
  public resumen:any

  activarComponente(@Output() opcion: number) {
    this.option = opcion;
  }

  getInputValue(inputValue: string) {
    this.objR = inputValue;
  }

  constructor(
    private _router: Router,
    private _MasterService: MasterService,
    private _EmpleadoService:EmpleadoService
  ) {
    
    this._EmpleadoService.getInfo().subscribe(resp=>{
      this.empleado = resp.data;
      // this.resumen = resp.resumen;
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
      }
    )}
  }

}