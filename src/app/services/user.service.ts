import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection = 'users';

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }


  registerUser(user: { email: string, password: string }): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(user.email, user.password)).pipe(
      catchError((error) => {
        throw error;
      }),
      switchMap(() => this.afAuth.currentUser),
      switchMap((user) => {
        if (user) {

          this.router.navigate(['/home']);
        }
        return [];
      })
    );
  }

  loginUser(user: { email: string, password: string }): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(user.email, user.password)).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  private clearSessionData(): void {

    localStorage.clear(); 
    sessionStorage.clear();

  }

  logout(): void {
    this.clearSessionData();
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']); 
    });
  }

  deleteUser(userId: string): Observable<any> {
    return from(this.firestore.collection('users').doc(userId).delete());
  }

  
  createUserDocument(userId: string, userData: any): Observable<any> {
    return from(
      this.firestore.collection(this.usersCollection).doc(userId).set(userData)
    );
  }
 
  getUserProfile(userId: string): Observable<any> {
    return this.firestore.collection(this.usersCollection).doc(userId).valueChanges();
  }


  getCurrentUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return of(user.uid); 
        } else {
          return of(null);  
        }
      })
    );
  }


  updateUser(userId: string, updates: any): Observable<any> {
    return from(
      this.firestore.collection(this.usersCollection).doc(userId).update(updates)
    );
  }


  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      switchMap((user) => of(!!user))
    );
  }


  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }

}
