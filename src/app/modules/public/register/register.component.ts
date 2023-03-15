import { Component, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../../models/register';
import { MasterService } from '../../../service/login.service';


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
  public tipoEmp:string;
  public pasos:{paso:number, descripcion:String}[];
  public pasoActual:number = 1;

  constructor(private _router: Router, private _MasterService:MasterService) {
    this.objR = ""
    this.register = new Register('', '', '', "", "", "", "", "", "", "", "", "", "", "")
    this.error = ""
    this.success = ""
    this.tipoEmp = ""
    this.pasos = [
      {
        paso: 1,
        descripcion: "Seleccionar el tipo de plan"
      },{
        paso: 2,
        descripcion: "Datos personales"
      },{
        paso: 3,
        descripcion: "Datos de su empresa"
      },{
        paso: 4,
        descripcion: "Credenciales y Registro"
      }
    ]
  }

  retro($event:Event){
    $event.preventDefault();
    this.pasoActual = this.pasoActual.valueOf()-1;
  }
  next($event:Event){
    $event.preventDefault();
    this.pasoActual = this.pasoActual.valueOf()+1;
  }
  ngOnInit(): void {

  }

  setTipo($event:Event){
    $event.preventDefault();
    var target = $event.target as HTMLButtonElement;
    this.tipoEmp = target.value;
  }

  changePaso($event:Event, paso:number){
    $event.preventDefault();
    this.pasoActual = paso;
  }

  onSubmit(form:NgForm) {
    console.log(form.value);

    this._MasterService.register({
      tipo:               this.tipoEmp,
      nombre:             this.register.nombre, 
      apellido:           this.register.apellido, 
      identificacion:     this.register.identificacion, 
      empresa_nombre:     this.register.empresa_nombre, 
      empresa_dir:        this.register.empresa_dir, 
      empresa_ciudad:     this.register.empresa_ciudad, 
      empresa_provincia:  this.register.empresa_privincia, 
      empresa_pais:       this.register.empresa_pais, 
      password:           this.register.password, 
      confirm_password:   this.register.confirm_password, 
      email:              this.register.email
    }).subscribe(
      resp=>{
      this.error = "";
      this.success = "Registro exitoso"
    }, err=>{
      this.error = err.error.message;
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
