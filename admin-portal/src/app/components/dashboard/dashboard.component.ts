import { Component, OnInit } from '@angular/core';
import { ApplicationService, Application } from '../../services/application.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalApplications = 0;
  totalRequests = 0;
  activeApplications = 0;

  requestDistributionChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
      ]
    }]
  };

  requestDistributionChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  monthlyRequestChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'API Requests',
      backgroundColor: 'rgba(54, 162, 235, 0.8)'
    }]
  };

  monthlyRequestChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.applicationService.getApplications().subscribe(applications => {
      this.totalApplications = applications.length;
      this.activeApplications = applications.filter(app => app.status === 'active').length;
      this.totalRequests = applications.reduce((sum, app) => sum + (app.requestCount || 0), 0);

      // Update pie chart data
      this.requestDistributionChartData.labels = applications.map(app => app.name);
      this.requestDistributionChartData.datasets[0].data = applications.map(app => app.requestCount || 0);

      // Update bar chart data (mock monthly data for now)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      this.monthlyRequestChartData.labels = months;
      this.monthlyRequestChartData.datasets[0].data = months.map(() => 
        Math.floor(Math.random() * 1000)
      );
    });
  }
}
