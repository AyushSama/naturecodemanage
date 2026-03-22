import { Component, ViewEncapsulation } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-host',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './toast-host.component.html',
})
export class ToastHostComponent {
  constructor(public toast: ToastService) {}
}
