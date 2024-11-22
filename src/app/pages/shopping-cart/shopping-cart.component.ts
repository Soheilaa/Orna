import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../pages/shopping-cart/shopping-cart.service';
import { Product } from '../../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: { product: Product; quantity: number; selectedSize: string }[] = [];
  cartCount: number = 0;
  totalPrice: number = 0;

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.cartCount = items.reduce((count, item) => count + item.quantity, 0);
      this.calculateTotalPrice(); 
    });
  }

  redirectToShop() {
    this.router.navigate(['']); 
  }
  
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity; 
    }, 0);
  }
  
  onQuantityChange(event: Event, productId: number, selectedSize: string): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '1';  
    this.updateQuantity(productId, selectedSize, value);
  }

  updateQuantity(productId: number, selectedSize: string, quantity: string): void {
    const quantityNumber = Number(quantity);  
    console.log(`Product ID: ${productId}, Size: ${selectedSize}, Quantity: ${quantityNumber}`);
  }
  
  
  removeFromCart(productId: number, size: string): void {
    this.shoppingCartService.removeFromCart(productId, size);
  }

  getInputValue(event: Event): string {
    const inputElement = event.target as HTMLInputElement;
    return inputElement ? inputElement.value : '1'; 
  }

  decreaseQuantity(productId: number, selectedSize: string): void {
    const item = this.cartItems.find(
      (cartItem) =>
        cartItem.product.id === productId && cartItem.selectedSize === selectedSize
    );
    if (item && item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }
  
  increaseQuantity(productId: number, selectedSize: string): void {
    const item = this.cartItems.find(
      (cartItem) =>
        cartItem.product.id === productId && cartItem.selectedSize === selectedSize
    );
    if (item) {
      item.quantity++;
      this.updateCart();
    }
  }
  
  updateCart(): void {
    this.cartCount = this.cartItems.reduce((count, item) => count + item.quantity, 0);
    this.calculateTotalPrice();
  }

  addToWishlist(productId: number): void {
    console.log(`Product ID: ${productId} added to wishlist`);
    // Logic to add the product to the wishlist
  }

  payNow() {
    this.router.navigate(['/checkout']);
  }
  
}
