import {
  Component, ViewEncapsulation, ViewContainerRef,
  ViewChild, OnInit, DestroyRef, inject,
} from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal-host',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './modal-host.component.html',
})
export class ModalHostComponent implements OnInit {
  modal = inject(ModalService);
  private destroyRef = inject(DestroyRef);

  @ViewChild('outlet', { read: ViewContainerRef, static: false }) outlet?: ViewContainerRef;

  private intervalId: any;

  ngOnInit(): void {
    // Poll for component changes (effect + ViewChild is unreliable)
    this.intervalId = setInterval(() => this.renderComponent(), 50);
    this.destroyRef.onDestroy(() => clearInterval(this.intervalId));
  }

  private lastComp: any = null;

  private renderComponent(): void {
    const comp = this.modal.component();
    if (comp === this.lastComp) return;
    this.lastComp = comp;

    if (!comp || !this.outlet) return;
    this.outlet.clear();
    const ref = this.outlet.createComponent(comp);
    (ref.instance as any).data = this.modal.data();
    (ref.instance as any).modalClose = (result?: any) => this.modal.close(result);
  }

  onBackdropClick(): void {
    this.modal.close();
  }
}
