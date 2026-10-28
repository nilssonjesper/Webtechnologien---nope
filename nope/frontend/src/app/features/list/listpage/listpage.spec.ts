import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listpage } from './listpage';

describe('Listpage', () => {
  let component: Listpage;
  let fixture: ComponentFixture<Listpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listpage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
