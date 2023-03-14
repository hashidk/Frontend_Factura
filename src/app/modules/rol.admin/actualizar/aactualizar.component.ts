//Admin lee: Banco y Empleado

import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { MasterService } from '../../../service/login.service';
import { AdminService } from '../service/admin.service';
import { EmpleadoF } from '../../../models/empleadoF';
import { ProductoF } from '../../../models/productoF';


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

    constructor(
        private _router: Router,
        private service: MasterService,
        private _AdminService:AdminService
    ) {
        this.empleado = new EmpleadoF("", "", "", "", {email: "", nickname: ""}, "", true)
        this.producto = new ProductoF("", 0, "", "")
        this.cancel = true;
        this.renderCancel = false
        this.objR = ""
        this.id = "";

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
                precio: parseFloat(form.value.precio),
            }, form.value.id).subscribe(resp=> {
                console.log(resp);
                
                this.error = "";
                this.success = "Producto actualizado"
            }, err=> {
                this.error = err.error.message;
                this.success = ""
            })
            this.producto.reset()
        }

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
                this.success = "Empleado desactivado"
            },err=>{
                this.success = ""
            })
            this.empleado.reset();
        } else {
            this._AdminService.deleteProducto(this.id).subscribe(resp=>{
                this.success = "Producto Eliminado"
            },err=>{
                this.success = ""
            })
            this.producto.reset()
        }
        this.renderCancel = false;
      }
    }

    desactivar(id:string) {
        this.id = id
        this.renderCancel = true;

        // if (confirm('¿Estás seguro de desactivarlo/Eliminarlo?')) {}
    }

    actualizarState(){
        this.updateState = !this.updateState;
        this.success = ""
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
