import { Component, OnInit } from '@angular/core';
import { ReportService } from "../../Services/report.service";
import { Report } from "../../Models/Report";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-report-table-panel',
  templateUrl: './report-table-panel.component.html',
  standalone: true,
  styleUrls: ['./report-table-panel.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ReportTablePanelComponent implements OnInit {

  reports: Report[] = [];
  index = 1; // Current page index
  showNum: number = 10; // Number of reports to display per page
  currentRoute: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private reportService: ReportService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.loadReports();
  }

  // Load reports from the API
  loadReports(): void {
    this.reportService.getReports().subscribe(
      (data: Report[]) => {
        this.reports = data;
        this.successMessage = 'Reports loaded successfully.';
        this.errorMessage = ''; // Clear error message
      },
      (error) => {
        this.errorMessage = 'Error fetching reports.';
        console.error('Error fetching reports:', error);
      }
    );
  }

  /**
   * Handle the change in the number of items to display per page.
   */
  numViews(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.showNum = Number(target.value);
    this.index = 1; // Reset to the first page
  }

  /**
   * Get the total number of pages based on `showNum`.
   */
  getTotalPages(): number {
    return Math.ceil(this.reports.length / this.showNum);
  }

  /**
   * Generate an array of page indices for pagination.
   */
  getTotIndex(): number[] {
    return Array.from({length: this.getTotalPages()}, (_, i) => i + 1);
  }

  /**
   * Navigate to the next page.
   */
  nextIndex(): void {
    this.index = this.index === this.getTotalPages() ? 1 : this.index + 1;
  }

  /**
   * Navigate to the previous page.
   */
  previousIndex(): void {
    this.index = this.index === 1 ? this.getTotalPages() : this.index - 1;
  }

  /**
   * Change to a specific page.
   */
  IndexChange(i: number): void {
    this.index = i;
  }

  /**
   * Get the subset of reports to display on the current page.
   */
  tableViews(): Report[] {
    const start = (this.index - 1) * this.showNum;
    return this.reports.slice(start, start + this.showNum);
  }


  validateReport(reportId: number): void {

    this.reportService.validateReport(reportId).subscribe(
      () => {
        this.successMessage = `Report with ID ${reportId} validated successfully!`;
        this.errorMessage = '';
        this.loadReports();
      },
      (error) => {
        console.error('Error validating report:', error);
        this.errorMessage = `Failed to validate report with ID ${reportId}`;
      }
    );
  }

  rejectReport(reportId: number): void {
    this.reportService.rejectReport(reportId).subscribe(
      () => {
        this.successMessage = 'Report rejected successfully!';
        this.errorMessage = '';
        this.loadReports();
      },
      (error) => {
        this.errorMessage = 'Error rejecting report. Please try again later.';
        console.error('Error rejecting report:', error);
      }
    );
  }
  // DeleteReport(reportId: number): void {
  //   this.reportService.DeleteReport(reportId).subscribe(
  //     () => {
  //       this.successMessage = 'Report deleted successfully!';
  //       this.errorMessage = '';
  //       this.loadReports();
  //     },
  //     (error) => {
  //       this.errorMessage = 'Error deleting report. Please try again later.';
  //       console.error('Error deleting report:', error);
  //     }
  //   );
  // }

}
