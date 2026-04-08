import { Component, inject, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  auth = inject(AuthService);

  isMenuOpen = false;
  userDropOpen = false;
  dropdownState: any = {
    about: false,
    members: false,
    committees: false,
    registration: false,
    beneficiaries: false,
    division: false
  };

  openLogin() {
    this.auth.modalMode.set('login');
    this.auth.showModal.set(true);
    this.closeMenu();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(menu: string) {
    if (window.innerWidth <= 992) {
      Object.keys(this.dropdownState).forEach(key => {
        this.dropdownState[key] = key === menu ? !this.dropdownState[key] : false;
      });
    }
  }

  openDropdown(menu: string) {
    if (window.innerWidth > 992) {
      this.dropdownState[menu] = true;
    }
  }

  closeDropdown(menu: string) {
    if (window.innerWidth > 992) {
      this.dropdownState[menu] = false;
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    Object.keys(this.dropdownState).forEach(key => this.dropdownState[key] = false);
  }

  logout() {
    this.auth.logout();
    this.closeMenu();
  }
}