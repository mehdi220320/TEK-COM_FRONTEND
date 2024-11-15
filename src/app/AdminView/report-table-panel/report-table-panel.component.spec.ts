import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTablePanelComponent } from './report-table-panel.component';

describe('ReportTablePanelComponent', () => {
  let component: ReportTablePanelComponent;
  let fixture: ComponentFixture<ReportTablePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTablePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportTablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
