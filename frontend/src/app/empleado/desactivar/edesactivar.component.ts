//Empleado desactiva: Cuenta y Cliente


import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from 'axios';

import { Router } from '@angular/router';
import { EmpleadoService } from '../service/empleado.service';
import { ClienteF } from 'src/app/models';


@Component({
    selector: 'app-edesactivar',
    templateUrl: './edesactivar.component.html',
    providers: [EmpleadoService]
})

export class EdesactivarComponent implements OnInit {
    @Input() objR: string;
    clientes: ClienteF[];
    dtoptions: DataTables.Settings = {};  //para tabla



    opcion: number = 4;
    public error: string = "";
    public success: string = "";


    constructor(
        private _router: Router,
        private _EmpleadoService:EmpleadoService
    ) {
        this._EmpleadoService.getClientes().subscribe(resp=>{
            this.clientes = resp.data;
            this.clientes = this.clientes.filter((ele:any) => ele.activo===false)
        }, err=>{
            this._router.navigate(['/login']);
        })
    }

    ngOnInit(): void {
        this.dtoptions = {
            pagingType: 'full_numbers'
            /*,
            searching: true,
            //  paging:false
            lengthChange: false,
            language: {
                searchPlaceholder: 'Escribir Nombre'
            }
*/
        };
    }

    activar(id:string) {
        if (confirm('¿Estás seguro de querer activar?')) {
            if (this.objR == 'cliente') {
                this._EmpleadoService.deleteCliente(id).subscribe(resp=>{
                    alert("Cliente activado")
                    this.error = ""
                },err=>{
                    this.error = err.error.message
                })
            } 
        }
    }

}
