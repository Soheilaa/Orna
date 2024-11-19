import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { products } from '../../products';
import { Product } from '../../product.model';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { BraceletsComponent } from '../../bracelets/bracelets.component'; 


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatIconModule, CommonModule, ProductModalComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent implements OnInit {
  braceletsComponent = BraceletsComponent;
  isBraceletsPage = true;
  filteredCollections: Product[] = [];
  selectedProduct: Product | null = null;
  selectedSize: string = '';
  activeSection: string = 'details';
  selectedCategory: string = 'all'; // Default category
  selectedSortOption: string = '';
  isSortDropdownOpen: boolean = false;

  products: Product[] = products;

  sortOptions: string[] = ['Price: Low to High', 'Price: High to Low', 'Newest', 'Best Seller'];
  priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: 'Above $200', min: 200, max: 9999 },
  ];

  ngOnInit() {
    this.filteredCollections = this.products;
  }
  

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts(); // Reapply filters based on the selected category
  }

  filterProducts(range?: { min: number; max: number }) {
    // Filter by category
    if (this.selectedCategory !== 'all') {
      this.filteredCollections = this.products.filter(product => product.category === this.selectedCategory);
    } else {
      this.filteredCollections = this.products;
    }

    // Apply additional price filter if provided
    if (range) {
      this.filteredCollections = this.filteredCollections.filter(product =>
        product.price >= range.min && product.price <= range.max
      );
    }
  }

  filterByPrice(range: { min: number; max: number }) {
    this.filterProducts(range);
  }

  toggleSortDropdown() {
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
  }

  selectSortOption(option: string) {
    this.selectedSortOption = option;
    this.sortProducts(option);
  }

  sortProducts(option: string) {
    if (option === 'Price: Low to High') {
      this.filteredCollections.sort((a: Product, b: Product) => a.price - b.price);
    } else if (option === 'Price: High to Low') {
      this.filteredCollections.sort((a: Product, b: Product) => b.price - a.price);
    }
  }

  quickShop(product: Product) {
    this.selectedProduct = product;
  }

  closeProductModal() {
    this.selectedProduct = null;
  }

  toggleWishlist(product: Product) {
    const currentWishlist = localStorage.getItem('wishlist');
    let wishlist: Product[] = currentWishlist ? JSON.parse(currentWishlist) : [];

    const productIndex = wishlist.findIndex(p => p.id === product.id);
    if (productIndex === -1) {
      wishlist.push(product);
      console.log('Product added to wishlist:', product);
    } else {
      wishlist.splice(productIndex, 1);
      console.log('Product removed from wishlist:', product);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  isProductInWishlist(product: Product): boolean {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return wishlist.some((p: Product) => p.id === product.id);
  }

  selectSize(size: string) {
    this.selectedSize = size;
    console.log('Selected size:', size);
  }
}
