import { Component, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '@core/services/admin.service';
import { ToastService } from '@shared/components/toast/toast.service';

@Component({
  selector: 'app-add-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddPaymentComponent {
  data: any;
  amount = 0;
  sessionsAdded = 1;
  saving = signal(false);
  modalClose!: (result?: any) => void;

  constructor(
    private adminService: AdminService,
    private toast: ToastService
  ) {}

  save(): void {
    this.saving.set(true);
    this.adminService.addPayment(this.data.studentEmail, this.amount, this.sessionsAdded).subscribe({
      next: () => {
        this.toast.show('Payment recorded successfully');
        this.modalClose(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.show(err.error?.message || 'Failed to record payment', 'error');
      },
    });
  }
}
