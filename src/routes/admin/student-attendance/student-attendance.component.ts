import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminService } from '@core/services/admin.service';
import { Attendance } from '@core/models/attendance.model';

@Component({
  selector: 'app-student-attendance',
  standalone: true,
  imports: [DatePipe],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss'],
})
export class StudentAttendanceComponent implements OnInit {
  data: any;
  modalClose!: (result?: any) => void;

  records = signal<Attendance[]>([]);
  loading = signal(true);

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    if (this.data?.studentEmail) {
      this.adminService.getStudentAttendance(this.data.studentEmail).subscribe({
        next: (d) => { this.records.set(d); this.loading.set(false); },
        error: () => this.loading.set(false),
      });
    }
  }
}
