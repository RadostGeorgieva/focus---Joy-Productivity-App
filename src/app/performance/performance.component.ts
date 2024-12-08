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

  constructor(private performanceService: performanceService) { }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.performanceService.getWaterData().subscribe(data => {
      const waterData = data.water;
      console.log("waterData", waterData);

      this.createWaterChart(waterData.labels, waterData.loggedWater, waterData.goalWater);
    })
    this.performanceService.getStepsData().subscribe(data => {
      const stepsData = data.steps;
      console.log("stepsData", stepsData);
      this.createStepsChart(stepsData.labels, stepsData.loggedSteps, stepsData.goalSteps);
    })

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
    this.stepsChart = new Chart('stepsChart', {
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
          borderColor: '#7A3CC1',
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
              stepSize: 2000,
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
}  