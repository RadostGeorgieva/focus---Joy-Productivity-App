import { Component, OnInit, Input, LOCALE_ID } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TaskModalComponent } from '../../task-modal/task-modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToDoLoggedIn, Task } from '../../../models/to-do.model';
import { ToDoLoggedInService } from '../../../services/todoLoggedIn.service';
import { ListModalComponent } from '../../list-modal/list-modal.component'
import { v4 as uuidv4 } from 'uuid';

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

  openListTaskModal(list?: ToDoLoggedIn): void {
    if (list) {
      this.listToEdit = { ...list };
    } else {
      this.listToEdit = { title: '', color: '#FFFFFF', tasks: [] };
    }
    this.isListModalOpen = true;
  }
  onTaskCheckboxTogglelist(list: ToDoLoggedIn, task: Task): void {
    task.completed = !task.completed;
    this.toDoService.addToDoList(list)
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

    this.toDoService.addToDoList(newList)
      .then(() => {
        this.toDoLists.push(newList);
        this.closeListModal();
      })
      .catch(err => console.error('Error creating new list:', err));
  }

  addTask(task: Task): void {
    console.log(task);
    if (this.selectedTaskList) {


      if (this.taskToEdit) {

        const taskIndex = this.selectedTaskList.tasks.findIndex(t => t === this.taskToEdit);
        if (taskIndex !== -1) {
          this.selectedTaskList.tasks[taskIndex] = task;
        }
      } else {
        if (!task.id) {
          task.id = uuidv4();
        }
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

    if (index !== -1) {
      this.toDoLists[index] = updatedList;
      this.toDoService.addToDoList(updatedList)
        .then(() => console.log('List updated successfully:', updatedList))
        .catch(err => console.error('Error updating list:', err));
    } else {
      console.error('List to update not found.');
    }
  }
  getTaskIndex(list: any, task: any): number {
    return list.tasks.findIndex((t: { id: string; }) => t.id === task.id);
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

  onDeleteList(listId: string) {
    this.toDoService.deleteToDoList(listId).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Error deleting list:', err);
      }
    });
  }
}
