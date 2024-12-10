import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WaterService } from './water.service';
import { StepsService } from './steps.service';
import { CaloriesService } from './calories.service';

@Injectable({
  providedIn: 'root',
})
export class performanceService {
  constructor(private waterService: WaterService,
              private stepService: StepsService,
              private caloriesService: CaloriesService,

  ) { }

  getWaterData(): Observable<any> {
    return this.waterService.getCollectionData().pipe(
      map((waterData) => {
        console.log('Received water data:', waterData);

        if (!waterData || waterData.length === 0) {
          console.log('No water data available.');
          return {};
        }

        const waterLabels = waterData.map((item) => {
          if (item.data && item.data.date && item.data.date.seconds) {
            return new Date(item.data.date.seconds * 1000).toLocaleDateString();
          } else {
            return '';
          }
        });
        const loggedWater = waterData.map((item) => item.data.loggedWater);
        const goalWater = waterData.map((item) => item.data.goalWater);

        console.log('Transformed water data:', {
          water: {
            labels: waterLabels,
            loggedWater: loggedWater,
            goalWater: goalWater,
          },
        });

        return {
          water: {
            labels: waterLabels,
            loggedWater: loggedWater,
            goalWater: goalWater,
          },
        };
      }),
      catchError((error) => {
        console.error('Error in performance service:', error);
        return of({ water: { labels: [], loggedWater: [], goalWater: [] } });
      })
    );
  }

  getStepsData(): Observable<any> {
    return this.stepService.getCollectionData().pipe(
      map((stepsData) => {
        console.log('Received steps data:', stepsData);

        if (!stepsData || stepsData.length === 0) {
          console.log('No water data available.');
          return {};
        }

        const stepsLabels = stepsData.map((item) => {
          if (item.data && item.data.date && item.data.date.seconds) {
            return new Date(item.data.date.seconds * 1000).toLocaleDateString();
          } else {
            return '';
          }
        });
        const loggedSteps = stepsData.map((item) => item.data.loggedSteps);
        const goalSteps = stepsData.map((item) => item.data.goalSteps);

        console.log('Transformed steps data:', {
          steps: {
            labels: stepsLabels,
            loggedSteps: loggedSteps,
            goalSteps: goalSteps,
          },
        });

        return {
          steps: {
            labels: stepsLabels,
            loggedSteps: loggedSteps,
            goalSteps: goalSteps,
          },
        };
      }),
      catchError((error) => {
        console.error('Error in performance service:', error);
        return of({ steps: { labels: [], loggedSteps: [], goalSteps: [] } });
      })
    );
  }

  getCaloriesData(): Observable<any> {
    return this.caloriesService.getCollectionData().pipe(
      map((caloriesData) => {
        console.log('Received calories data:', caloriesData);

        if (!caloriesData || caloriesData.length === 0) {
          console.log('No calories data available.');
          return {};
        }

        const caloriesLabels = caloriesData.map((item) => {
          if (item.data && item.data.date && item.data.date.seconds) {
            return new Date(item.data.date.seconds * 1000).toLocaleDateString();
          } else {
            return '';
          }
        });
        const loggedCalories = caloriesData.map((item) => item.data.loggedCalories);
        const goalCalories = caloriesData.map((item) => item.data.goalCalories);

        console.log('Transformed calories data:', {
          calories: {
            labels: caloriesLabels,
            loggedCalories: loggedCalories,
            goalCalories: goalCalories,
          },
        });

        return {
          water: {
            labels: caloriesLabels,
            loggedCalories: loggedCalories,
            goalCalories: goalCalories,
          },
        };
      }),
      catchError((error) => {
        console.error('Error in performance service:', error);
        return of({ calories: { labels: [], loggedCalories: [], goalCalories: [] } });
      })
    );
  }

}
