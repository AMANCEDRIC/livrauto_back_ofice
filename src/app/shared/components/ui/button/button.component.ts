import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      (click)="onClick.emit($event)"
      class="inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed h-11 px-6 rounded-btn text-sm whitespace-nowrap"
      [ngClass]="getClasses()"
    >
      <div *ngIf="loading" class="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() block = false;

  @Output() onClick = new EventEmitter<MouseEvent>();

  getClasses(): string {
    const base = this.block ? 'w-full ' : '';
    
    switch (this.variant) {
      case 'primary':
        return base + 'bg-primary-container text-white hover:brightness-110 shadow-soft focus:ring-primary-container/50';
      case 'secondary':
        return base + 'bg-surface-container-lowest border border-border text-on-surface hover:bg-surface-container-low focus:ring-border/50';
      case 'outline':
        return base + 'bg-transparent border border-border text-on-surface hover:bg-surface-container-low focus:ring-border/50';
      case 'ghost':
        return base + 'bg-transparent text-on-surface hover:bg-surface-container-low focus:ring-surface-container-low/50';
      case 'danger':
        return base + 'bg-error text-white hover:bg-error/90 shadow-soft focus:ring-error/50';
      case 'success':
        return base + 'bg-success text-white hover:bg-success/90 shadow-soft focus:ring-success/50';
      default:
        return base;
    }
  }
}
