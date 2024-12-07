import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToDoLoggedIn } from '../../models/to-do.model';

@Component({
  selector: 'app-list-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.css']
})
export class ListModalComponent implements OnChanges {
  @Input() listToEdit: ToDoLoggedIn = { title: '', color: '#000000', tasks: [] };
  @Output() listUpdated = new EventEmitter<ToDoLoggedIn>();
  @Output() listCreated = new EventEmitter<{ title: string, color: string }>();
  @Output() close = new EventEmitter<void>();
  @Output() listDeleted = new EventEmitter<string>();

  newListTitle: string = '';
  selectedColor: string = '#FFFFFF';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listToEdit'] && this.listToEdit) {
      this.newListTitle = this.listToEdit.title;
      this.selectedColor = this.listToEdit.color; 
    }
  }

  saveList(): void {
    if (this.newListTitle.trim()) {
      if (this.listToEdit && this.listToEdit.title) {
        this.listToEdit.title = this.newListTitle;
        this.listToEdit.color = this.selectedColor;

        this.listUpdated.emit(this.listToEdit); 
        console.log('Updated List:', this.listToEdit);
      } else {
        const newList = { title: this.newListTitle, color: this.selectedColor, tasks: [] };
        this.listCreated.emit(newList); 
        console.log('New List:', newList);
      }
    }
    this.closeModal();
  }

  closeModal(): void {
    this.close.emit();
  }

  deleteList(): void {
    if (this.listToEdit && this.listToEdit.title) {
      this.listDeleted.emit(this.listToEdit.id);
      console.log('Deleted List ID:', this.listToEdit.id);
    }
    this.closeModal(); 
  }
}
