//Admin lee: Banco y Empleado

import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { BancoB } from 'src/app/models/banco';
import axios from 'axios';

import { Router } from '@angular/router';
import { CuentaB } from 'src/app/models/cuenta';


@Component({
    selector: 'app-aactualizar',
    templateUrl: './aactualizar.component.html'
})

export class AactualizarComponent implements OnInit {
    title = "Actualizar";
    @Input() objR: string;
    public cta: CuentaB;


    public usuario: Usuario;  //empleado
    public banco: BancoB;

    opcion: number = 3;
    public error: string = "";
    public success: string = "";


    constructor(
        private _router: Router,


    ) {
    }

    ngOnInit(): void {

    }

    onSubmit(formEmpleado: NgForm) {

        axios.post("http://localhost:8080/api/administrador/empleados", {
            nombre: formEmpleado.value.nombre,
            apellido: formEmpleado.value.apellido,
            identificacion: formEmpleado.value.id,
            email: formEmpleado.value.email
        },
            {
                headers: {
                    Accept: 'application/json',
                },
                withCredentials: true
            }).then(resp => {
                this.error = "";
                this.success = "Empleado creado"

            }).catch(err => {
                this.error = err.response.data;
                this.success = ""
            })
    }


}
