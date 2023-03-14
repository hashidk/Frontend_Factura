import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message:string
  @Input() success:boolean

  constructor(){
    this.message = "Muy bien",
    this.success = true
  }
}
