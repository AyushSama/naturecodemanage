import { Routes } from '@angular/router';
import { adminGuard, studentGuard, authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('@routes/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('@routes/profile/profile.component').then(m => m.ProfileComponent),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('@layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'students', pathMatch: 'full' },
      {
        path: 'students',
        loadComponent: () => import('@routes/admin/student-list/student-list.component').then(m => m.StudentListComponent),
      },
      {
        path: 'students/:email',
        loadComponent: () => import('@routes/admin/student-detail/student-detail.component').then(m => m.StudentDetailComponent),
      },
    ],
  },
  {
    path: 'student',
    canActivate: [studentGuard],
    loadComponent: () => import('@layouts/student-layout/student-layout.component').then(m => m.StudentLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('@routes/student/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'attendance',
        loadComponent: () => import('@routes/student/attendance-history/attendance-history.component').then(m => m.AttendanceHistoryComponent),
      },
      {
        path: 'payments',
        loadComponent: () => import('@routes/student/payment-history/payment-history.component').then(m => m.PaymentHistoryComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
