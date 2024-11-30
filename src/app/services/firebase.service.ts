import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { arrayUnion, getFirestore, collection, onSnapshot, getDocs,getDoc, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
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

  // Real-time data listener for Firestore collection
  listenToCollection(collectionName: string): Observable<ToDoList[]> {
    const toDoListSubject = new BehaviorSubject<ToDoList[]>([]);
    const collectionRef = collection(this.db, collectionName);

    onSnapshot(collectionRef, (querySnapshot) => {
      const data: ToDoList[] = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id, // Firestore document ID
          collection: docData['collection'], // Assuming a collection field in your Firestore data
          items: docData['items'] || [], 
          createdAt: docData['createdAt'] ? docData['createdAt'].toDate().toISOString() : '', // Convert Timestamp to string
        };
      });
      toDoListSubject.next(data); // Emit updated data to BehaviorSubject
    });

    return toDoListSubject.asObservable(); // Return observable
  }

  // Adding a new document to the collection
  async addDocument(collectionName: string, data: ToDoList){
    try {
      await addDoc(collection(this.db, collectionName), data);

      console.log('Document added successfully');
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }
  // Adding a new item to an existing to-do list
  async addItemToList(collectionName: string, docId: string, toDoItem: string): Promise<void> {
    try {
      console.log('Adding item:', { collectionName, docId, toDoItem });
      const documentRef = doc(this.db, collectionName, docId); // Get reference to the existing to-do list
      await updateDoc(documentRef, {
        items: arrayUnion(toDoItem), // Add the new item to the 'items' array in Firestore
      });
  
      console.log('Item added to the list successfully');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  // Updating an existing document in the collection by docId
  async updateDocument(collectionName: string, docId: string, index:number, updatedItem: string) {
    try {
      const documentRef = doc(this.db, collectionName, docId);

      const currentDoc = await getDoc(documentRef);

      if(!currentDoc.exists()) {
        console.error("Document does not exist!");
        return
      }
        const currentData = currentDoc.data();
        const items = currentData['items'] || [];
        items[index] = updatedItem;
      await updateDoc(documentRef, {
        items: items ,
      });
      console.log('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }

//delete entire LIST!
async deleteDocument(collectionName: string, docId: string) {
  try {
    const documentRef = doc(this.db, collectionName, docId);
    await deleteDoc(documentRef);
    console.log('Document deleted successfully');
  } catch (error) {
    console.error('Error deleting document:', error);
  }
}

//delete item only
async deleteToDoItem(collectionName: string, docId: string, itemIndex: number): Promise<void> {
  try {
    const documentRef = doc(this.db, collectionName, docId);

    // Get the current document data
    const currentDoc = await getDoc(documentRef);

    if (!currentDoc.exists()) {
      console.error('Document does not exist!');
      return;
    }

    // Extract current items
    const currentData = currentDoc.data();
    const items = currentData['items'] || [];

    if (itemIndex < 0 || itemIndex >= items.length) {
      console.error('Invalid item index');
      return;
    }

    // Remove the item at the specified index
    items.splice(itemIndex, 1);

    // Update Firestore with the modified items array
    await updateDoc(documentRef, { items });
    console.log(`Item at index ${itemIndex} deleted successfully`);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}
}
