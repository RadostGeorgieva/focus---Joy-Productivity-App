import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../services/to-do.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements OnInit {
  toDoLists: any[] = [];


  constructor(private toDoService: ToDoService) { }

  ngOnInit(): void {
    this.toDoService.getToDoLists().subscribe((data) => {
      this.toDoLists = data
  })
  this.toDoService.fetchData();
}
handleAddItem(list:any) {
  list.isAdding = !list.isAdding;
  console.log(list.isAdding);

}

addItem(list:any) {
  console.log(list);
  let item = list.inputValue;
  this.toDoService.addItemToList(list.id,item)
  list.inputValue = '';
  list.isAdding = !list.isAdding;
}


}
