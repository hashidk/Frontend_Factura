//Empleado actualiza: Cuenta y Cliente

import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../../../service/login.service';
import { EmpleadoService } from '../service/empleado.service';
import { ClienteF, FacturaF, ProductoF } from '../../../models';
import { fadeIn, fadeOut } from 'src/app/animations/fadeInOut';
type Pedido ={producto:ProductoF, cantidad:number};


@Component({
    selector: 'app-eactualizar',
    templateUrl: './eactualizar.component.html',
    providers: [MasterService, EmpleadoService],
    animations: [fadeIn, fadeOut],
})

export class EactualizarComponent implements OnInit {
    title = "Actualizar";
    @Input() objR: string;

    public pedido: Pedido = {
        producto:new ProductoF("", 0, "", ""),
        cantidad:1
      };

    public clientes: ClienteF[] = [];
    public facturas: FacturaF[] = [];
    public productos: ProductoF[] = [];
    public productosFilter: ProductoF[] = []
    public productosSelected: Pedido[] = []
    public id:string;
  
    public subtotal:number = 0;

    public updateState:boolean = false

    public cliente: ClienteF;
    public factura: FacturaF;

    opcion: number = 3;
    public error: string = "";
    public success: string = "";

    constructor(
        private _router: Router,
        private service: MasterService,
        private _EmpleadoService:EmpleadoService
    ) {
        this.objR = ""
        this.id = ""
        this.cancel = true;
        this.renderCancel = false
        this.cliente = new ClienteF("", "", "", "", "", "", "", {email:"", nickname: ""}, false, "")
        this.factura = new FacturaF("", "", "", "", "", 0, [], "", "", true, false)
        this._EmpleadoService.getClientes().subscribe(resp=>{
            this.clientes = resp.data;
            this.clientes = this.clientes.filter((ele:any) => ele.activo===true)           
        }, err=>{
            this._router.navigate(['/login']);
        })

        this._EmpleadoService.getFacturas().subscribe(resp=>{
            this.facturas = resp.data;
            this.facturas = this.facturas.filter((ele) => ele.borrador === true)
            this.facturas.map((ele, index) => {
                this.facturas[index].fecha = new Date(ele.fecha).toLocaleString()
            })
        }, err=>{
            this._router.navigate(['/login']);
        })

        this._EmpleadoService.getInfo().subscribe(resp=>{
            this.productos = resp.data;
            this.productosFilter = resp.data;
          },err=>{
            this._router.navigate(['/login']);
          })
        
        this._EmpleadoService.getProductos().subscribe(resp=>{
            this.productos = resp.data;
            this.productosFilter = resp.data;
        },err=>{
            this._router.navigate(['/login']);
        })
    }

    ngOnInit(): void {

    }

    setBorrador(value:boolean){
        this.factura.borrador = value;
      }    
    onSubmit(form: NgForm) {        
        if (this.objR == 'cliente') {
            this._EmpleadoService.updateCliente({
                nombre: form.value.nombre,
                apellido: form.value.apellido,
                provincia: form.value.provincia,
                ciudad: form.value.ciudad,
                dir: form.value.dir,
                correo: form.value.email
            }, form.value.id).subscribe(resp=>{
                this.error = "";
                this.success = "Cliente actualizado"
            },err=>{
                this.error = err.error.message;
                this.success = ""
            })
            this.cliente.reset();

        } else {
            if (this.productosSelected.length>0) {
                this._EmpleadoService.updateFactura({
                    productos: this.productosSelected.map(ele => {return {_id: ele.producto._id, cantidad: ele.cantidad}}),
                    borrador: this.factura.borrador
                }, form.value.id).subscribe(resp=>{
                    this.error = "";
                    this.success = "Factura actualizada"
                },err=>{
                    this.error = err.error.message;
                    this.success = ""
                })
            }

            this.factura.reset()
        }
        
    }

    actualizarState(){
        this.success = ""
        this.updateState = !this.updateState;
    }

    editar(obj: ClienteF|FacturaF) {
        if (this.objR == 'cliente') {
            this.cliente = obj as ClienteF;
        } else {
            this.factura = obj as FacturaF;
            this.productosSelected = this.factura.productos.map((ele)=> {                
                return {
                    producto: this.productos.find((ele2:ProductoF)=> ele2._id === ele._id) as ProductoF,
                    cantidad: ele.cantidad
                }
            })
            
            this.subtotal = this.productosSelected.map(ele => ele.cantidad*ele.producto.precio).reduce((a, b) => a + b, 0)
            this.productosFilter = this.productos.filter(ele => !this.productosSelected.map(p => p.producto._id).includes(ele._id))
        }
        this.actualizarState()
    }

    public cancel:boolean;
    public renderCancel:boolean
  
    handleCancel($event:boolean){
      if ($event) {
        this.renderCancel = false;
      }else{
        if (this.objR == 'cliente') {
            this._EmpleadoService.deleteCliente(this.id).subscribe(resp=>{
                this.success = "Cliente desactivado"
                this.error = ""
            },err=>{
                this.error = err.error.message
            })
            this.cliente.reset();
            this.renderCancel = false;
        }
      }
    }

    desactivar(id:string) {
        this.renderCancel = true;
        this.id = id;
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
