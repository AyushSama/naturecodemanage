import { Component, OnInit, signal, computed, ViewEncapsulation } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '@core/services/admin.service';
import { StudentSummary } from '@core/models/user.model';
import { ModalService } from '@shared/components/modal/modal.service';
import { AddStudentComponent } from '../add-student/add-student.component';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { StudentAttendanceComponent } from '../student-attendance/student-attendance.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StudentListComponent implements OnInit {
  students = signal<StudentSummary[]>([]);
  loading = signal(true);
  searchQuery = signal('');

  totalStudents = computed(() => this.students().length);
  totalRevenue = computed(() => this.students().reduce((s, st) => s + st.totalPaid, 0));
  totalSessions = computed(() => this.students().reduce((s, st) => s + st.sessionsRemaining, 0));
  needRepayment = computed(() => this.students().filter(s => s.sessionsRemaining === 0).length);

  filteredStudents = computed(() => {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.students();
    return this.students().filter(s =>
      s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
    );
  });

  constructor(
    private adminService: AdminService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading.set(true);
    this.adminService.getStudents().subscribe({
      next: (data) => { this.students.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  async openAddStudent(): Promise<void> {
    const result = await this.modalService.open(AddStudentComponent);
    if (result) this.loadStudents();
  }

  async openAddPayment(student: StudentSummary): Promise<void> {
    const result = await this.modalService.open(AddPaymentComponent, {
      studentEmail: student.email, studentName: student.name,
    });
    if (result) this.loadStudents();
  }

  async viewAttendance(student: StudentSummary): Promise<void> {
    await this.modalService.open(StudentAttendanceComponent, {
      studentEmail: student.email, studentName: student.name,
    });
  }

  viewDetail(student: StudentSummary): void {
    this.router.navigate(['/admin/students', student.email]);
  }
}
