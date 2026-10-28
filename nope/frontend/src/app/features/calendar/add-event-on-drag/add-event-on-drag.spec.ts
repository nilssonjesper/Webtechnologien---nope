import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventOnDrag } from './add-event-on-drag';

describe('AddEventOnDrag', () => {
  let component: AddEventOnDrag;
  let fixture: ComponentFixture<AddEventOnDrag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEventOnDrag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEventOnDrag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
