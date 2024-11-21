import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../pages/shopping-cart/shopping-cart.service';
import { Product } from '../../product.model';

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

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.cartCount = items.reduce((count, item) => count + item.quantity, 0);
      this.calculateTotalPrice(); // Calculate total price when cart items are updated
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity; // Assuming 'product.price' is the price of the item
    }, 0);
  }
  
  onQuantityChange(event: Event, productId: number, selectedSize: string): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '1';  // Default to '1' if no value is provided
    this.updateQuantity(productId, selectedSize, value);
  }

  updateQuantity(productId: number, selectedSize: string, quantity: string): void {
    const quantityNumber = Number(quantity);  // Convert to a number for calculations
    console.log(`Product ID: ${productId}, Size: ${selectedSize}, Quantity: ${quantityNumber}`);
    // Additional logic to update the cart with the new quantity
  }
  
  
  removeFromCart(productId: number, size: string): void {
    this.shoppingCartService.removeFromCart(productId, size);
  }

  getInputValue(event: Event): string {
    const inputElement = event.target as HTMLInputElement;
    return inputElement ? inputElement.value : '1'; 
  }
}
