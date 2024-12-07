import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators'; // Make sure this is imported
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

  // Register user
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
  // Login user with email and password
  loginUser(user: { email: string, password: string }): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(user.email, user.password)).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  private clearSessionData(): void {
    // Clear localStorage and sessionStorage or any other session-related data
    localStorage.clear(); // or remove specific items if needed
    sessionStorage.clear();
    // Optionally, clear any user-specific data if necessary
    console.log("Session data cleared.");
  }
  // Log out the user
  logout(): void {
    this.clearSessionData();
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']); 
    });
  }
  // Delete user from Firestore
  deleteUser(userId: string): Observable<any> {
    return from(this.firestore.collection('users').doc(userId).delete());
  }

  // Store user data in Firestore
  createUserDocument(userId: string, userData: any): Observable<any> {
    return from(
      this.firestore.collection(this.usersCollection).doc(userId).set(userData)
    );
  }
  // Get current user data from Firestore
  getUserProfile(userId: string): Observable<any> {
    return this.firestore.collection(this.usersCollection).doc(userId).valueChanges();
  }

  // Get currently authenticated user ID
  getCurrentUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          console.log("Logged in user:", user.uid);
          return of(user.uid);  // Return the updated UID if the user is logged in
        } else {
          console.log("No user logged in (authState is null).");
          return of(null);  // Return null if there's no logged-in user
        }
      })
    );
  }

  // Update user data in Firestore 
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
