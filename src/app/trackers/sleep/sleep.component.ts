import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SleepService } from '../../services/sleep-data.service';

@Component({
  selector: 'app-sleep',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sleep.component.html',
  styleUrl: './sleep.component.css'
})

export class SleepComponent implements OnInit{

  sleepData: any[] = []
  selectedDate: Date = new Date()
  dreams: string = "";
  sleepQuality: number = 0;
  hours : number = 0;

constructor(private sleepService: SleepService) { }

ngOnInit(): void {
  this.sleepService.getCollectionData().subscribe((data) => {
    this.sleepData = data;
    console.log(data[0].id);
    
  });
  this.sleepService.fetchData();
}
  saveSleepData(id: string, sleepQuality: number, dreams: string) {
    this.dreams = dreams;
    this.sleepQuality = sleepQuality;
    console.log(this.dreams, this.sleepQuality, this.hours);
    
    this.sleepService.addSleepData(this.selectedDate, this.dreams, this.hours, this.sleepQuality)
  }
  hoursSlept(event: MouseEvent) {

    const currentElement = event.target as HTMLElement;
    const hours: string | null = currentElement.getAttribute('data-hour');
    this.hours = Number(hours);
    this.resetColor(Number(hours), currentElement);
    let previousElement = currentElement.previousElementSibling;

    currentElement.style.backgroundColor = 'blue';
    while (previousElement) {
      let item = previousElement as HTMLElement
      item.style.backgroundColor = 'blue';
      previousElement = previousElement.previousElementSibling;
    }
  }

  resetColor(hours: number, currentElement: HTMLElement) {

    for (let i = 1; i <= 17; i++) {
      const parentElement = currentElement.closest('.day');
      if (parentElement) {
        Array.from(parentElement.children).forEach((child, index) => {
          const circle = child as HTMLElement;
          circle.style.backgroundColor = '#ADD8E6';
        });
      }
    }
  }
}