import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeGrid } from './time-grid';

describe('TimeGrid', () => {
  let component: TimeGrid;
  let fixture: ComponentFixture<TimeGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
