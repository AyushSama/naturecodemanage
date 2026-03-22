import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StudentService } from '@core/services/student.service';
import { Attendance } from '@core/models/attendance.model';

@Component({
  selector: 'app-attendance-history',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './attendance-history.component.html',
  styleUrls: ['./attendance-history.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AttendanceHistoryComponent implements OnInit {
  records = signal<Attendance[]>([]);
  loading = signal(true);

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getMyAttendance().subscribe({
      next: (data) => {
        this.records.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
