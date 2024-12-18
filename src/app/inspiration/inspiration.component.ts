import { Component, OnInit } from '@angular/core';
import { InspirationService } from '../services/inspiration.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inspiration',
  templateUrl: './inspiration.component.html',
  imports: [RouterModule],
  standalone: true,
  styleUrls: ['./inspiration.component.css']
})
export class InspirationComponent implements OnInit {
  sharedLists: any[] = [];
  loggedUserID: string | null = null;
  likedByMe: boolean = false;

  constructor(
    private inspirationService: InspirationService,
  ) {}

  ngOnInit(): void {
    this.inspirationService.getUID().then((uid) => {
      this.loggedUserID = uid;
      
      this.inspirationService.getSharedLists().subscribe({
        next: (data) => {
          if (data) {
            this.sharedLists = data.map((e) => {
              const list = e.data;
              list.likedByMe = list.likedBy?.includes(this.loggedUserID);
              return list;
            });
          }
        },
        error: (err) => {
          console.log('Error fetching shared lists:', err);
        }
      });
    });
  }

  viewList(list: any): void {
    console.log('Viewing List:', list);
  }

  toggleLike(list: any): void {
    if (!this.loggedUserID) {
      console.error('User ID not available.');
      return;
    }

    const hasLiked = list.likedBy?.includes(this.loggedUserID);

    if (hasLiked) {
      list.metadata.likesCount = Math.max((list.metadata.likesCount || 1) - 1, 0);
      list.likedBy = list.likedBy.filter((id: string) => id !== this.loggedUserID);
      list.likedByMe = false;
    } else {
      list.metadata.likesCount = (list.metadata.likesCount || 0) + 1;
      list.likedBy = [...(list.likedBy || []), this.loggedUserID];
      list.likedByMe = true; 
    }

    this.inspirationService.editList(list)
      .then(() => {
        console.log('List updated successfully.');
      })
      .catch((err) => {
        console.error('Error updating list:', err);
      });
  }

  addComment(list: any): void {
    const commentText = list.newComment?.trim();

    if (!commentText) {
      console.error('Comment cannot be empty.');
      return;
    }

    const comment = {
      user: this.loggedUserID,
      text: commentText,
      timestamp: new Date().toISOString(),
    };

    list.comments = list.comments || [];
    list.comments.push(comment);

    this.inspirationService.editList(list)
      .then(() => {
        console.log('List updated successfully.');
      })
      .catch((err) => {
        console.error('Error updating list:', err);
      });
  }
}
