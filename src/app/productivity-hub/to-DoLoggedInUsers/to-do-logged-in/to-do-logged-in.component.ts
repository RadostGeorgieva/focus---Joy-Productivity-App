import { Component, OnInit, Input} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TaskModalComponent } from '../../task-modal/task-modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToDoLoggedIn, Task } from '../../../models/to-do.model';
import { ToDoLoggedInService } from '../../../services/todoLoggedIn.service';

@Component({
  selector: 'app-to-do-logged-in',
  standalone: true,
  imports: [TaskModalComponent, FormsModule, CommonModule],
  templateUrl: './to-do-logged-in.component.html',
  styleUrl: './to-do-logged-in.component.css'
})
export class ToDoLoggedInComponent {
  isModalOpen: boolean = false;
  selectedTaskList: any = null;
  toDoLists: ToDoLoggedIn[] = [];

  constructor(private toDoService: ToDoLoggedInService
  ) {}

  ngOnInit(): void {
    this.toDoService.getToDoLists().subscribe((data: ToDoLoggedIn[]) => {
      console.log('Fetched Data:', data);
      this.toDoLists = data.map((list) => ({
        ...list,
        id: list.id,
        tasks: list.tasks ?? []
        
      }));
    });
    
  }

  openTaskModal(list: ToDoLoggedIn | null) {
    this.selectedTaskList = list; 
    this.isModalOpen = true;      
  }


  closeModal() {
    console.log('Modal closing');
    this.isModalOpen = false;      
  }



  addTask(task: Task): void {
    console.log(task);
    
    if (this.selectedTaskList) {
      this.selectedTaskList.tasks.push(task);
  
      this.toDoService.addToDoList(this.selectedTaskList).then(() => {
        console.log('Task added successfully and persisted.');
      }).catch((err) => {
        console.error('Error adding task:', err);
      });
  

      this.closeModal();
    }
  }
  
    
  removeTask(list:ToDoLoggedIn) {
    
    this.toDoService.addToDoList(list)
  }

}
