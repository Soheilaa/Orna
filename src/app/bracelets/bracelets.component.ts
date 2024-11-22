import { Component, OnInit } from '@angular/core';
import { products } from '../products'; 
import { Product } from '../product.model'; 
import { ProductModalComponent } from '../components/product-modal/product-modal.component';
import { WishlistService } from '../pages/wishlist/wishlist.service'; 
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bracelets',
  standalone: true,
  imports: [CommonModule, ProductModalComponent, MatIconModule],
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
  selectedPriceRange: { min: number; max: number } | null = null;

  products: Product[] = products;

  sortOptions: string[] = ['Price: Low to High', 'Price: High to Low', 'Newest', 'Best Seller'];
  priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: 'Above $200', min: 200, max: 9999 },
  ];

  constructor(
    private router: Router,
    private wishlistService: WishlistService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryName = params['categoryName'];
      this.selectedCategory = categoryName || 'all'; // Default to 'all' if no category is provided
      this.filterProducts(); // Apply the filter whenever the route changes
    });

    this.filteredCollections = this.products.map(product => ({
      ...product,
      isFavorite: false,
    }));
  }

  selectCategory(category: string) {
    this.router.navigate([`/category/${category}`]); 
    this.selectedCategory = category;
    this.filterProducts();
  }

  filterProducts() {
    let filtered = this.products;
  
    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }
  
    // Filter by price range
    if (this.selectedPriceRange) {
      filtered = filtered.filter(
        product =>
          product.price >= this.selectedPriceRange?.min! &&
          product.price <= this.selectedPriceRange?.max!
      );
    }
  
    this.filteredCollections = filtered;
  }
  
  

  filterByPrice(range: { min: number; max: number }) {
    this.selectedPriceRange = range; 
    this.filterProducts();
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
      this.filteredCollections.sort((a, b) => a.price - b.price);
    } else if (option === 'Price: High to Low') {
      this.filteredCollections.sort((a, b) => b.price - a.price);
    }
  }

  quickShop(product: Product) {
    this.selectedProduct = product;
  }

  closeProductModal() {
    this.selectedProduct = null;
  }

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
