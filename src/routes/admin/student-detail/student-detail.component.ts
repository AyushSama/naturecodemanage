import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AdminService } from '@core/services/admin.service';
import { Payment } from '@core/models/payment.model';
import { Attendance } from '@core/models/attendance.model';
import { ModalService } from '@shared/components/modal/modal.service';
import { AddPaymentComponent } from '../add-payment/add-payment.component';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StudentDetailComponent implements OnInit {
  email = signal('');
  tab = signal<'attendance' | 'payments'>('attendance');
  attendance = signal<Attendance[]>([]);
  payments = signal<Payment[]>([]);
  loadingAttendance = signal(true);
  loadingPayments = signal(true);

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email') || '';
    this.email.set(email);
    this.loadData(email);
  }

  loadData(email: string): void {
    this.loadingAttendance.set(true);
    this.loadingPayments.set(true);
    this.adminService.getStudentAttendance(email).subscribe({
      next: (d) => { this.attendance.set(d); this.loadingAttendance.set(false); },
      error: () => this.loadingAttendance.set(false),
    });
    this.adminService.getStudentPayments(email).subscribe({
      next: (d) => { this.payments.set(d); this.loadingPayments.set(false); },
      error: () => this.loadingPayments.set(false),
    });
  }

  async openAddPayment(): Promise<void> {
    const result = await this.modalService.open(AddPaymentComponent, {
      studentEmail: this.email(),
      studentName: this.email(),
    });
    if (result) this.loadData(this.email());
  }
}
