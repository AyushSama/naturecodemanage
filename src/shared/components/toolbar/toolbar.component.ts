import { Component, ViewEncapsulation } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [UpperCasePipe, RouterLink],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(public auth: AuthService) {}
}
