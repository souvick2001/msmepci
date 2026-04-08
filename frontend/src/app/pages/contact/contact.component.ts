import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('+91 ', [Validators.required, Validators.pattern('^[+][9][1][ ]?[6-9][0-9]{9}$')]),
    message: new FormControl('', [Validators.required, Validators.maxLength(1000)])
  });

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);
      alert('Message Sent Successfully!');
      this.contactForm.reset({ phone: '+91 ' }); // Reset but keep the country code
    }
  }
}