import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable, firstValueFrom } from 'rxjs';
import { switchMap, take, map,tap } from 'rxjs/operators';
import { ToDoLoggedIn } from '../models/to-do.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class InspirationService {

  constructor(private firebaseService: FirebaseService,
             private userService: UserService,
  ) {}

  async getUID(): Promise<string | null> {
    try {
      const userId = await firstValueFrom(this.userService.getCurrentUserId());
      return userId;
    } catch (error) {
      console.error("error",error);
      return null;
    }
  }
  
  getSharedLists(): Observable<any[]> {
    const lists = this.firebaseService.getSharedCollection('Shared')
    return lists;
  }
  async addList(list:ToDoLoggedIn): Promise<void> {
    this.userService.getCurrentUserId().subscribe({
      next: (uid) => {
        if (uid){
            const ListData:ToDoLoggedIn = {
                ...list,
                user:uid,
                metadata: {
                    shared: list.metadata?.shared || false,
                    likesCount: 0, 
                    likedBy:[], 
                    dislikesCount: 0,
                    comments: [],
                  },
                }
          this.firebaseService.postSharedCollection('Shared','lists', ListData)
        }
        return;
      },
    });
  }

  async editList(list:ToDoLoggedIn): Promise<void> {
    this.userService.getCurrentUserId().subscribe({
      next: (uid) => {
        if (uid){
          this.firebaseService.postSharedCollection('Shared','lists', list)
          console.log("editing..",list);
          
        }
        return;
      },
    });
  }
  async getListById(id: string): Promise<any> {
    try {
      const list = await this.firebaseService.getSharedDocument('Shared',id);
      return list;
    } catch (error) {
      console.error('Error fetching list by ID:', error);
      throw error;
    }
  }
}
