import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../services/to-do.service';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements OnInit {
  toDoLists: any[] = [];

  
  constructor(private toDoService: ToDoService) { }

  ngOnInit(): void {
    this.toDoService.getToDoLists().subscribe((lists) => {
      this.toDoLists = lists;
    });
  }

}
