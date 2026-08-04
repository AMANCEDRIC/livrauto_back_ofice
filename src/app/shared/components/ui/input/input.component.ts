import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="flex flex-col w-full">
      <label *ngIf="label" [for]="id" class="mb-1.5 text-sm font-medium text-on-surface">
        {{ label }} <span *ngIf="required" class="text-error">*</span>
      </label>
      
      <div class="relative flex items-center w-full">
        <!-- Optional Prefix Icon -->
        <div *ngIf="icon" class="absolute left-3 text-on-surface-variant flex items-center justify-center">
          <lucide-icon [name]="icon" [size]="18" [strokeWidth]="2"></lucide-icon>
        </div>
        
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [required]="required"
          [value]="value"
          (input)="onInputChange($event)"
          (blur)="onTouched()"
          class="w-full h-12 bg-surface-container-lowest border border-border text-on-surface text-sm rounded-input focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 disabled:opacity-50 disabled:bg-surface-container-low"
          [ngClass]="{
            'pl-10': icon,
            'pl-4': !icon,
            'pr-10': clearable,
            'pr-4': !clearable,
            'border-error focus:ring-error/20 focus:border-error': error
          }"
        />
        
        <!-- Optional Clear Button -->
        <button *ngIf="clearable && value" 
                type="button"
                (click)="clear()"
                class="absolute right-3 text-on-surface-variant hover:text-on-surface focus:outline-none">
          <lucide-icon name="x" [size]="16"></lucide-icon>
        </button>
      </div>
      
      <p *ngIf="error" class="mt-1.5 text-xs text-error">{{ error }}</p>
      <p *ngIf="hint && !error" class="mt-1.5 text-xs text-on-surface-variant">{{ hint }}</p>
    </div>
  `
})
export class InputComponent implements ControlValueAccessor {
  @Input() id = `input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() icon?: string; // Lucide icon name
  @Input() hint?: string;
  @Input() error?: string;
  @Input() required = false;
  @Input() clearable = false;

  value: string = '';
  disabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  onInputChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  clear() {
    this.value = '';
    this.onChange('');
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
