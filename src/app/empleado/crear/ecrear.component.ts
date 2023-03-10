//Admin crea: Banco y Empleado

import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';


import { Router } from '@angular/router';
import { EmpleadoService } from '../service/empleado.service';
import { ClienteF, FacturaF, ProductoF } from 'src/app/models';
type Pedido ={producto:ProductoF, cantidad:number};

@Component({
  selector: 'app-ecrear',
  templateUrl: './ecrear.component.html',
  styleUrls: ['./ecrear.component.css'],
  providers: [EmpleadoService]
})


export class EcrearComponent {
  title = "Crear";
  @Input() objR: string;
  public subtotal:number = 0;
  public cliente: ClienteF; 
  public factura: FacturaF;
  public clientes: ClienteF[]

  public pedido: Pedido = {
    producto: new ProductoF("", 0, "", ""),
    cantidad:1
  };
  public productos: ProductoF[];
  public productosFilter: ProductoF[]
  public productosSelected: Pedido[] = []


  public error: string = "";
  public success: string = "";

  constructor(
    private _router: Router,
    private _EmpleadoService:EmpleadoService
  ) {
    this.cliente = new ClienteF("", "", "", "", "", "", "",{email: "", nickname: ""}, false, "")
    this.factura = new FacturaF("", "", "", "", "", 0, [], "", "")

    this._EmpleadoService.getProductos().subscribe(resp=>{
      this.productos = resp.data;
      this.productosFilter = resp.data;
      console.log(this.productosFilter);
    },err=>{
      this._router.navigate(['/login']);
    })

    this._EmpleadoService.getClientes().subscribe(resp => {
      this.clientes = resp.data;
    }, err => {
        this._router.navigate(['/login']);
    })

    
  }
  
  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.objR == 'cliente') {
      this._EmpleadoService.addCliente({
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        identificacion: form.value.id,
        correo: form.value.email,
        provincia:form.value.provincia, 
        ciudad:form.value.ciudad, 
        dir:form.value.dir, 
      }).subscribe(resp=>{
        this.error = "";
        this.success = "Cliente creado"
        this.cliente.reset()
      }, err=>{
        this.error = err.error.message;
        this.success = ""
      })
    } else {
      if (this.productosSelected.length>0) {
        this._EmpleadoService.addFactura({
          clienteid: form.value.id,
          productos: this.productosSelected.map(ele => {return {_id: ele.producto._id, cantidad: ele.cantidad}})
        }).subscribe(resp=>{
          this.error = "";
          this.success = "Factura creada"
          this.factura.reset()
        }, err=>{
          this.error = err.error.message;
          this.success = ""
        })
      }
    }
  }

  handleAdd(){
    if (this.pedido.producto._id !== "none" && this.pedido.producto._id !== "" && !this.productosSelected.map(ele => ele.producto._id).includes(this.pedido.producto._id)) {
      this.productos.filter(ele => ele._id === this.pedido.producto._id)[0]
      this.productosSelected.push({
        producto: this.productos.filter(ele => ele._id === this.pedido.producto._id)[0],
        cantidad: this.pedido.cantidad,
      })
      this.subtotal = this.productosSelected.map(ele => ele.cantidad*ele.producto.precio).reduce((a, b) => a + b, 0)
      
      this.productosFilter = this.productos.filter(ele => !this.productosSelected.map(p => p.producto._id).includes(ele._id))
    }
  }

  handleclick(id:string){
    this.productosSelected = this.productosSelected.filter(ele => ele.producto._id !== id)
    this.subtotal = this.productosSelected.map(ele => ele.cantidad*ele.producto.precio).reduce((a, b) => a + b, 0)
    this.productosFilter = this.productos.filter(ele => !this.productosSelected.map(p => p.producto._id).includes(ele._id))
  }
}
