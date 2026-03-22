export interface User {
  email: string;
  name: string;
  role: 'admin' | 'student';
  sessionsRemaining: number;
}

export interface StudentSummary {
  email: string;
  name: string;
  sessionsRemaining: number;
  totalPaid: number;
}
