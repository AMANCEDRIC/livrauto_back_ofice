import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="bg-surface-container-lowest rounded-card shadow-ambient border border-border p-6 transition-all duration-300"
      [ngClass]="{'hover:shadow-lg': hoverable, 'p-0': noPadding}"
    >
      <div *ngIf="title || subtitle || hasHeaderAction" class="mb-6 flex justify-between items-start" [ngClass]="{'px-6 pt-6': noPadding}">
        <div>
          <h3 *ngIf="title" class="text-lg font-display font-semibold text-on-surface">{{ title }}</h3>
          <p *ngIf="subtitle" class="text-sm text-on-surface-variant mt-1 font-body">{{ subtitle }}</p>
        </div>
        <div *ngIf="hasHeaderAction">
          <ng-content select="[header-action]"></ng-content>
        </div>
      </div>
      
      <div [ngClass]="{'px-6 pb-6': noPadding}">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() hoverable = false;
  @Input() noPadding = false;
  @Input() hasHeaderAction = false;
}
