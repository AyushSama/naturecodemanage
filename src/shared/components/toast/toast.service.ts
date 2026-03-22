import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toast = signal<Toast | null>(null);

  show(message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000): void {
    this.toast.set({ message, type });
    setTimeout(() => this.toast.set(null), duration);
  }
}
