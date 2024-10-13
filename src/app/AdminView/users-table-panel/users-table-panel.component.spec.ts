import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTablePanelComponent } from './users-table-panel.component';

describe('UsersTablePanelComponent', () => {
  let component: UsersTablePanelComponent;
  let fixture: ComponentFixture<UsersTablePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTablePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
