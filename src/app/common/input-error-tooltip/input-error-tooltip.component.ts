import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-error-tooltip',
  templateUrl: './input-error-tooltip.component.html',
  styleUrls: ['./input-error-tooltip.component.scss']
})
export class InputErrorTooltipComponent implements OnInit {
  
  @Input()
  error = '';
  @Input()
  shouldShow: boolean | null | undefined = null;

  constructor() { }

  ngOnInit(): void {
  }

}
