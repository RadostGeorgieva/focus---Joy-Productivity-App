import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators'; // Make sure this is imported
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

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
  registerUser(user: { email: string, password: string}): Observable<any> {
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
  loginUser(user: { email: string, password: string}): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(user.email, user.password)).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  // Logout user
  logoutUser(): Observable<any> {
    return from(this.afAuth.signOut());;
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

  // Update user data in Firestore (e.g., profile information)
  updateUser(userId: string, updates: any): Observable<any> {
    return from(
      this.firestore.collection(this.usersCollection).doc(userId).update(updates)
    );
  }
}
