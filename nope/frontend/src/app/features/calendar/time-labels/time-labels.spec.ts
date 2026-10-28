import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLabels } from './time-labels';

describe('TimeLabels', () => {
  let component: TimeLabels;
  let fixture: ComponentFixture<TimeLabels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeLabels]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeLabels);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
