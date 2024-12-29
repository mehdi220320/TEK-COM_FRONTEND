import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartDataset, ChartOptions, ChartData, ChartType} from 'chart.js';
import {PostService} from "../../Services/post.service";
import { BaseChartDirective } from 'ng2-charts';  // Import this for chart updates
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;  // Access chart directive

  chartData: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Post Counts by Community',
        backgroundColor: ['#1cc88a', '#36b9cc', '#858796', '#1cc88a', 'orange', 'yellow'],
      }
    ]
  };

  chartType: ChartType = 'bar';
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: { color: 'black' }
      },
      y: {
        ticks: { color: 'black' }
      }
    },
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { enabled: true, backgroundColor: 'rgba(0, 0, 0, 0.7)' }
    }
  };

  topUsersChartData: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Top Users with Most Posts',
        backgroundColor: ['red', 'blue', 'green', 'purple', 'orange', 'yellow'],
      }
    ]
  };

  topUsersChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: { color: 'black' }
      },
      y: {
        ticks: { color: 'black' }
      }
    },
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { enabled: true, backgroundColor: 'rgba(0, 0, 0, 0.7)' }
    }
  };
  postCountsByYearChartData: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Post Counts by Year',
        backgroundColor: ['blue', 'orange', 'green', 'purple', 'yellow', 'red']
      }
    ]
  };

  postCountsByYearAndMonthChartData: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Post Counts by Year and Month',
        backgroundColor: ['teal', 'navy', 'pink', 'lime', 'brown', 'cyan']
      }
    ]
  };
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.fetchPostCounts();  // Fetch post counts by community
    this.fetchTopUsers();    // Fetch top users with the most posts
    this.fetchPostCountsByYear();
    this.fetchPostCountsByYearAndMonth();
  }

  fetchPostCounts(): void {
    this.postService.getPostCountsByCommunity().subscribe(
      (counts) => {
        // Convert the counts object to an array of [community, count] pairs
        const communityArray = Object.entries(counts);

        // Sort the array by count (post count) in descending order
        communityArray.sort((a, b) => b[1] - a[1]);

        // Get the top 10 communities (slice the first 10 entries)
        const topCommunities = communityArray.slice(0, 10);

        // Extract the communities and post counts into separate arrays
        const communities = topCommunities.map(entry => entry[0]);
        const postCounts = topCommunities.map(entry => entry[1]);

        console.log('Top 10 communities:', topCommunities);

        // Update chart labels and data
        this.chartData.labels = communities;
        this.chartData.datasets[0].data = postCounts;

        // Trigger chart update manually
        if (this.chart) {
          this.chart.update();
        }
      },
      (error) => {
        console.error('Error fetching post counts:', error);
      }
    );
  }

  fetchTopUsers(): void {
    this.postService.getTopUsersByPostCounts().subscribe(
      (userCounts) => {
        // Convert the userCounts object to an array of [user, count] pairs
        const userArray = Object.entries(userCounts);

        // Sort the array by count (post count) in descending order
        userArray.sort((a, b) => b[1] - a[1]);

        // Get the top 10 users (slice the first 10 entries)
        const topUsers = userArray.slice(0, 10);

        // Extract the users and post counts into separate arrays
        const users = topUsers.map(entry => entry[0]);  // Extract usernames
        const postCounts = topUsers.map(entry => entry[1]);  // Extract post counts

        console.log('Top 10 users:', topUsers);

        // Update chart labels and data for top users
        this.topUsersChartData.labels = users;
        this.topUsersChartData.datasets[0].data = postCounts;

        // Trigger chart update manually
        if (this.chart) {
          this.chart.update();
        }
      },
      (error) => {
        console.error('Error fetching top users:', error);
      }
    );
  }
  fetchPostCountsByYear(): void {
    this.postService.getPostCountsByYear().subscribe(
      (counts) => {
        // Convert the counts object to an array of [year, count] pairs
        const yearArray = Object.entries(counts);

        // Sort the array by count (post count) in descending order
        yearArray.sort((a, b) => b[1] - a[1]);

        // Get the top years (slice the first 10 entries)
        const topYears = yearArray.slice(0, 10);

        // Extract the years and post counts into separate arrays
        const years = topYears.map(entry => entry[0]);
        const postCounts = topYears.map(entry => entry[1]);

        console.log('Top 10 years:', topYears);

        // Update chart labels and data for post counts by year
        this.postCountsByYearChartData.labels = years;
        this.postCountsByYearChartData.datasets[0].data = postCounts;

        // Trigger chart update manually
        if (this.chart) {
          this.chart.update();
        }
      },
      (error) => {
        console.error('Error fetching post counts by year:', error);
      }
    );
  }

  fetchPostCountsByYearAndMonth(): void {
    this.postService.getPostCountsByYearAndMonth().subscribe(
      (counts) => {
        // Convert the counts object to an array of [year/month, count] pairs
        const yearMonthArray = Object.entries(counts);

        // Sort the array by count (post count) in descending order
        yearMonthArray.sort((a, b) => b[1] - a[1]);

        // Get the top year/months (slice the first 10 entries)
        const topYearMonths = yearMonthArray.slice(0, 10);

        // Extract the year/month labels and post counts into separate arrays
        const yearMonthLabels = topYearMonths.map(entry => entry[0]);
        const postCounts = topYearMonths.map(entry => entry[1]);

        console.log('Top 10 year/month:', topYearMonths);

        // Update chart labels and data for post counts by year and month
        this.postCountsByYearAndMonthChartData.labels = yearMonthLabels;
        this.postCountsByYearAndMonthChartData.datasets[0].data = postCounts;

        // Trigger chart update manually
        if (this.chart) {
          this.chart.update();
        }
      },
      (error) => {
        console.error('Error fetching post counts by year and month:', error);
      }
    );
  }
}
