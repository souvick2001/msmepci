import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User { id: number; name: string; email: string; is_admin: boolean; }
export interface AuthResponse { access_token: string; token_type: string; user: User; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiUrl}/auth`;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  currentUser = signal<User | null>(this.loadUser());
  isLoggedIn  = signal<boolean>(this.isBrowser ? !!localStorage.getItem('token') : false);
  showModal   = signal<boolean>(false);
  modalMode   = signal<'login' | 'register'>('login');

  constructor(private http: HttpClient) {}

  openLogin()    { this.modalMode.set('login');    this.showModal.set(true); }
  openRegister() { this.modalMode.set('register'); this.showModal.set(true); }
  closeModal()   { this.showModal.set(false); }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.api}/login`, { email, password })
      .pipe(tap(res => this.saveSession(res)));
  }

  register(name: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.api}/register`, { name, email, password })
      .pipe(tap(res => this.saveSession(res)));
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
  }

  getToken() {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  private saveSession(res: AuthResponse) {
    if (this.isBrowser) {
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    this.currentUser.set(res.user);
    this.isLoggedIn.set(true);
    this.closeModal();
  }

  private loadUser(): User | null {
    if (!this.isBrowser) return null;
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }
}
