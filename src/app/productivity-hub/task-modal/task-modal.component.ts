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
  @Input() taskToEdit: Task | null = null;
  @Output() taskAdded = new EventEmitter<Task>();
  @Output() close = new EventEmitter<void>();

  task: Task = { title: '', completed: false, category: 'daily' };

  ngOnInit() {
    if (this.taskToEdit) {
      this.task = { ...this.taskToEdit };
    }
  }
  
  onSubmit() {
    if (this.selectedTaskList) {
      this.taskAdded.emit(this.task);
      this.task = { title: '', completed: false, category: 'daily' };
      this.onClose();
    }
  }
  deleteList() {

    if (this.selectedTaskList) {
      console.log(`Deleting list: ${this.selectedTaskList.title}`);
      this.onClose();
    }
  }

  onClose() {
    this.close.emit();
  }
}
