import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'progressBar',
  standalone: true
})
export class ProgressBarPipe implements PipeTransform {
  transform(loggedData: number, goalData: number): string {
    return `${Math.min(loggedData / goalData, 1) * 100}%`;
  }

}
