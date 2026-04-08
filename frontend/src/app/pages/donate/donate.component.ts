import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.scss'
})
export class DonateComponent {
  selectedAmount: number | null = null;

  selectAmount(amount: number) {
    this.selectedAmount = this.selectedAmount === amount ? null : amount;
  }
}