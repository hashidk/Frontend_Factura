//Admin lee: Banco y Empleado

import { Component, OnInit, Input } from '@angular/core';
import { ProductoF } from '../../../models/productoF';
import { MasterService } from '../../../service/login.service';


import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { EmpleadoF } from '../../../models/empleadoF';
import { fadeIn, fadeOut } from 'src/app/animations/fadeInOut';

@Component({
    selector: 'app-aleer',
    templateUrl: './aleer.component.html',
    providers: [MasterService, AdminService],
    animations: [fadeIn, fadeOut],
})

export class AleerComponent implements OnInit {
    title = "Leer";
    @Input() objR: string;

    empleados: EmpleadoF[] = [];
    productos: ProductoF[] = [];


    public empleado: EmpleadoF;  //empleado
    public producto: ProductoF;


    opcion: number = 2;
    public error: string = "";
    public success: string = "";

    constructor(
        private _router: Router,
        private service: MasterService,
        private _AdminService:AdminService
    ) {
        this.objR = ""
        this.empleado = new EmpleadoF("", "", "", "", {email: "", nickname: ""}, "", false)
        this.producto = new ProductoF("", 0, "", "")
        this._AdminService.getEmpleados().subscribe(resp=>{
            this.empleados = resp.data;
        },err =>{
            this._router.navigate(['/login']);
        })

        this._AdminService.getProductos().subscribe(resp=>{
            this.productos = resp.data;
        },err =>{
            this._router.navigate(['/login']);
        })


    }

    ngOnInit(): void {
    }


}
