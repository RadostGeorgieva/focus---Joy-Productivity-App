import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { query, where, DocumentReference, arrayUnion, getFirestore, collection, Timestamp, onSnapshot, getDocs, getDoc, addDoc, doc, updateDoc, deleteDoc, setDoc, CollectionReference } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { ToDoLoggedIn } from '../models/to-do.model';
import { CaloriesData } from '../models/calories-data.model';
import { StepsData } from '../models/stepsData.model';
import { WaterData } from '../models/waterData.model';
import { SleepData } from '../models/sleep-data.model';
import { ToDoList } from '../models/to-do.model';

type Item = CaloriesData | ToDoLoggedIn | StepsData | WaterData | SleepData;

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db;

  constructor() {
    const app = initializeApp(environment.firebase);
    this.db = getFirestore(app);
  }

  // Type Guard to check for 'id' in data
  private hasId(data: any): data is { id: string } {
    return (data as { id: string }).id !== undefined;
  }

  //ONLY FOR TODO!
  listenToToDoCollection(collectionName: string): Observable<any[]> {
    const collectionSubject = new BehaviorSubject<any[]>([]);

    const collectionRef = collection(this.db, collectionName);
    onSnapshot(collectionRef, (querySnapshot) => {
      const data: any[] = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        if (collectionName === "to-do-lists") {
          return {
            id: doc.id,
            collection: docData['collection'],
            items: docData['items'] || [],
            createdAt: docData['createdAt'] ? docData['createdAt'].toDate().toISOString() : '',
          };
        }
        else {
          return null
        }
      });

      collectionSubject.next(data);
    });

    return collectionSubject.asObservable();
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

  async addDocument(collectionName: string, userId: string, data: Item, trackerName: string) {
    try {
      const innerCollectionDataRef = collection(this.db, collectionName, userId, trackerName);
      let q: any;
      let docId: string;

      const hasTitle = (data: any): data is ToDoLoggedIn => {
        return (data as ToDoLoggedIn).title !== undefined;
      };

      const hasDate = (data: any): data is { date: Date } => {
        return (data as { date: Date }).date !== undefined;
      };

      if (trackerName === "ToDoListsData" && hasTitle(data)) {
        q = query(innerCollectionDataRef, where("title", "==", data.title));
        console.log("Query title:", data.title);
      } else if (hasDate(data)) {
        const now = new Date();
        now.setHours(now.getHours() + 2);
        const dateToCheck = data.date;
        dateToCheck.setHours(0, 0, 0, 0);
        q = query(innerCollectionDataRef, where("date", "==", dateToCheck));
        console.log("Query date:", dateToCheck);
      } else {
        throw new Error('Data does not contain title or date for query');
      }

      const querySnapshot = await getDocs(q);
      console.log("Query snapshot:", querySnapshot);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          const docId = docSnapshot.id; 
          console.log("Document ID:", docId);

          const existingData = docSnapshot.data();
          console.log("existingData:", existingData);

          if (existingData && typeof existingData === 'object' && data && typeof data === 'object') {

            const mergedData = { ...existingData, ...data };
            delete mergedData.id; 

            await setDoc(doc(innerCollectionDataRef, docId), mergedData);
            console.log("Document updated with merged data:", mergedData);
          } else {
            console.error("Failed to merge non-object data:", { existingData, data });
          }
        });
      } else {
        const now = new Date();
        now.setHours(now.getHours() + 2);
        const documentId = `${trackerName}_${now.toISOString()}`;

        if (data && typeof data === 'object') {
          await setDoc(doc(innerCollectionDataRef, documentId), data);
          console.log("New document added successfully:", data);
        } else {
          console.error("Data is not an object:", data);
        }
      }
    } catch (error) {
      console.error("Error adding or merging document:", error);
    }
  }

  async addItemToList(collectionName: string, docId: string, item: ToDoList): Promise<void> {
    try {
      console.log('Adding item:', { collectionName, docId, item });
      const documentRef = doc(this.db, collectionName, docId);
      await updateDoc(documentRef, {
        items: arrayUnion(item),
      });

      console.log('Item added to the list successfully');
    } catch (error) {
      console.error('Error adding item:', error);
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
        console.log(documentRef);
      }

      const currentDoc = await getDoc(documentRef);

      if (!currentDoc.exists()) {
        console.error("Document does not exist!");
        return;
      } else {
        const currentData = currentDoc.data();
        console.log(currentData);

        await setDoc(documentRef, updatedItem);
        console.log("Document updated successfully.");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  async deleteDocument(collectionName: string, docId: string) {
    try {
      const documentRef = doc(this.db, collectionName, docId);
      await deleteDoc(documentRef);
      console.log('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  async deleteToDoItem(collectionName: string, docId: string, itemIndex: number): Promise<void> {
    try {
      const documentRef = doc(this.db, collectionName, docId);

      const currentDoc = await getDoc(documentRef);

      if (!currentDoc.exists()) {
        console.error('Document does not exist!');
        return;
      }

      const currentData = currentDoc.data();
      const items = currentData['items'] || [];

      if (itemIndex < 0 || itemIndex >= items.length) {
        console.error('Invalid item index');
        return;
      }

      items.splice(itemIndex, 1);

      await updateDoc(documentRef, { items });
      console.log(`Item at index ${itemIndex} deleted successfully`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
}
