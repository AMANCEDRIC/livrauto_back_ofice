import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<ToastMessage[]>([]);
  private counter = 0;

  show(type: 'success' | 'error' | 'info', title: string, message: string) {
    const id = ++this.counter;
    const toast: ToastMessage = { id, type, title, message };
    
    this.toasts.update(current => [...current, toast]);

    setTimeout(() => {
      this.remove(id);
    }, 4000);
  }

  success(title: string, message: string) {
    this.show('success', title, message);
  }

  error(title: string, message: string) {
    this.show('error', title, message);
  }

  info(title: string, message: string) {
    this.show('info', title, message);
  }

  remove(id: number) {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}
