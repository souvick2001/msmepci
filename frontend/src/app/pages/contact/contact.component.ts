import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  submitted = false;
  error = '';

  constructor(private http: HttpClient) {}

  contactForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('+91 ', [Validators.required, Validators.pattern('^[+][9][1][ ]?[6-9][0-9]{9}$')]),
    message: new FormControl('', [Validators.required, Validators.maxLength(1000)])
  });

  onSubmit() {
    if (this.contactForm.valid) {
      const payload = {
        full_name: this.contactForm.value.fullName,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        message: this.contactForm.value.message
      };

      this.http.post('http://localhost:8000/api/contact/', payload).subscribe({
        next: () => {
          this.submitted = true;
          this.error = '';
          this.contactForm.reset({ phone: '+91 ' });
        },
        error: () => {
          this.error = 'Something went wrong. Please try again.';
        }
      });
    }
  }
}