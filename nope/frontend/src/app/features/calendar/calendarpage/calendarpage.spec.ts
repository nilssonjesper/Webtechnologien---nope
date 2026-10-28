import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendarpage } from './calendarpage';

describe('Calendarpage', () => {
  let component: Calendarpage;
  let fixture: ComponentFixture<Calendarpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Calendarpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calendarpage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
