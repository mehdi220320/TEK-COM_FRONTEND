import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsSuggestionComponent } from './groups-suggestion.component';

describe('GroupsSuggestionComponent', () => {
  let component: GroupsSuggestionComponent;
  let fixture: ComponentFixture<GroupsSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsSuggestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
