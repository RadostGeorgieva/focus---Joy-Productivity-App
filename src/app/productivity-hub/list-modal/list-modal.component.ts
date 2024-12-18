import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToDoLoggedIn } from '../../models/to-do.model';
import { InspirationService } from '../../services/inspiration.service';

@Component({
  selector: 'app-list-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.css']
})
export class ListModalComponent implements OnChanges {
  @Input() listToEdit: ToDoLoggedIn = { title: '', color: '#87337E', tasks: [] };
  @Output() listUpdated = new EventEmitter<ToDoLoggedIn>();
  @Output() listCreated = new EventEmitter<{ title: string, color: string }>();
  @Output() close = new EventEmitter<void>();
  @Output() listDeleted = new EventEmitter<string>();

  newListTitle: string = '';
  selectedColor: string = '#87337E';
  isShared: boolean = false;

  constructor(private inspirationService: InspirationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listToEdit'] && this.listToEdit) {
      this.newListTitle = this.listToEdit.title;
      this.selectedColor = this.listToEdit.color;
      this.isShared = this.listToEdit.metadata?.shared || false;
    }
  }
  private shareList(list: ToDoLoggedIn): void {
    this.inspirationService.addList(list)
      .then(() => {
        console.log('List shared successfully:', list);
      })
      .catch(err => {
        console.error('Error sharing list:', err);
      });
  }

  saveList(): void {
    if (this.newListTitle.trim()) {
      if (this.listToEdit && this.listToEdit.title) {
        this.listToEdit.title = this.newListTitle;
        this.listToEdit.color = this.selectedColor;
        this.listToEdit.metadata = { ...this.listToEdit.metadata, shared: this.isShared };

        this.listUpdated.emit(this.listToEdit);
        if (this.isShared) {
          this.shareList(this.listToEdit as ToDoLoggedIn);
        }
      } else {
        const newList = { title: this.newListTitle, color: this.selectedColor, tasks: [] };
        this.listCreated.emit(newList);
        if (this.isShared) {
          this.shareList(newList as ToDoLoggedIn);
        }
      }
    }
  
    this.closeModal();
  }

closeModal(): void {
  this.close.emit();
}

deleteList(): void {
  if(this.listToEdit && this.listToEdit.title) {
  this.listDeleted.emit(this.listToEdit.id);
}
this.closeModal(); 
  }

toggleShareList(): void {
  this.isShared = !this.isShared;
}
}
