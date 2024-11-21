import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product.model';
import { ShoppingCartService } from '../../pages/shopping-cart/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent {
  @Input() selectedProduct: Product | null = null;
  @Input() selectedSize: string = '';
  @Input() activeSection: string = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() addToWishlist = new EventEmitter<Product>();
  @Output() sizeSelected = new EventEmitter<string>();

  constructor(private shoppingCartService: ShoppingCartService) {}

  addToCart(): void {
    if (this.selectedProduct && this.selectedSize) {
      this.shoppingCartService.addToCart(this.selectedProduct, this.selectedSize);
    } else {
      alert('Please select a size first.');
    }
  }

  closeProductModal(): void {
    this.closeModal.emit();
  }

  isInWishlist(product: Product): boolean {
    return false; // Implement wishlist logic here
  }

  toggleWishlist(product: Product | null): void {
    if (product) {
      this.addToWishlist.emit(product);
    }
  }

  selectSize(size: string): void {
    this.sizeSelected.emit(size);
  }

  toggleSection(section: string): void {
    this.activeSection = this.activeSection === section ? '' : section;
  }
}
