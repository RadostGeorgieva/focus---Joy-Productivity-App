import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { query, where, DocumentReference,arrayUnion, getFirestore, collection, Timestamp, onSnapshot, getDocs, getDoc, addDoc, doc, updateDoc, deleteDoc, setDoc, CollectionReference } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { ToDoItem, ToDoList } from '../models/to-do.model';
import { Observable, from, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db;


  constructor() {
    const app = initializeApp(environment.firebase);  // Initialize Firebase with config
    this.db = getFirestore(app);  // Get Firestore instance
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
      })

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
        })

        collectionSubject.next(data);
      });
    }
    return collectionSubject.asObservable();
  }

  async addDocument(collectionName: string, userId: string, data: any, trackerName: string) {
    try {

      const innerCollectionDataRef = collection(this.db, collectionName, userId, trackerName);
      const now = new Date();
      now.setHours(now.getHours() + 2);
      const documentId = `${trackerName}_${now.toISOString()}`;
      const dateToCheck = data.date;

      const q = query(innerCollectionDataRef, where("date", "==", dateToCheck));
      const querySnapshot = await getDocs(q);
      console.log("query:", querySnapshot);
      if (!querySnapshot.empty) {
        // If a matching document is found, merge the new data with the existing data
        querySnapshot.forEach(async (docSnapshot) => {
          const docId = docSnapshot.id; // Use the existing document's ID
          const existingData = docSnapshot.data(); // Get existing data
  
          // Merge the existing data with the new data
          const mergedData = {
            ...existingData,
            ...data, // New data overwrites fields if they exist
          };
          console.log("new data:", data);
          console.log("existing data:", existingData);
          console.log("merged data:", mergedData);
          
          await setDoc(doc(innerCollectionDataRef, docId), mergedData);
          console.log("Document updated with merged data:", mergedData);
        });
      } else {
        // If no matching document is found, create a new one
        const now = new Date();
        now.setHours(now.getHours() + 2);
        const documentId = `${trackerName}_${now.toISOString()}`;
  
        await setDoc(doc(innerCollectionDataRef, documentId), {
          ...data,
        });
        console.log("New document added successfully:", data);
      }
    } catch (error) {
      console.error("Error adding or merging document:", error);
    }
  }

  async addItemToList(collectionName: string, docId: string, item: any): Promise<void> {
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


  async updateDocument(collectionName: string,docId: string,index: string | number,updatedItem: any,innerCollection?: string
  ): Promise<void> {
    try {
      // Reference to the document, either in the main collection or an inner collection
      let documentRef: DocumentReference;
  
      if (innerCollection) {
        // Use the inner collection if specified
        documentRef = doc(this.db, collectionName, docId, innerCollection, `${index}`);
      } else {
        // Default to the main collection if no inner collection is specified
        documentRef = doc(this.db, collectionName, docId);
        console.log(documentRef);
      }

      // Fetch the document
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
