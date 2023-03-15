import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoF } from '../../models/empleadoF';
import { MasterService } from '../../service/login.service';
import { EmpleadoService } from './service/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'], 
  providers: [MasterService, EmpleadoService]
})
export class EmpleadoComponent {
  public objR: string;
  public option: number = 0;
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
    this.objR = ""
    this.empleado = new EmpleadoF("", "", "", "", {email: "", nickname: ""}, "", false)
    this._EmpleadoService.getInfo().subscribe(resp=>{
      this.empleado = resp.data;
      this.resumen = resp.resumen;
    },err=>{
      this._router.navigate(['/login']);
    })
  }

}