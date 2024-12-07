import { Component, OnInit, Input, LOCALE_ID } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TaskModalComponent } from '../../task-modal/task-modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToDoLoggedIn, Task } from '../../../models/to-do.model';
import { ToDoLoggedInService } from '../../../services/todoLoggedIn.service';
import { ListModalComponent } from '../../list-modal/list-modal.component'
import { update } from '@angular/fire/database';

@Component({
  selector: 'app-to-do-logged-in',
  standalone: true,
  imports: [TaskModalComponent, ListModalComponent, FormsModule, CommonModule],
  templateUrl: './to-do-logged-in.component.html',
  styleUrl: './to-do-logged-in.component.css'
})
export class ToDoLoggedInComponent implements OnInit {
  isModalOpen: boolean = false;
  isListModalOpen: boolean = false;
  selectedTaskList: ToDoLoggedIn | null = null;
  taskToEdit: Task | null = null;
  toDoLists: ToDoLoggedIn[] = [];
  listToEdit: ToDoLoggedIn = { title: "", color: "#FFFF", tasks: [] };

  constructor(private toDoService: ToDoLoggedInService) { }

  ngOnInit(): void {
    this.toDoService.getToDoLists().subscribe((data: ToDoLoggedIn[]) => {
      this.toDoLists = data.map((list) => ({
        ...list,
        id: list.id,
        tasks: list.tasks ?? []
      }));
    });
  }

  openTaskModal(list: ToDoLoggedIn | null, taskToEdit: Task | null = null): void {
    this.selectedTaskList = list;
    this.taskToEdit = taskToEdit;
    this.isModalOpen = true;
  }

  openListTaskModal(list?: { title: string, color: string, tasks: any[] }): void {
    if (list) {
      this.listToEdit = { ...list };
    } else {
      this.listToEdit = { title: '', color: '#FFFFFF', tasks: [] }; 
    }
    this.isListModalOpen = true;
  }


  closeModal(): void {
    this.isModalOpen = false;
    this.taskToEdit = null;
  }


  closeListModal(): void {
    this.isListModalOpen = false;

  }
  createNewList(listData: { title: string, color: string }): void {
    const newList = {
      
      title: listData.title,
      color: listData.color,
      tasks: []
    };
    console.log(newList);

    this.toDoService.addToDoList(newList)
      .then(() => {
        this.toDoLists.push(newList);
        this.closeListModal();
      })
      .catch(err => console.error('Error creating new list:', err));
  }

  addTask(task: Task): void {
    if (this.selectedTaskList) {
      console.log(this.selectedTaskList);

      if (this.taskToEdit) {
        const taskIndex = this.selectedTaskList.tasks.findIndex(t => t === this.taskToEdit);
        if (taskIndex !== -1) {
          this.selectedTaskList.tasks[taskIndex] = task;
        }
      } else {
        this.selectedTaskList.tasks.push(task);
      }

      this.toDoService.addToDoList(this.selectedTaskList)
        .then(() => console.log('Task saved successfully.'))
        .catch(err => console.error('Error saving task:', err));

      this.closeModal();
    }
  }
  handleListUpdated(updatedList: ToDoLoggedIn): void {
    const index = this.toDoLists.findIndex(list => list.id === updatedList.id);
    console.log(updatedList.id);
    
    if (index !== -1) {
      this.toDoLists[index] = updatedList;
      this.toDoService.addToDoList(updatedList)
        .then(() => console.log('List updated successfully:', updatedList))
        .catch(err => console.error('Error updating list:', err));
    } else {
      console.error('List to update not found.');
    }
  }

  removeTask(list: ToDoLoggedIn, taskIndex: number): void {
    if (list.tasks && taskIndex >= 0 && taskIndex < list.tasks.length) {
      list.tasks.splice(taskIndex, 1);

      this.toDoService.addToDoList(list)
        .then(() => console.log('Task removed successfully.'))
        .catch(err => console.error('Error removing task:', err));
    } else {
      console.error('Invalid task index or list');
    }
  }
  openNewListModal(): void {
    const newListTitle = prompt("Enter the new list title:");

    if (newListTitle) {
      const newList: ToDoLoggedIn = {
        title: newListTitle,
        color: "#80379E", 
        tasks: []
      };

      this.toDoService.addToDoList(newList)
        .then(() => {
          console.log("New list added successfully.");
        })
        .catch(err => {
          console.error("Error adding new list:", err);
        });
    }
  }

  onDeleteList(listId: string) {
    this.toDoService.deleteToDoList(listId).subscribe({
      next: () => {
        console.log('List deleted', listId);
      },
      error: (err) => {
        console.error('Error deleting list:', err);
      }
    });
  }
}
