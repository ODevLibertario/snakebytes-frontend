import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeComponent } from './prize.component';

describe('PrizeComponent', () => {
  let component: PrizeComponent;
  let fixture: ComponentFixture<PrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
