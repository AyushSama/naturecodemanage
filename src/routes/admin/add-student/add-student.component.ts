import { Component, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '@core/services/admin.service';
import { ToastService } from '@shared/components/toast/toast.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddStudentComponent {
  data: any;
  email = '';
  name = '';
  sessions = 0;
  saving = signal(false);
  modalClose!: (result?: any) => void;

  constructor(
    private adminService: AdminService,
    private toast: ToastService
  ) {}

  save(): void {
    this.saving.set(true);
    this.adminService.addStudent(this.email, this.name, this.sessions).subscribe({
      next: () => {
        this.toast.show('Student added successfully');
        this.modalClose(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.show(err.error?.message || 'Failed to add student', 'error');
      },
    });
  }
}
