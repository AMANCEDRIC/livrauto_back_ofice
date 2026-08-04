import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="confirmService.options()" class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-surface-container-lowest bg-opacity-75 transition-opacity backdrop-blur-sm"></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-surface text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-surface-container-low">
            <div class="bg-surface px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                     [ngClass]="{
                       'bg-red-100 text-red-600': confirmService.options()?.type === 'danger',
                       'bg-orange-100 text-orange-600': confirmService.options()?.type === 'warning',
                       'bg-blue-100 text-blue-600': confirmService.options()?.type === 'info'
                     }">
                  <span class="material-symbols-outlined text-[24px]" *ngIf="confirmService.options()?.type === 'danger'">warning</span>
                  <span class="material-symbols-outlined text-[24px]" *ngIf="confirmService.options()?.type === 'warning'">error</span>
                  <span class="material-symbols-outlined text-[24px]" *ngIf="confirmService.options()?.type === 'info'">info</span>
                </div>
                
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-lg font-semibold leading-6 text-on-surface" id="modal-title">{{ confirmService.options()?.title }}</h3>
                  <div class="mt-2">
                    <p class="text-sm text-on-surface-variant">{{ confirmService.options()?.message }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-surface-container-lowest px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" 
                      class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                      [ngClass]="{
                        'bg-red-600 hover:bg-red-500': confirmService.options()?.type === 'danger',
                        'bg-orange-600 hover:bg-orange-500': confirmService.options()?.type === 'warning',
                        'bg-primary hover:bg-primary/90 text-on-primary': confirmService.options()?.type === 'info'
                      }"
                      (click)="confirmService.onConfirm()">
                {{ confirmService.options()?.confirmText }}
              </button>
              <button type="button" 
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      (click)="confirmService.onCancel()">
                {{ confirmService.options()?.cancelText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmDialogComponent {
  confirmService = inject(ConfirmDialogService);
}
