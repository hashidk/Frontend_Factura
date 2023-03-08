//Empleado actualiza: Cuenta y Cliente

import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/service/login.service';
import { EmpleadoService } from '../service/empleado.service';
import { ClienteF, FacturaF, ProductoF } from 'src/app/models';
type Pedido ={producto:ProductoF, cantidad:number};


@Component({
    selector: 'app-eactualizar',
    templateUrl: './eactualizar.component.html',
    providers: [MasterService, EmpleadoService]
})

export class EactualizarComponent implements OnInit {
    title = "Actualizar";
    @Input() objR: string;

    public pedido: Pedido = {
        producto:new ProductoF("", 0, "", ""),
        cantidad:1
      };

    public clientes: ClienteF[];
    public facturas: FacturaF[];
    public productos: ProductoF[];
    public productosFilter: ProductoF[]
    public productosSelected: Pedido[] = []
  
    public subtotal:number = 0;

    public updateState:boolean = false

    public cliente: ClienteF;
    public factura: FacturaF;

    opcion: number = 3;
    public error: string = "";
    public success: string = "";
    dtoptions: DataTables.Settings = {};  //para tabla


    constructor(
        private _router: Router,
        private service: MasterService,
        private _EmpleadoService:EmpleadoService
    ) {
        this.cliente = new ClienteF("", "", "", "", "", "", "", {email:"", nickname: ""}, false, "")
        this.factura = new FacturaF("", "", "", "", "", 0, [], "", "")
        this._EmpleadoService.getClientes().subscribe(resp=>{
            this.clientes = resp.data;
            this.clientes = this.clientes.filter((ele:any) => ele.activo===true)           
        }, err=>{
            this._router.navigate(['/login']);
        })

        this._EmpleadoService.getFacturas().subscribe(resp=>{
            this.facturas = resp.data;
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
        this.dtoptions = {
            pagingType: 'full_numbers'
        }
    }

    onSubmit(form: NgForm) {        
        if (this.objR == 'cliente') {
            this._EmpleadoService.updateCliente({
                nombre: form.value.nombre,
                apellido: form.value.apellido,
                provincia: form.value.provincia,
                ciudad: form.value.ciudad,
                codigo_postal: form.value.codigo,
                correo: form.value.email
            }, form.value.id).subscribe(resp=>{
                this.error = "";
                this.success = "Cliente actualizado"
                this.actualizarState()
            },err=>{
                this.error = err.response.data;
                this.success = ""
            })
            this.cliente.reset();

        } else {
            if (this.productosSelected.length>0) {
                this._EmpleadoService.updateFactura({
                    productos: this.productosSelected.map(ele => [ele.producto._id, ele.cantidad]),
                }, form.value.id).subscribe(resp=>{
                    this.error = "";
                    this.success = "Cuenta actualizada"
                    this.actualizarState()
                },err=>{
                    this.error = err.response.data;
                    this.success = ""
                })
            }

            this.factura.reset();
        }
        
    }

    actualizarState(){
        this.updateState = !this.updateState;
    }

    editar(obj: any) {
        if (this.objR == 'cliente') {
            this.cliente = obj;
        } else {
            this.factura = obj;
            this.productosSelected = this.factura.productos.map(ele => {
                return {
                    producto: this.productos.find(ele2=> ele2._id === ele[0]),
                    cantidad: ele[1]
                }
            })
            this.subtotal = this.productosSelected.map(ele => ele.cantidad*ele.producto.precio).reduce((a, b) => a + b, 0)
            this.productosFilter = this.productos.filter(ele => !this.productosSelected.map(p => p.producto._id).includes(ele._id))
        }
        this.actualizarState()
    }

    desactivar(id:string) {
        if (confirm('¿Estás seguro de desactivarlo?')) {
            if (this.objR == 'cliente') {
                this._EmpleadoService.deleteCliente(id).subscribe(resp=>{
                    alert("Cliente desactivado")
                    this.error = ""
                },err=>{
                    this.error = err.error.message
                })
                this.cliente.reset();
            }
        }
    }

    handleAdd(){
        if (this.pedido.producto._id !== "none") {
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
