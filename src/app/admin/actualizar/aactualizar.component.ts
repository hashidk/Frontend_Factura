//Admin lee: Banco y Empleado

import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import axios from 'axios';

import { Router } from '@angular/router';
import { CuentaB } from 'src/app/models/cuenta';
import { Subject } from 'rxjs';
import { MasterService } from 'src/app/service/login.service';
import { AdminService } from '../service/admin.service';
import { EmpleadoF } from 'src/app/models/empleadoF';
import { ProductoF } from 'src/app/models/productoF';


@Component({
    selector: 'app-aactualizar',
    templateUrl: './aactualizar.component.html',
    providers: [MasterService, AdminService]
})

export class AactualizarComponent implements OnInit {
    title = "Actualizar";
    @Input() objR: string;
    public updateState:boolean = false


    public empleado: EmpleadoF;  //empleado
    public producto: ProductoF;
    public empleados: EmpleadoF[] = [];
    public productos: ProductoF[] = [];


    opcion: number = 3;
    public error: string = "";
    public success: string = "";
    dtoptions: DataTables.Settings = {};  //para tabla
    dtTrigger: Subject<any> = new Subject<any>();

    constructor(
        private _router: Router,
        private service: MasterService,
        private _AdminService:AdminService
    ) {
        this.empleado = new EmpleadoF("", "", "", "", {email: "", nickname: ""}, "", true)
        this.producto = new ProductoF("", 0, "", "")

        this._AdminService.getEmpleados().subscribe(resp=>{
            this.empleados = resp.data;
            this.empleados = this.empleados.filter((ele:EmpleadoF) => ele.activo===true)           
        }, err=>{
            this._router.navigate(['/login']);
        })

        this._AdminService.getProductos().subscribe(resp=>{
            this.productos = resp.data;
        }, err=>{
            this._router.navigate(['/login']);
        })
    }

    ngOnInit(): void {
        this.dtoptions = {
            pagingType: 'full_numbers'
        }
    }

    onSubmit(form: NgForm) {
        if (this.objR == 'empleado') {
            this._AdminService.updateEmpleado({
                nombre: form.value.nombre,
                apellido: form.value.apellido,
                correo: form.value.email
            }, form.value.id).subscribe(resp=> {
                this.error = "";
                this.success = "Empleado actualizado"
            }, err=> {
                this.error = err.error.message;
                this.success = ""
            })
            this.empleado.reset()
        } else {
            this._AdminService.updateProducto({
                descripcion: form.value.descripcion,
                precio: form.value.precio,
            }, form.value.id).subscribe(resp=> {
                this.error = "";
                this.success = "Producto actualizado"
            }, err=> {
                this.error = err.error.message;
                this.success = ""
            })
            this.producto.reset()
        }

    }

    LoadInvoice() {
        this.service.GetAllInvoice().subscribe(res => {
            this.dtTrigger.next(null);
        })
    }

    desactivar(id:string) {
        if (confirm('¿Estás seguro de desactivarlo/Eliminarlo?')) {
            if (this.objR == 'empleado') {
                this._AdminService.deleteEmpleado(id).subscribe(resp=>{
                    alert("Empleado desactivado")
                    this.error = ""
                },err=>{
                    this.error = err.error.message
                })
                this.empleado.reset();
            } else {
                this._AdminService.deleteProducto(id).subscribe(resp=>{
                    alert("Producto Eliminado")
                    this.error = ""
                },err=>{
                    this.error = err.error.message
                })
                this.producto.reset()
            }
        }
    }

    actualizarState(){
        this.updateState = !this.updateState;
    }

    editar(obj: any) {
        if (this.objR == 'empleado') {
            this.empleado = obj;
        } else {
            this.producto = obj;
        }
        this.actualizarState()
    }

}
