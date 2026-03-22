import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { StudentSummary } from '@core/models/user.model';
import { Payment } from '@core/models/payment.model';
import { Attendance } from '@core/models/attendance.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getStudents(): Observable<StudentSummary[]> {
    return this.http.get<StudentSummary[]>(`${this.baseUrl}/students`);
  }

  addStudent(email: string, name: string, initialSessions: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/students`, { email, name, initialSessions });
  }

  addPayment(studentEmail: string, amount: number, sessionsAdded: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/payments`, { studentEmail, amount, sessionsAdded });
  }

  getStudentPayments(email: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/students/${email}/payments`);
  }

  getStudentAttendance(email: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.baseUrl}/students/${email}/attendance`);
  }
}
