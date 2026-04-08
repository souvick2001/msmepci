import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss'
})
export class AuthModalComponent {
  auth = inject(AuthService);
  loading = signal(false);
  error = signal('');

  name = ''; email = ''; password = '';

  submit() {
    this.error.set(''); this.loading.set(true);
    const obs = this.auth.modalMode() === 'login'
      ? this.auth.login(this.email, this.password)
      : this.auth.register(this.name, this.email, this.password);

    obs.subscribe({
      next: () => { this.loading.set(false); this.reset(); },
      error: (e) => { this.loading.set(false); this.error.set(e.error?.detail || 'Something went wrong'); }
    });
  }

  reset() { this.name = ''; this.email = ''; this.password = ''; this.error.set(''); }
  close()  { this.auth.closeModal(); this.reset(); }
}
