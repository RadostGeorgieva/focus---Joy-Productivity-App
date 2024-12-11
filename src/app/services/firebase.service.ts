import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { DocumentReference, arrayUnion, getFirestore, collection, Timestamp, onSnapshot, getDocs, getDoc, addDoc, doc, updateDoc, deleteDoc, setDoc, CollectionReference } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { ToDoLoggedIn, ToDoList } from '../models/to-do.model';
import { CaloriesData } from '../models/calories-data.model';
import { StepsData } from '../models/stepsData.model';
import { WaterData } from '../models/waterData.model';
import { SleepData } from '../models/sleep-data.model';
import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { v4 as uuidv4 } from 'uuid';


type Item = CaloriesData | ToDoLoggedIn | StepsData | WaterData | SleepData;

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db;

  constructor(private afAuth: AngularFireAuth,
    private userService: UserService,) {
    const app = initializeApp(environment.firebase);
    this.db = getFirestore(app);
  }


  private hasId(data: any): data is { id: string } {
    return (data as { id: string }).id !== undefined;
  }


  getSharedCollection(collectionName: string): Observable<any[]> {
    const collectionSubject = new BehaviorSubject<any[]>([]);

    const collectionRef = collection(this.db, collectionName);
    onSnapshot(collectionRef, (querySnapshot) => {
      const data: any[] = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          data: docData,
        };
      });

      collectionSubject.next(data);
    });

    return collectionSubject.asObservable();
  }
  async getSharedDocument(collectionName: string, listId: string): Promise<any> {
    try {

      const collectionRef = collection(this.db, collectionName);
      const documentRef = doc(collectionRef, listId);
      const currentDoc = await getDoc(documentRef);
      if (currentDoc.exists()) {
        return currentDoc.data();
      } else {
        console.error('No document found with the given ID.');
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async postSharedCollection(collectionName: string, internalCollection: string, data: any): Promise<void> {
    try {
      const documentId = data.id || this.createId(data, internalCollection);

      if (!documentId) {
        throw new Error('Failed to generate documentId');
      }
      const collectionRef = collection(this.db, collectionName);
      const documentRef = doc(collectionRef, documentId);
      const currentDoc = await getDoc(documentRef);

      if (currentDoc.exists()) {
        const existingData = currentDoc.data();
        const mergedData = { ...existingData, ...data };
        await setDoc(documentRef, mergedData);
      } else {
        await setDoc(documentRef, data);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }
  listenToCollection(collectionName: string, uid: string | null, internalCollection: string): Observable<any[]> {
    const collectionSubject = new BehaviorSubject<any[]>([]);

    if (uid) {
      const userRef = doc(this.db, collectionName, uid);
      const otherCollectionRef = collection(userRef, internalCollection);
      onSnapshot(otherCollectionRef, (querySnapshot) => {
        const data: any[] = querySnapshot.docs.map(doc => {
          const docData = doc.data();
          return {
            id: doc.id,
            data: docData,
          };
        });

        collectionSubject.next(data);
      });
    }
    return collectionSubject.asObservable();
  }


  createId(data: Item, trackerName: string) {

    let documentId: string;

    if ('date' in data) {

      const dateWithoutTime = new Date(data.date.setHours(0, 0, 0, 0));
      const dateString = dateWithoutTime.toISOString().split('T')[0];
      documentId = `${trackerName}_${dateString}`;
      return documentId;

    } else if ('tasks' in data && 'title' in data) {
      documentId = `${data.title}_${uuidv4()}`;
      return documentId;

    }
    return;

  }
  async addOrUpdateInernalData(collectionName: string, userId: string, data: Item, trackerName: string): Promise<void> {
    try {
      const documentId = data.id || this.createId(data, trackerName);

      if (!documentId) {
        throw new Error('Failed to generate documentId');
      }

      const documentRef = doc(this.db, 'UsersData', userId, trackerName, documentId);

      const currentDoc = await getDoc(documentRef);


      if (currentDoc.exists()) {
        const existingData = currentDoc.data();
        const mergedData = { ...existingData, ...data };

        await setDoc(documentRef, mergedData)
      } else {
        await setDoc(documentRef, data)
      }
    } catch (error) {
      console.error("Error updateing data:", error);

    };
  }
  async addOrUpdateData(
    collectionName: string,
    userId: string,
    data: Item,
    trackerName: string
  ): Promise<void> {
    try {
      const currentUser = await this.afAuth.currentUser;
      if (!currentUser) {
        console.error("User not authenticated!");
        throw new Error("User not authenticated!");
      }
  
      const documentId = data.id || this.createId(data, trackerName);
      const usersCollection = collection(this.db, collectionName);
      const internalCollection =  collection(usersCollection, userId, trackerName);
      const documentRef = doc(internalCollection, documentId);
      const docSnapshot = await getDoc(documentRef);

      if (docSnapshot.exists()) {
        // Merge existing data
        const existingData = docSnapshot.data();
        const mergedData = { ...existingData, ...data };
  
        await setDoc(documentRef, mergedData);
        console.log("Document updated with merged data:", mergedData);
      } else {
        // Add a new document
        await setDoc(documentRef, data);
        console.log("New document added successfully:", data);
      }
    } catch (error) {
      console.error("Error in addOrUpdateData:", error);
      throw error;
    }
  }

  async updateDocument(collectionName: string, docId: string, index: string | number, updatedItem: any, innerCollection?: string
  ): Promise<void> {
    try {
      let documentRef: DocumentReference;

      if (innerCollection) {
        documentRef = doc(this.db, collectionName, docId, innerCollection, `${index}`);
      } else {
        documentRef = doc(this.db, collectionName, docId);
      }

      const currentDoc = await getDoc(documentRef);

      if (!currentDoc.exists()) {
        console.error("Document does not exist!");
        return;
      } else {
        const currentData = currentDoc.data();
        await setDoc(documentRef, updatedItem);
;
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  async deleteDocument(collectionName: string, docId: string) {

    try {
      const documentRef = doc(this.db, collectionName, docId);


      await deleteDoc(documentRef);

    } catch (error) {

    }
  }
  async delete(collectionName: string, userId: string, docId: string, trackerName: string) {

    try {
      let documentRef: DocumentReference;

      if (trackerName) {
        documentRef = doc(this.db, collectionName, userId, trackerName, docId);
      } else {
        documentRef = doc(this.db, collectionName, docId);
      }


      await deleteDoc(documentRef);

    } catch (error) {

    }
  }

}
// addDocument(collectionName: string, userId: string, data: Item, trackerName: string): Promise<void> {

  //   return new Promise<void>((resolve, reject) => {
  //     this.afAuth.currentUser
  //       .then((currentUser) => {
  //         if (!currentUser) {
  //           console.error('User not authenticated!');
  //           reject('User not authenticated!');
  //           return;
  //         }

  //         if (currentUser.uid !== userId) {
  //           console.error('Unauthorized attempt to add data to another user’s document.');
  //           reject('Unauthorized access!');
  //           return;
  //         }

  //         if (!userId) {
  //           console.error('No user is logged in, cannot proceed with adding data');
  //           reject('No user logged in');
  //           return;
  //         }

  //         console.log('User ID:', userId);
  //         const innerCollectionDataRef = collection(this.db, collectionName, userId, trackerName);

  //         // Generate a unique ID for the document instead of using userId
  //         const docRef = doc(innerCollectionDataRef);

  //         getDoc(docRef)
  //           .then((docSnapshot) => {
  //             if (docSnapshot.exists()) {
  //               const existingData = docSnapshot.data();
  //               const mergedData = { ...existingData, ...data };

  //               setDoc(docRef, mergedData)
  //                 .then(() => {
  //                   console.log("Document updated with merged data (via custom ID):", mergedData);
  //                   resolve();
  //                 })
  //                 .catch((error) => {
  //                   console.error("Error updating document:", error);
  //                   reject(error);
  //                 });
  //             } else {
  //               setDoc(docRef, data)
  //                 .then(() => {
  //                   console.log("New document added successfully:", data);
  //                   resolve();
  //                 })
  //                 .catch((error) => {
  //                   console.error("Error adding document:", error);
  //                   reject(error);
  //                 });
  //             }
  //           })
  //           .catch((error) => {
  //             console.error("Error getting document:", error);
  //             reject(error);
  //           });
  //       })
  //       .catch((error) => {
  //         console.error("Error getting current user:", error);
  //         reject(error);
  //       });
  //   });
  // }
  // async addItemToList(collectionName: string, docId: string, item: ToDoList): Promise<void> {
  //   try {
  //     const documentRef = doc(this.db, collectionName, docId);
  //     await updateDoc(documentRef, {
  //       items: arrayUnion(item),
  //     });
  //   } catch (error) {
  //     console.error('Error adding item:', error);
  //   }
  // }
