//Empleado desactiva: Cuenta y Cliente


import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from '../service/empleado.service';
import { ClienteF } from '../../../models';
import { fadeIn, fadeOut } from 'src/app/animations/fadeInOut';


@Component({
    selector: 'app-edesactivar',
    templateUrl: './edesactivar.component.html',
    providers: [EmpleadoService],
    animations: [fadeIn, fadeOut],
})

export class EdesactivarComponent implements OnInit {
    @Input() objR: string;
    clientes: ClienteF[] = [];



    opcion: number = 4;
    public success: string = "";


    constructor(
        private _router: Router,
        private _EmpleadoService:EmpleadoService
    ) {
        this.cancel = true;
        this.renderCancel = false
        this.id = "";
        this.objR = 'Clientes'
        this._EmpleadoService.getClientes().subscribe(resp=>{
            this.clientes = resp.data;
            this.clientes = this.clientes.filter((ele:any) => ele.activo===false)
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
        if (this.objR == 'cliente') {
            this._EmpleadoService.deleteCliente(this.id).subscribe(resp=>{
                this.success = "Cliente activado"
            },err=>{
                this.success = ""
            })
        } 
        this.renderCancel = false;
      }
    }
    
    activar(id:string) {
        this.id = id;
        this.renderCancel = true;
    }

}
