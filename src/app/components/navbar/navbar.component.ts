import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatTooltipModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  isSidebarOpen = false;
  showDropdown = false;
  isNavbarOpen = false;
  showCategories = false;

  categories = [
    { name: 'ALL COLLECTIONS', link: '/product-list', image: 'assets/all.jpg' },
    { name: 'Bracelets', link: '/bracelets', image: 'assets/bracelets/bracelets.webp' },
    { name: 'Rings', link: '/rings', image: 'assets/rings.webp' },
    { name: 'Necklaces', link: '/necklaces', image: 'assets/necklaces.webp' },
    { name: 'Earrings', link: '/earrings', image: 'assets/earrings.webp' },
    { name: 'New In', link: '/new-in', image: 'assets/newin.webp' },
  ];

  navigateToCategory(link: string) {
    this.showCategories = false; 
    window.location.href = link;
  }

  toggleCategoriesDropdown() {
    this.showCategories = !this.showCategories;
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
