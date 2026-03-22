import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalHostComponent } from '@shared/components/modal/modal-host.component';
import { ToastHostComponent } from '@shared/components/toast/toast-host.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalHostComponent, ToastHostComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {}
