import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { StudentService } from '@core/services/student.service';
import { ToastService } from '@shared/components/toast/toast.service';
import { StudentSummary } from '@core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  profile = signal<StudentSummary | null>(null);
  loading = signal(true);
  marking = signal(false);

  constructor(
    private studentService: StudentService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.studentService.getMyProfile().subscribe({
      next: (data) => {
        this.profile.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.toast.show('Failed to load profile', 'error');
        this.loading.set(false);
      },
    });
  }

  markAttendance(): void {
    if (this.marking()) return;
    this.marking.set(true);

    this.studentService.markAttendance().subscribe({
      next: (res) => {
        this.toast.show(res.message, 'success');
        const current = this.profile();
        if (current) {
          this.profile.set({ ...current, sessionsRemaining: res.sessionsRemaining });
        }
        this.marking.set(false);
      },
      error: (err) => {
        const message = err.error?.message || 'Failed to mark attendance';
        this.toast.show(message, 'error');
        this.marking.set(false);
      },
    });
  }
}
