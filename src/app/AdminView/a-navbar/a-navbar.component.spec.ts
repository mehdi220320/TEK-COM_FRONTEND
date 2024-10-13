import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ANavbarComponent } from './a-navbar.component';

describe('ANavbarComponent', () => {
  let component: ANavbarComponent;
  let fixture: ComponentFixture<ANavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ANavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ANavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
