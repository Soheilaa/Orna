import { Component, OnInit } from '@angular/core';
import { products } from '../products'; 
import { Product } from '../product.model'; 
import { ProductModalComponent } from '../components/product-modal/product-modal.component';
import { WishlistService } from '../pages/wishlist/wishlist.service'; 
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bracelets',
  standalone: true,
  imports: [CommonModule, ProductModalComponent,MatIconModule],
  templateUrl: './bracelets.component.html',
  styleUrls: ['./bracelets.component.css'],
})
export class BraceletsComponent implements OnInit {
  
  filteredCollections: Product[] = [];

  selectedProduct: Product | null = null;
  selectedSize: string = '';
  activeSection: string = 'details';
  selectedCategory: string = 'all';
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
    this.filteredCollections = this.products.map(product => ({
      ...product,
      isFavorite: false,
    }));
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts(); 
  }

  filterProducts(range?: { min: number; max: number }) {
    if (this.selectedCategory !== 'all') {
      this.filteredCollections = this.products.filter(product => product.category === this.selectedCategory);
    } else {
      this.filteredCollections = this.products;
    }
    
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

  constructor(private router: Router, private wishlistService: WishlistService) {}

  navigateToProduct(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }
  

  toggleFavorite(product: Product) {
    product.isFavorite = !product.isFavorite;
    if (product.isFavorite) {
      this.wishlistService.addToWishlist(product);
    } else {
      this.wishlistService.removeFromWishlist(product);
    }
  }
  selectSize(size: string) {
    this.selectedSize = size;
    console.log('Selected size:', size);
  }
}
