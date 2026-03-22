import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToolbarComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.scss'],
})
export class StudentLayoutComponent {}
