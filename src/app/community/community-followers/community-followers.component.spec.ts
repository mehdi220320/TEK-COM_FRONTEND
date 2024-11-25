import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityFollowersComponent } from './community-followers.component';

describe('CommunityFollowersComponent', () => {
  let component: CommunityFollowersComponent;
  let fixture: ComponentFixture<CommunityFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityFollowersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
