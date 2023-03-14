//Admin desactiva: Banco y Empleado

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { EmpleadoF } from '../../../models/empleadoF';


@Component({
    selector: 'app-adesactivar',
    templateUrl: './adesactivar.component.html',
    providers: [AdminService]
})

export class AdesactivarComponent implements OnInit {
    @Input() objR: string;
    public title = "Desactivar";
    public empleados: EmpleadoF[] = [];

    public opcion: number = 4;
    public error: string = "";
    public success: string = "";


    constructor(
        private _router: Router,
        private _AdminService: AdminService
    ) {
        this.cancel = true;
        this.renderCancel = false
        this.objR = ""
        this.id = "";
        this._AdminService.getEmpleados().subscribe(resp=>{
            this.empleados = resp.data;
            this.empleados = this.empleados.filter((ele:EmpleadoF) => ele.activo===false)           
        }, err=>{
            this._router.navigate(['/login']);
        })
    }


    ngOnInit(): void {
    }

    public cancel:boolean;
    public renderCancel:boolean
    public id:string;
  
    handleCancel($event:boolean){
      if ($event) {
        this.renderCancel = false;
      }else{
        if (this.objR == 'empleado') {
            this._AdminService.deleteEmpleado(this.id).subscribe(resp=>{
                this.success = "Empleado activado"
            },err=>{
                this.success = ""
            })
        } 
        this.renderCancel = false;
      }
    }
    

    activar(id:string) {
        this.id = id
        this.renderCancel = true;

    }

}
