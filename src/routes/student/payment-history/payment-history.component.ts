import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { StudentService } from '@core/services/student.service';
import { Payment } from '@core/models/payment.model';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentHistoryComponent implements OnInit {
  payments = signal<Payment[]>([]);
  loading = signal(true);

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getMyPayments().subscribe({
      next: (data) => {
        this.payments.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
