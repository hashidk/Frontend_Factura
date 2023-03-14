//Admin crea: Banco y Empleado

import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { EmpleadoF } from '../../../models/empleadoF';
import { ProductoF } from '../../../models/productoF';


@Component({
  selector: 'app-acrear',
  templateUrl: './acrear.component.html',
  styleUrls: ['./acrear.component.css'],
  providers: [AdminService]
})

export class AcrearComponent {
  title = "Crear";
  @Input() objR: string;
  public empleado: EmpleadoF;  //empleado
  public producto: ProductoF;


  public error: string = "";
  public success: string = "";

  constructor(
    private _router: Router,
    private _AdminService:AdminService
  ) {
    this.objR = ""
    this.empleado = new EmpleadoF("", "", "", "", {email: "", nickname: ""}, "", true)
    this.producto = new ProductoF("", 0, "", "")
  }
  
  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.objR == 'empleado') {
      this._AdminService.addEmpleado({
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        identificacion: form.value.id,
        correo: form.value.email
      }).subscribe(resp=>{
        this.error = "";
        this.success = "Empleado creado"
        this.empleado.reset()
      }, err=>{
        this.error = err.error.message;
        this.success = ""
      })
    } else {
      this._AdminService.addProducto({
        precio: form.value.precio,
        descripcion: form.value.descripcion,
      }).subscribe(resp=>{
        this.error = "";
        this.success = "Producto creado"
        this.producto.reset()
      }, err=>{
        this.error = err.error.message;
        this.success = ""
      })
    }
  }
}
