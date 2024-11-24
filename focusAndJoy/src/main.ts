import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment'; // Your Firebase config
import { AngularFireModule } from '@angular/fire/compat'; // Use compat for Firebase services
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Firestore service

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebase),  // Initialize Firebase
      AngularFirestoreModule                                    // Import Firestore
    ),
  ],
});
