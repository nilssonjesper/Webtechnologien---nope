import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gridlines } from './gridlines';

describe('Gridlines', () => {
  let component: Gridlines;
  let fixture: ComponentFixture<Gridlines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gridlines]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gridlines);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
