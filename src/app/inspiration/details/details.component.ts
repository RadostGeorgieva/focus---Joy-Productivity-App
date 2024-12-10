import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InspirationService } from '../../services/inspiration.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inspiration-details',
  templateUrl: './details.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  listId: string | null = null;
  list: any = null;
  showCommentInput: boolean = false;
  newComment: string = '';
  loggedUserID: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private inspirationService: InspirationService
  ) { }

  ngOnInit(): void {

    this.listId = this.route.snapshot.paramMap.get('id');
    this.inspirationService.getUID().then((uid) => {
      this.loggedUserID = uid;
      }) 

    if (this.listId) {
      this.fetchListDetails(this.listId);
    }
  }

  async fetchListDetails(id: string): Promise<void> {
    try {
      this.list = await this.inspirationService.getListById(id);
    } catch (err) {
      console.error('Error fetching list details:', err);
    }
  }

  addComment(): void {
    if (this.newComment.trim()) {
      this.list.metadata?.comments.push(this.newComment);
      this.newComment = '';
      this.showCommentInput = false;
    }
    this.inspirationService.editList(this.list)
      .then(() => {
        console.log('List updated successfully.');
      })
      .catch((err) => {
        console.error('Error updating list:', err);
      });
  }
}
