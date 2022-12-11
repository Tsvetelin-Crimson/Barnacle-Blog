import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorTooltipComponent } from './input-error-tooltip/input-error-tooltip.component';



@NgModule({
  declarations: [
    InputErrorTooltipComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    InputErrorTooltipComponent,
  ]
})
export class LocalCommonModule { }
