import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendforgettpassComponent } from './sendforgettpass.component';

describe('SendforgettpassComponent', () => {
  let component: SendforgettpassComponent;
  let fixture: ComponentFixture<SendforgettpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendforgettpassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendforgettpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
