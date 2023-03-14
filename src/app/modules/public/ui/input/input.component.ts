import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() texto:string
  @Input() width:number

  constructor(){
    this.texto = "Muy bien"
    this.width = 100;
  }
}
