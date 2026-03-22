import { Injectable, signal, Type } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  isOpen = signal(false);
  component = signal<Type<any> | null>(null);
  data = signal<any>(null);

  private resolvePromise: ((value: any) => void) | null = null;

  open<T = any>(component: Type<any>, data?: any): Promise<T | undefined> {
    this.component.set(component);
    this.data.set(data ?? null);
    this.isOpen.set(true);
    return new Promise<T | undefined>((resolve) => { this.resolvePromise = resolve; });
  }

  close(result?: any): void {
    this.isOpen.set(false);
    this.component.set(null);
    this.data.set(null);
    this.resolvePromise?.(result);
    this.resolvePromise = null;
  }
}
