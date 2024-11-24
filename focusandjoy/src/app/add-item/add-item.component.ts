import { Component } from '@angular/core';


@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  task: string = "";



  addItem() {
    if(this.task.length<0) {
    }
  }
}
