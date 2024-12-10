import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection = 'users';

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  registerUser(user: { email: string; password: string;  }): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(user.email, user.password)).pipe(
      switchMap((cred) => {
        if (cred.user) {
          const userData = {
            email: user.email,
            createdAt: new Date()
          };
          return this.createUserDocument(cred.user.uid, userData);
        }
        return of(null); 
      }),
      catchError((error) => {
        console.error('Error during user registration:', error);
        return of({ error });
      })
    );
  }
  


  loginUser(user: { email: string; password: string }): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(user.email, user.password)).pipe(
      catchError((error) => {
        console.error('Error during login:', error);
        return of({ error });
      })
    );
  }


  logout(): void {
    this.clearSessionData();
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }


  private clearSessionData(): void {
    localStorage.clear();
    sessionStorage.clear();
  }


  deleteUser(userId: string): Observable<any> {
    return from(this.firestore.collection(this.usersCollection).doc(userId).delete());
  }


  private createUserDocument(userId: string, userData: any): Observable<any> {
    return from(
      this.firestore.collection(this.usersCollection).doc(userId).set(userData)
    );
  }


  getUserProfile(userId: string): Observable<any> {
    return this.firestore.collection(this.usersCollection).doc(userId).valueChanges();
  }


  getCurrentUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => (user ? of(user.uid) : of(null)))
    );
  }

  updateUser(userId: string, updates: any): Observable<any> {
    return from(
      this.firestore.collection('users').doc(userId).update(updates)
    );
  }


  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(switchMap((user) => of(!!user)));
  }


  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }
}
