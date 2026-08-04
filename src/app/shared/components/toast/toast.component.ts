import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <div *ngFor="let toast of toastService.toasts()" 
           class="flex items-center p-4 mb-2 text-gray-500 bg-white rounded-lg shadow-lg border-l-4 transition-all duration-300 transform translate-y-0 opacity-100 min-w-[300px] max-w-sm"
           [ngClass]="{
             'border-green-500 text-green-800': toast.type === 'success',
             'border-red-500 text-red-800': toast.type === 'error',
             'border-blue-500 text-blue-800': toast.type === 'info'
           }"
           role="alert">
        
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"
             [ngClass]="{
               'bg-green-100 text-green-500': toast.type === 'success',
               'bg-red-100 text-red-500': toast.type === 'error',
               'bg-blue-100 text-blue-500': toast.type === 'info'
             }">
             
          <span class="material-symbols-outlined text-[20px]" *ngIf="toast.type === 'success'">check_circle</span>
          <span class="material-symbols-outlined text-[20px]" *ngIf="toast.type === 'error'">error</span>
          <span class="material-symbols-outlined text-[20px]" *ngIf="toast.type === 'info'">info</span>
        </div>
        
        <div class="ms-3 flex-1 text-sm font-normal">
          <span class="mb-1 text-sm font-semibold text-gray-900 block">{{ toast.title }}</span>
          <div class="mb-1 text-sm font-normal">{{ toast.message }}</div>
        </div>
        
        <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" 
                (click)="toastService.remove(toast.id)">
          <span class="sr-only">Close</span>
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  `
})
export class ToastComponent {
  toastService = inject(ToastService);
}
