import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'focusAndJoy';
  items$: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    // Fetch data from Firestore collection
    this.items$ = firestore.collection('items').valueChanges();
  }
}
