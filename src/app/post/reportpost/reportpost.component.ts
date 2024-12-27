import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reportpost',
  templateUrl: './reportpost.component.html',
  styleUrls: ['./reportpost.component.css']
})
export class ReportpostComponent implements OnInit {
  cause: string = '';
  postId: number = 0;
  description:string ='';
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const postId = params['postId'];
      console.log('Extracted postId:', postId);
      if (postId) {
        this.postId = +postId;
        console.log('Converted postId:', this.postId);
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
    const reportData = {
      cause: this.cause,
      post: this.postId,
      whoreported: localStorage.getItem('id'),
      description:this.description
    };

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
