import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../product.model';

@Injectable({
  providedIn: 'root', // Singleton service
})
export class WishlistService {
  private wishlist = new BehaviorSubject<Product[]>([]); // Reactive state for wishlist
  wishlist$ = this.wishlist.asObservable();

  addToWishlist(product: Product) {
    const currentWishlist = this.wishlist.getValue();
    // Prevent duplicate entries
    if (!currentWishlist.some((item) => item.id === product.id)) {
      this.wishlist.next([...currentWishlist, product]);
    }
  }

  removeFromWishlist(product: Product) {
    const currentWishlist = this.wishlist.getValue();
    const updatedWishlist = currentWishlist.filter((item) => item.id !== product.id);
    this.wishlist.next(updatedWishlist);
  }

  getWishlist() {
    return this.wishlist.getValue();
  }
}
