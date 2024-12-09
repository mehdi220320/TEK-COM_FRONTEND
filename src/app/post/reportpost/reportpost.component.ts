import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reportpost',
  templateUrl: './reportpost.component.html',
  styleUrls: ['./reportpost.component.css']
})
export class ReportpostComponent implements OnInit {
  cause: string = ''; // Bind this to the selected radio button
  postId: number = 0;  // Initialize as 0, it will be updated from the query parameter


  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute  // Inject ActivatedRoute
  ) {}

  ngOnInit() {
    // Extract the postId from the query parameters
    this.route.queryParamMap.subscribe(params => {
      const postId = params.get('postId');  // Get postId from query parameters
      console.log('Extracted postId:', postId);  // Log the extracted value
      if (postId) {
        this.postId = +postId;  // Convert to number and assign to postId
        console.log('Converted postId:', this.postId);  // Log the converted value
      } else {
        console.error('No postId found in the query parameters');
      }
    });
  }

  onSubmitReport() {
    if (!this.cause) {
      alert('Please select a reason for reporting.');
      return;
    }


    // Prepare the request payload with the correct field name "post"
    const reportData = {
      cause: this.cause,
      post: this.postId // Ensure this matches the backend field name
    };

    // Send POST request to create the report
    this.http.post('http://localhost:9090/api/v1/report/create', reportData).subscribe(
      (response) => {
        console.log('Report submitted:', response);
        alert('Your report has been submitted successfully.');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error submitting report:', error);
        alert('An error occurred while submitting your report.');
      }
    );
  }
}
