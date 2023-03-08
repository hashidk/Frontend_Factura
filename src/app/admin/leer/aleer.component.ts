//Admin lee: Banco y Empleado

import { Component, OnInit, Input } from '@angular/core';
import { ProductoF } from 'src/app/models/productoF';
import { Subject } from 'rxjs';
import { MasterService } from 'src/app/service/login.service';


import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { EmpleadoF } from 'src/app/models/empleadoF';

@Component({
    selector: 'app-aleer',
    templateUrl: './aleer.component.html',
    providers: [MasterService, AdminService]
})

export class AleerComponent implements OnInit {
    title = "Leer";
    @Input() objR: string;

    empleados: EmpleadoF[];
    productos: ProductoF[];


    public empleado: EmpleadoF;  //empleado
    public producto: ProductoF;


    opcion: number = 2;
    public error: string = "";
    public success: string = "";
    dtoptions: DataTables.Settings = {};  //para tabla
    dtTrigger: Subject<any> = new Subject<any>();



    constructor(
        private _router: Router,
        private service: MasterService,
        private _AdminService:AdminService
    ) {
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
        // this.LoadInvoice();


    }

    LoadInvoice() {
        this.service.GetAllInvoice().subscribe(res => {
            this.dtTrigger.next(null);
        })
    }


}
