import { Component, AfterViewInit, ElementRef, Renderer2   } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bracelets',
  standalone: true,
  imports:[CommonModule, CurrencyPipe, MatIconModule, FormsModule],
  templateUrl: './bracelets.component.html',
  styleUrls: ['./bracelets.component.css']
})

export class BraceletsComponent implements AfterViewInit {
  wishlist: any[] = [];

  products = [
    { name: 'Encircled Clasp Bangle', image: 'assets/bracelets/bracelets9.jpg', price: 100 },
    { name: 'Happy Birthday To You Charm Bracelet Set', image: 'assets/bracelets/bracelets15.jpg', price: 75 },
    { name: 'Heart Clasp Snake Chain Bracelet', image: 'assets/bracelets/braceletsIII.jpg', price: 250 },
    { name: 'Engravable Heart Clasp Snake Chain Bracelet', image: 'assets/bracelets/bracelets12.jpg', price: 120 },
    { name: 'Snake Chain Slider Bracelet', image: 'assets/bracelets/bracelets14.jpg', price: 75 },
    { name: 'Heart & Butterfly Bracelet Set', image: 'assets/bracelets/bracelets17.jpg', price: 75 },
    { name: 'Pavé Cuban Chain Bracelet', image: 'assets/bracelets/bracelets8.jpg', price: 75 },
    { name: 'Sparkling Tennis Bracelet', image: 'assets/bracelets/bracelets10.jpg', price: 120 },
    { name: 'Barrel Clasp Snake Chain Bracelet', image: 'assets/bracelets/bracelets11.jpg', price: 75 },
    { name: 'Barbed Wire Heart Bracelet Set', image: 'assets/bracelets/bracelets19.jpg', price: 110 },
    { name: 'Barrel Clasp Snake Chain Bracelet', image: 'assets/bracelets/bracelets11.jpg', price: 45 },
    { name: 'Small-Link Chain Bracelet', image: 'assets/bracelets/bracelets20.jpg', price: 75 },
    { name: 'Sparkling Infinity Heart Clasp Snake Chain Bracelet', image: 'assets/bracelets/bracelets6.jpg', price: 88 },
    { name: 'Studded Chain Bracelet', image: 'assets/bracelets/braceletsI5.jpg', price: 88 },
    { name: 'Sparkling Moon Clasp Snake Chain Bracelet', image: 'assets/bracelets/bracelets7.jpg', price: 88 },
    { name: 'Heart Clasp Snake Chain Bracelet', image: 'assets/bracelets/braceletsII.jpg', price: 200 },
    { name: 'Butterfly Clasp Snake Chain Bracelet', image: 'assets/bracelets/bracelets21.jpg', price: 88 },
    { name: 'Sparkling Tennis Bracelet', image: 'assets/bracelets/braceletsI.jpg', price: 195 },
    { name: 'Moments Snake Chain Bracelet', image: 'assets/bracelets/bracelets22.jpg', price: 75 },
    { name: 'Happy Birthday Balloon T-Bar Heart Bracelet Set', image: 'assets/bracelets/bracelets16.jpg', price: 160 },
    { name: 'Heart T-Bar Snake Chain Bracelet', image: 'assets/bracelets/bracelets23.jpg', price: 85 },
  ];

  priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $150', min: 100, max: 150 },
    { label: '$150 - $200', min: 150, max: 200 },
    { label: 'Above $200', min: 200, max: Infinity }
  ];

  selectedPriceRange: any = null;
  filteredProducts = [...this.products];

  showModal = false;
  selectedProduct: any = null;
  selectedSize: string = '';
  activeSection: string = '';
  hoveredProduct: any = null;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}
  
  openProductModal(product: any) {
    this.selectedProduct = product;
    setTimeout(() => {
      const modal = document.querySelector('.product-modal') as HTMLElement;
      modal.classList.add('open');
    }, 10); // Delay to allow DOM update
  }
  
  closeProductModal() {
    const modal = document.querySelector('.product-modal') as HTMLElement;
    modal.classList.remove('open');
    setTimeout(() => {
      this.selectedProduct = null;
    }, 300); // Match animation duration
  }

  selectSize(size: string) {
    this.selectedSize = size; // Update the selected size
  }

  isInWishlist(product: any): boolean {
    return this.wishlist.includes(product);
  }

  toggleWishlist(product: any): void {
    const index = this.wishlist.indexOf(product);
    if (index === -1) {
      this.wishlist.push(product); 
    } else {
      this.wishlist.splice(index, 1); 
    }
  }

  toggleSection(section: string) {
    this.activeSection = this.activeSection === section ? '' : section;
  }

  addToBag(product: any) {
    console.log('Adding product to bag:', product, 'Size:', this.selectedSize);
  }

  ngAfterViewInit() {
    const navbar = this.elRef.nativeElement.querySelector('.navbar');
    const modal = this.elRef.nativeElement.querySelector('.product-modal');

    if (navbar && modal) {
      const navbarHeight = navbar.clientHeight || 0;
      this.renderer.setStyle(modal, 'marginTop', `${navbarHeight}px`);
    }
  }

  filterByPrice(range: any) {
    this.selectedPriceRange = range;
    // Filter products based on the selected price range
    this.filteredProducts = this.products.filter(
      (product) => product.price >= range.min && product.price <= range.max
    );
  }

  isSortDropdownOpen = false; 
  selectedSortOption = 'Trending Now';
  sortOptions = ['Trending Now', 'New Arrivals', 'Best Seller', 'Highest Price', 'Lowest Price']; // Options list

  toggleSortDropdown(): void {
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
  }

  selectSortOption(option: string): void {
    this.selectedSortOption = option;
    this.isSortDropdownOpen = false; // Close dropdown after selection
    this.sortProducts(); // Trigger sorting logic
  }

  sortProducts(): void {
    console.log(`Sorting products by: ${this.selectedSortOption}`);
    // Add your sorting logic here based on the selectedSortOption value
  }

}

