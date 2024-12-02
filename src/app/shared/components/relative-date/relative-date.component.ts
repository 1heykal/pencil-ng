import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateUtils } from '../../../core/utils/date.utils';

@Component({
  selector: 'app-relative-date',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  template: `
    <span
      class="relative-date"
      [matTooltip]="fullDate"
      matTooltipPosition="right"
    >
      {{ relativeDate }}
    </span>
  `,
  styles: [
    `
      .relative-date {
        color: var(--text-color-secondary);
        font-size: 0.875rem;
      }
    `,
  ],
})
export class RelativeDateComponent {
  @Input() set date(value: Date | string) {
    this.relativeDate = DateUtils.formatRelativeDate(value);
    this.fullDate = DateUtils.formatFullDate(value);
  }

  relativeDate: string = '';
  fullDate: string = '';
}
