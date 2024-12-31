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
  // Chart Types for each chart
  chartTypeCommunity: ChartType = 'bar';
  chartTypeUsers: ChartType = 'line';
  chartTypeYear: ChartType = 'radar';
  chartTypeYearMonth: ChartType = 'doughnut';
  chartTypeLogins: ChartType = 'line';
  chartTypemembersCommunity: ChartType = 'bar';
  chartDatamembersCommunity: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Members by Community',
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffcd56', '#fd7f6f']
      }
    ]
  };

  // Chart Data for each chart
  chartDataCommunity: ChartData = {
    labels: ['Community A', 'Community B', 'Community C'],
    datasets: [
      {
        data: [10, 20, 30],
        label: 'Posts by Community',
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
      }
    ]
  };

  chartDataUsers: ChartData = {
    labels: ['User 1', 'User 2', 'User 3'],
    datasets: [
      {
        data: [15, 25, 10],
        label: 'Top Users',
        backgroundColor: ['#ff9f40', '#4bc0c0', '#9966ff']
      }
    ]
  };

  chartDataYear: ChartData = {
    labels: ['2021', '2022', '2023'],
    datasets: [
      {
        data: [100, 200, 300],
        label: 'Posts by Year',
        backgroundColor: ['#4dc9f6', '#f67019', '#f53794']
      }
    ]
  };

  chartDataYearMonth: ChartData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        data: [50, 75, 25],
        label: 'Posts by Month',
        backgroundColor: ['#ffcd56', '#fd7f6f', '#7eb0d5']
      }
    ]
  };
  chartDataLogins: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'User Logins',
        backgroundColor: '#ff9f40'
      }
    ]
  };
  // Common Chart Options
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { enabled: true }
    }
  };

  constructor(private postService: PostService) { }
  userCount: number = 0; // Initialize with 0 or a default value
  communityCount: number = 0;  // Initialize the community count variable
  topCommunity: { name: string, memberCount: number } | null = null;
    ngOnInit(): void {
    this.fetchPostCounts();  // Fetch post counts by community
    this.fetchTopUsers();    // Fetch top users with the most posts
    this.fetchPostCountsByYear();
    this.fetchPostCountsByYearAndMonth();
    this.fetchUserLoginCounts();
    this.getUserCount();
    this. getCommunityCount();
      this.fetchCommunityMemberCounts();  // Fetch community member counts
  }
  fetchCommunityMemberCounts(): void {
    this.postService.getcommunitiesmembers().subscribe(
      (counts) => {
        // Convert the counts object to an array of [community, count] pairs
        const communityArray = Object.entries(counts);

        // Sort the array by count (member count) in descending order
        communityArray.sort((a, b) => b[1] - a[1]);

        // Extract the communities and member counts into separate arrays
        const communities = communityArray.map(entry => entry[0]);
        const memberCounts = communityArray.map(entry => entry[1]);

        console.log('Communities with member counts:', communityArray);

        // Update chart labels and data for community member counts
        this.chartDatamembersCommunity.labels = communities;
        this.chartDatamembersCommunity.datasets[0].data = memberCounts;

        // Store the top community (the one with the most members)
        this.topCommunity = communityArray[0] ? {
          name: communityArray[0][0],
          memberCount: communityArray[0][1]
        } : null;

        // Log the top community
        console.log('Top Community with Most Members:', this.topCommunity);

        // Trigger chart update manually
        if (this.chart) {
          this.chart.update();
        }
      },
      (error) => {
        console.error('Error fetching community member counts:', error);
      }
    );
  }
  getCommunityCount(): void {
    this.postService.getCommunityCount().subscribe(
      (count) => {
        this.communityCount = count;
        console.log('Total Users: ', this.communityCount);

      },
      (error) => {
        console.error('Error fetching community count: ', error);  // Handle errors
      }
    );
  }
  getUserCount(): void {
    this.postService.getUserCount().subscribe(
      (count) => {
        this.userCount = count;
        console.log('Total Users: ', this.userCount);
      },
      (error) => {
        console.error('Error fetching user count: ', error);
      }
    );
  }
  fetchUserLoginCounts(): void {
    this.postService.getactifuserstoken().subscribe(
      (loginCounts) => {
        // Convert the loginCounts object to an array of [username, loginCount] pairs
        const loginArray = Object.entries(loginCounts);

        // Sort the array by login count in descending order
        loginArray.sort((a, b) => b[1] - a[1]);

        // Get the top 10 users (slice the first 10 entries)
        const topUsers = loginArray.slice(0, 10);

        // Extract the usernames and login counts into separate arrays
        const users = topUsers.map(entry => entry[0]);
        const loginCountsArray = topUsers.map(entry => entry[1]);

        console.log('Top 10 users by logins:', topUsers);

        // Update chart labels and data for user login counts
        this.chartDataLogins.labels = users;
        this.chartDataLogins.datasets[0].data = loginCountsArray;

        // Trigger chart update manually
        if (this.chart) {
          this.chart.update();
        }
      },
      (error) => {
        console.error('Error fetching user login counts:', error);
      }
    );
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
        this.chartDataCommunity.labels = communities;
        this.chartDataCommunity.datasets[0].data = postCounts;

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
        this.chartDataUsers.labels = users;
        this.chartDataUsers.datasets[0].data = postCounts;

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
        this.chartDataYear.labels = years;
        this.chartDataYear.datasets[0].data = postCounts;

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
        this.chartDataYearMonth.labels = yearMonthLabels;
        this.chartDataYearMonth.datasets[0].data = postCounts;

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
