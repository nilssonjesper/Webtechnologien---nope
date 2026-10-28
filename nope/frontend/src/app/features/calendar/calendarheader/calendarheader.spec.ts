import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendarheader } from './calendarheader';

describe('Calendarheader', () => {
  let component: Calendarheader;
  let fixture: ComponentFixture<Calendarheader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Calendarheader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calendarheader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
