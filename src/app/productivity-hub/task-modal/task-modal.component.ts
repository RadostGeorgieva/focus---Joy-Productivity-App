import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, ToDoLoggedIn } from '../../models/to-do.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css',
})
export class TaskModalComponent {
  @Input() selectedTaskList: ToDoLoggedIn | null = null;  
  @Output() taskAdded = new EventEmitter<Task>();  
  @Output() close = new EventEmitter<void>();

  task: Task = { title: '', completed: false };

 ngOnChanges() {
  console.log('selectedTaskList:', this.selectedTaskList);
}
  onSubmit() {
    if (this.selectedTaskList) {
      console.log('Form submitted:', this.task);
      this.taskAdded.emit(this.task); 
      this.task = { title: '', completed: false }; 
      this.onClose(); 
    }
  }


  onClose() {
    console.log('Modal closed');
    this.close.emit();
  }
}
