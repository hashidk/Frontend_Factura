import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  
  public contacto: {
    nombres:string,
    correo:string,
    telefono:string,
    empresa:string
  }
  public checkbox:boolean;

  constructor(){
    this.checkbox = false;
    this.contacto = {
      correo: "",
      empresa: "",
      nombres: "",
      telefono: ""
    };
  }

  handleCheckbox($event:Event){
    this.checkbox = !this.checkbox
  }

  onSubmit(formEl: NgForm) {
  }
}
