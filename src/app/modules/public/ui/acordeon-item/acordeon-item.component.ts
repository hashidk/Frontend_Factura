import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-acordeon-item',
  templateUrl: './acordeon-item.component.html',
  styleUrls: ['./acordeon-item.component.css']
})
export class AcordeonItemComponent {
  @Input() title:string

  constructor(){
    this.title = "";
  }
}
