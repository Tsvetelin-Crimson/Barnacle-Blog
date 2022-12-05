import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorTooltipComponent } from './input-error-tooltip.component';

describe('InputErrorTooltipComponent', () => {
  let component: InputErrorTooltipComponent;
  let fixture: ComponentFixture<InputErrorTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputErrorTooltipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputErrorTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
