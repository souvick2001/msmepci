import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  private platformId = inject(PLATFORM_ID);
  auth     = inject(AuthService);
  router   = inject(Router);
  route    = inject(ActivatedRoute);

  mode     = signal<'login' | 'register'>('login');
  loading  = signal(false);
  error    = signal('');
  success  = signal('');
  showPass = signal(false);

  name = ''; email = ''; password = '';

  ngOnInit() {
    const m = this.route.snapshot.queryParamMap.get('mode');
    if (m === 'register') this.mode.set('register');
  }

  // ✅ Signal wrappers — no arrow functions in templates
  isLogin():       boolean { return this.mode() === 'login'; }
  isRegister():    boolean { return this.mode() === 'register'; }
  isLoading():     boolean { return this.loading(); }
  getError():      string  { return this.error(); }
  getSuccess():    string  { return this.success(); }
  isShowPass():    boolean { return this.showPass(); }
  togglePass():    void    { this.showPass.set(!this.showPass()); }
  getPassType():   string  { return this.showPass() ? 'text' : 'password'; }
  getPassIcon():   string  { return this.showPass() ? '🙈' : '👁️'; }
  getSubmitLabel(): string {
    return this.mode() === 'login' ? 'Login →' : 'Create Account →';
  }

  switchMode(m: 'login' | 'register'): void {
    this.mode.set(m);
    this.error.set('');
    this.success.set('');
    this.name = ''; this.email = ''; this.password = '';
  }

  submit(): void {
    this.error.set('');
    this.success.set('');

    if (!this.email || !this.password) {
      this.error.set('Please fill all fields.');
      return;
    }
    if (this.mode() === 'register' && !this.name.trim()) {
      this.error.set('Name is required.');
      return;
    }
    if (this.password.length < 8) {
      this.error.set('Password must be at least 8 characters.');
      return;
    }

    this.loading.set(true);

    const obs = this.mode() === 'login'
      ? this.auth.login(this.email, this.password)
      : this.auth.register(this.name, this.email, this.password);

    obs.subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(this.mode() === 'login' ? 'Welcome back!' : 'Account created!');
        setTimeout(() => this.router.navigate(['/']), 800);
      },
      error: (e) => {
        this.loading.set(false);
        this.error.set(e.error?.detail || 'Something went wrong. Try again.');
      }
    });
  }
}