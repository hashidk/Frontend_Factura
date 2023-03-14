import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'ui-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit{
  @Output() cancel = new EventEmitter<any>();
  @Input() texto: string;

  constructor(){
    this.cancel.emit(false)
    this.texto = "¿Estás seguro que deseas continuar?"

    
  }
  
  ngOnInit(): void {
    var el = document.getElementById("focus") as HTMLButtonElement
    el.focus();    
    if (document.getElementsByClassName("alerta")[0]) {
      var ele = document.getElementsByClassName("alerta")[0] as HTMLDivElement
      ele.addEventListener('keydown', ($event:KeyboardEvent) => this.keyboardScape($event))
    }
    
  }

  keyboardScape($event:KeyboardEvent) {
      if ($event.keyCode === 27) {
        this.cancel.emit(true)
      }
  }

  onCancel(){
    this.cancel.emit(true)
  }

  onAccept(){
    this.cancel.emit(false)
  }
}
