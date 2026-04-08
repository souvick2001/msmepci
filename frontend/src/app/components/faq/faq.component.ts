import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  openIndex = signal<number | null>(0);

  faqs = [
    { q: 'What is MSME PCI?', a: 'MSME Promotion Council India (MSME PCI) is a government-recognized body dedicated to supporting the growth, development, and empowerment of Micro, Small, and Medium Enterprises across India.' },
    { q: 'How can my business register with MSME PCI?', a: 'You can register through our online portal or visit our nearest office. Registration involves submitting basic business details, Udyam certificate, and owner identification documents.' },
    { q: 'What training programs are available?', a: 'We offer programs in skill development, manufacturing techniques, digital literacy, financial management, and export readiness — all tailored specifically for MSME owners and workers.' },
    { q: 'Is there any fee for membership?', a: 'We offer both free basic membership and premium membership tiers with additional benefits like priority liaison services, dedicated support, and exclusive networking events.' },
    { q: 'How does MSME PCI help with government schemes?', a: 'Our team assists MSMEs in identifying applicable government schemes, preparing documentation, and navigating the application process for subsidies, loans, and certifications.' },
  ];

  toggle(i: number) {
    this.openIndex.update(v => v === i ? null : i);
  }
}
