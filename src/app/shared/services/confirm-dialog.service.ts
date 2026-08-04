import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface ConfirmDialogOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  options = signal<ConfirmDialogOptions | null>(null);
  private confirmationSubject = new Subject<boolean>();

  confirm(options: ConfirmDialogOptions): Promise<boolean> {
    this.options.set({
      ...options,
      confirmText: options.confirmText || 'Confirmer',
      cancelText: options.cancelText || 'Annuler',
      type: options.type || 'info'
    });

    return new Promise((resolve) => {
      const subscription = this.confirmationSubject.subscribe((result) => {
        subscription.unsubscribe();
        this.options.set(null);
        resolve(result);
      });
    });
  }

  onConfirm() {
    this.confirmationSubject.next(true);
  }

  onCancel() {
    this.confirmationSubject.next(false);
  }
}
