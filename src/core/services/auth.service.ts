import { Injectable, signal, computed, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { User } from '@core/models/user.model';

declare const google: any;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentUser = signal<User | null>(null);
  private _idToken = signal<string | null>(null);

  currentUser = this._currentUser.asReadonly();
  isLoggedIn = computed(() => this._currentUser() !== null);
  isAdmin = computed(() => this._currentUser()?.role === 'admin');

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.restoreSession();
  }

  getToken(): string | null { return this._idToken(); }

  initGoogleSignIn(buttonElement: HTMLElement): void {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.ngZone.run(() => this.handleCredentialResponse(response)),
    });
    google.accounts.id.renderButton(buttonElement, { theme: 'outline', size: 'large', width: 300 });
  }

  private handleCredentialResponse(response: any): void {
    const idToken = response.credential;
    this.http.post<User>(`${environment.apiUrl}/auth/google-login`, { idToken }).subscribe({
      next: (user) => {
        this._idToken.set(idToken);
        this._currentUser.set(user);
        sessionStorage.setItem('idToken', idToken);
        sessionStorage.setItem('user', JSON.stringify(user));
        this.router.navigate([user.role === 'admin' ? '/admin' : '/student']);
      },
      error: (err : HttpErrorResponse) => {
        console.log(err);
        this._idToken.set(null);
        this._currentUser.set(null);
      },
    });
  }

  signOut(): void {
    google.accounts.id.disableAutoSelect();
    this._currentUser.set(null);
    this._idToken.set(null);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  private restoreSession(): void {
    const idToken = sessionStorage.getItem('idToken');
    const userJson = sessionStorage.getItem('user');
    if (idToken && userJson) {
      this._idToken.set(idToken);
      this._currentUser.set(JSON.parse(userJson));
    }
  }
}
