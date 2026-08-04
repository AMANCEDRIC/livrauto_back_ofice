import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeStatus = 'success' | 'warning' | 'error' | 'info' | 'default';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
      [ngClass]="getClasses()"
    >
      <span *ngIf="showDot" class="w-1.5 h-1.5 rounded-full mr-1.5" [ngClass]="getDotClasses()"></span>
      <ng-content></ng-content>
    </span>
  `
})
export class StatusBadgeComponent {
  @Input() status: BadgeStatus = 'default';
  @Input() showDot = true;

  getClasses(): string {
    switch (this.status) {
      case 'success':
        return 'bg-success-container text-success';
      case 'warning':
        return 'bg-warning-container text-warning';
      case 'error':
        return 'bg-error-container text-error';
      case 'info':
        return 'bg-primary-container text-primary';
      default:
        return 'bg-surface-container-high text-on-surface-variant';
    }
  }

  getDotClasses(): string {
    switch (this.status) {
      case 'success':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'error':
        return 'bg-error';
      case 'info':
        return 'bg-primary';
      default:
        return 'bg-on-surface-variant';
    }
  }
}
