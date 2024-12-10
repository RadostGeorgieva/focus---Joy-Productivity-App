import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { performanceService } from '../services/performance.service';


@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent implements OnInit {
  waterChart: any;
  stepsChart: any;
  caloriesChart: any;

  constructor(private performanceService: performanceService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
  
    this.performanceService.getWaterData().subscribe(data => {
      const waterData = data?.water;
      if (waterData && waterData.labels && waterData.loggedWater && waterData.goalWater) {
        console.log("waterData", waterData);
        this.createWaterChart(waterData.labels, waterData.loggedWater, waterData.goalWater);
      } else {
        console.error('Invalid water data received', data);
      }
    });
  
    this.performanceService.getStepsData().subscribe(data => {
      const stepsData = data?.steps;
      if (stepsData && stepsData.labels && stepsData.loggedSteps && stepsData.goalSteps) {
        console.log("stepsData", stepsData);
        this.createStepsChart(stepsData.labels, stepsData.loggedSteps, stepsData.goalSteps);
      } else {
        console.error('Invalid steps data received', data);
      }
    });
  
    this.performanceService.getCaloriesData().subscribe(data => {
      const caloriesData = data?.calories;
      if (caloriesData && caloriesData.labels && caloriesData.loggedCalories && caloriesData.goalCalories) {
        console.log("caloriesData", caloriesData);
        this.createCaloriesChart(caloriesData.labels, caloriesData.loggedCalories, caloriesData.goalCalories);
      } else {
        console.error('Invalid calories data received', data);
      }
    });
  }
  


  createWaterChart(labels: string[], loggedWater: number[], goalWater: number[]): void {
    this.waterChart = new Chart('waterChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Logged Water (ml)',
          data: loggedWater,
          borderColor: '#ffff',
          backgroundColor: 'rgba(255, 254, 255,0.3)',
          fill: true,
          tension: 0.4,
        }, {
          label: 'Goal Water (ml)',
          data: goalWater,
          borderColor: '#7440E2',
          backgroundColor: 'rgba(255, 254, 255,0.3)',
          fill: false,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 10,
              padding: 15,
              usePointStyle: true,
              color: '#ffffff', // White text for legend
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#333',
            bodyColor: '#fff', // White text for tooltip
            titleColor: '#fff', // White title for tooltip
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 500,
              font: {
                size: 12,
                family: 'Arial',
              },
              color: '#ffffff', // White text for y-axis ticks
            },
            grid: {
              display: false, // Hide grid lines
            },
          },
          x: {
            ticks: {
              font: {
                size: 12,
                family: 'Arial',
              },
              color: '#ffffff', // White text for x-axis ticks
            },
            grid: {
              display: false, // Hide grid lines
            },
          }
        }
      }
    });
  }
  
  createStepsChart(labels: string[], loggedSteps: number[], goalSteps: number[]): void {
    this.stepsChart = new Chart('stepschart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Logged Steps',
          data: loggedSteps,
          borderColor: '#ffff',
          backgroundColor: 'rgba(255, 254, 255,0.3)',
          fill: true,
          tension: 0.4,
        }, {
          label: 'Goal Steps',
          data: goalSteps,
          borderColor: '#7440E2',
          backgroundColor: 'rgba(255, 254, 255,0.3)',
          fill: false,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 10,
              padding: 15,
              usePointStyle: true,
              color: '#ffffff',
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#333',
            bodyColor: '#fff',
            titleColor: '#fff',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 500,
              font: {
                size: 12,
                family: 'Arial',
              },
              color: '#ffffff',
            },
            grid: {
              display: false, 
            },
          },
          x: {
            ticks: {
              font: {
                size: 12,
                family: 'Arial',
              },
              color: '#ffffff',
            },
            grid: {
              display: false,
            },
          }
        }
      }
    });
  }
  createCaloriesChart(labels: string[], loggedCalories: number[], goalCalories: number[]): void {
    this.caloriesChart = new Chart('caloriesChart', {
      type: 'bar', // Change to 'bar' for a column chart
      data: {
        labels: labels,
        datasets: [{
          label: 'Logged Calories',
          data: loggedCalories,
          backgroundColor: 'rgba(255, 254, 255, 0.8)',
          borderColor: '#ffff',
          borderWidth: 1,
        }, {
          label: 'Goal Calories',
          data: goalCalories,
          backgroundColor: 'rgba(122, 60, 193, 0.7)',
          borderColor: '#7A3CC1',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 10,
              padding: 15,
              usePointStyle: true,
              color: '#ffffff',
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#333',
            bodyColor: '#fff',
            titleColor: '#fff',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 2000,
              font: {
                size: 12,
                family: 'Arial',
              },
              color: '#ffffff',
            },
            grid: {
              display: false,
            },
          },
          x: {
            ticks: {
              font: {
                size: 12,
                family: 'Arial',
              },
              color: '#ffffff',
            },
            grid: {
              display: false,
            },
          }
        }
      }
    });
  }
  
}  