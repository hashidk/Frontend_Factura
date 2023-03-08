import { Component, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { Register } from '../models/register';
import { MasterService } from '../service/login.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MasterService]
})
export class RegisterComponent {
  title = "Registrarse";
  @Input() objR: string;
  public register: Register;

  opcion: number = 1;
  public error: string;
  public success: string;
  public clientes: any;
  public tipoEmp: {tipo:String};
  public pasos:{paso:Number, descripcion:String}[];
  public pasoActual:Number = 1;

  constructor(private _router: Router, private _MasterService:MasterService) {
    this.register = new Register('', '', '', "", "", "", "", "", "", "", null)
    this.error = ""
    this.success = ""
    this.tipoEmp = {tipo: ""}
    this.pasos = [
      {
        paso: 1,
        descripcion: "Seleccionar el tipo"
      },{
        paso: 2,
        descripcion: "Datos personales"
      },{
        paso: 3,
        descripcion: "Datos de su empresa"
      },{
        paso: 4,
        descripcion: "Registrarse"
      }
    ]
  }

  retro($event){
    $event.preventDefault();
    this.pasoActual = this.pasoActual.valueOf()-1;
  }
  next($event){
    $event.preventDefault();
    this.pasoActual = this.pasoActual.valueOf()+1;
  }
  ngOnInit(): void {

  }

  changePaso($event, paso){
    $event.preventDefault();
    this.pasoActual = paso;
    // var target = $event.target as HTMLButtonElement;
    // target.childNodes.item(0).back
  }

  onSubmit($event) {
    this._MasterService.register($event.target).then(resp=>{
      this.error = "";
      this.success = "Registro exitoso"
    }).catch(err=>{
      this.error = "error";
      this.success = ""
    })

  }

  // changeListener($event) : void {
  //   this.readThis($event.target).then(resp =>
  //     this.register.image = resp
  //   )
  // }

  // setImg(){
  //   this.register.image
  //   myReader.result as string
  // }

  // readThis(inputValue: any, callback) {
  //     var file:File = inputValue.files[0]; 
  //     var myReader:FileReader = new FileReader();
  //     myReader.onloadend = callback
  //     myReader.readAsText(file);
  // }

}
