import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../product.model';


@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartItems: { product: Product; quantity: number; selectedSize: string }[] = [];
  private cartSubject = new BehaviorSubject<{ product: Product; quantity: number; selectedSize: string }[]>([]);

  get cartItems$() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product, size: string): void {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id && item.selectedSize === size
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1, selectedSize: size });
    }

    this.cartSubject.next(this.cartItems);
  }

  updateQuantity(productId: number, size: string, quantity: number): void {
    const item = this.cartItems.find(
      (item) => item.product.id === productId && item.selectedSize === size
    );
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId, size);
      } else {
        this.cartSubject.next(this.cartItems);
      }
    }
  }

  removeFromCart(productId: number, size: string): void {
    this.cartItems = this.cartItems.filter(
      (item) => !(item.product.id === productId && item.selectedSize === size)
    );
    this.cartSubject.next(this.cartItems);
  }

  getCartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }
}
