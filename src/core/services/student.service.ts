import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { StudentSummary } from '@core/models/user.model';
import { Payment } from '@core/models/payment.model';
import { Attendance } from '@core/models/attendance.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private baseUrl = `${environment.apiUrl}/student`;

  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<StudentSummary> {
    return this.http.get<StudentSummary>(`${this.baseUrl}/me`);
  }

  markAttendance(): Observable<{ message: string; sessionsRemaining: number }> {
    return this.http.post<{ message: string; sessionsRemaining: number }>(`${this.baseUrl}/attendance`, {});
  }

  getMyAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.baseUrl}/attendance`);
  }

  getMyPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/payments`);
  }
}
