import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { fadeIn, fadeOut } from 'src/app/animations/fadeInOut';
import { ClienteF, FacturaF } from '../../models';
import { Global } from '../../service/global';
import { isAuthService } from '../../service/isAuth.service';
import { MasterService } from '../../service/login.service';
import { ClienteService } from './services/cliente.services';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [MasterService, ClienteService, isAuthService],
  animations: [fadeIn, fadeOut],
})
export class ClientesComponent implements OnInit{
  public option: number = 0;
  public objR: string;
  public cliente: ClienteF;
  public facturas: FacturaF[] = [];
  public ab:string = "1"
  public direc = Global.url+"cliente/facturas/"

  constructor(
    private _router: Router, 
    private _MasterService:MasterService,
    private _ClienteService:ClienteService,
    private __isAuthService:isAuthService
    ) {

      this.objR = "";
      this.cliente = new ClienteF("", "", "", "", "", "", "", {email: "", nickname: ""}, false, "");
      this._ClienteService.getInfo().subscribe(resp=>{
        this.cliente = resp.data;
      },err=>{
        this._router.navigate(['/login']);
      })

      this._ClienteService.getMisFacturas().subscribe(resp=>{
        this.facturas = resp.data;
        this.facturas = this.facturas.filter((ele) => ele.borrador === false)
        this.facturas.map((ele, index) => {
          this.facturas[index].fecha = new Date(ele.fecha).toLocaleString()
        })   
      },err=>{
        this._router.navigate(['/login']);
      })

  }

  click(){
    this.__isAuthService.setAuth(true, "okok55")
  }

  ngOnInit(): void {
}

  logout(): void {
    if (confirm('¿Estás seguro que deseas salir?')) {
      this._MasterService.logout().subscribe(
        resp => {
          this._router.navigate(['/login']);
        }, err => {
          console.log(err);
        })
    }
  }

  activarComponente(@Output() opcion: number) {
    this.option = opcion;
  }

  getInputValue(inputValue: string) {
    this.objR = inputValue;
  }

}
