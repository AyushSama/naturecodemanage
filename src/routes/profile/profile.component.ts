import { Component, OnInit, signal, computed, ViewEncapsulation } from '@angular/core';
import { CurrencyPipe, UpperCasePipe, Location } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { StudentService } from '@core/services/student.service';
import { StudentSummary } from '@core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
  studentSummary = signal<StudentSummary | null>(null);
  loadingStats = signal(false);

  user;
  isAdmin;
  initial;

  constructor(
    public auth: AuthService,
    private studentService: StudentService,
    private location: Location
  ) {
    this.user = this.auth.currentUser;
    this.isAdmin = this.auth.isAdmin;
    this.initial = computed(() => {
      const name = this.user()?.name;
      return name ? name.charAt(0).toUpperCase() : '?';
    });
  }

  ngOnInit(): void {
    if (!this.isAdmin()) {
      this.loadingStats.set(true);
      this.studentService.getMyProfile().subscribe({
        next: (data) => { this.studentSummary.set(data); this.loadingStats.set(false); },
        error: () => this.loadingStats.set(false),
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  signOut(): void {
    this.auth.signOut();
  }
}
