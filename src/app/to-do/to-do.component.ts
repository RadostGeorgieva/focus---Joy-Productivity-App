import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../services/to-do.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToDoItem, ToDoList } from '../models/to-do.model';


@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements OnInit {
  toDoLists: any[] = []
  editedValue:string = "";
  editingState: { [key: string]: boolean } = {};

  constructor(private toDoService: ToDoService) { }

  ngOnInit(): void {
    this.toDoService.getCollectionData().subscribe((data) => {
      this.toDoLists = data
    });
    this.toDoService.fetchData();
  }
  //adding new items
  handleAddItem(list: {
    id: string, items: string[], inputValue: string, isAdding: boolean;
  }) {
    list.isAdding = !list.isAdding;

  }

  addItem(list: {
    id: string, items: string[], inputValue: string, isAdding: boolean;
  }) {
    let item = list.inputValue;
    if(!list.inputValue) {
      item = "";
    }
    if(item.length<=0) {
      console.log(item)
      alert("Item cannot be empty!")
    } else{
    this.toDoService.addItemToList(list.id, item)
    list.inputValue = '';
    list.isAdding = !list.isAdding;
  }
  }
  //editing:
  handleEdit(id: string, index: number) {
    const key = `${id}-${index}`;
    this.editingState[key] = !this.editingState[key];

    if (this.editingState[key]) {
      const l = this.toDoLists.find((l) => l.id === id);
      if (l) {
        this.editedValue = l.items[index];
      }
    }
  }

  isEditing(id: string, index: number) {
    const key = `${id}-${index}`;
    return !!this.editingState[key]

  }
  editItem(id: string, index: number, editedValue: string) {
    const l = this.toDoLists.find((l) => l.id === id);
    if (l) {
      l.items[index] = editedValue;
    }

    this.toDoService.updateToDoList(id, l.items[index], index)

    this.handleEdit(id, index);
  }
  //deleting:
  deleteItem(id: string, index: number) {
    let indexToNumber = Number
    this.toDoService.deleteToDoItem(id, index);
  }

}
