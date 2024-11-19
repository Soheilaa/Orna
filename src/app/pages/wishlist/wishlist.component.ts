import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist/wishlist.service';
import { Product } from '../../product.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],

})
export class WishlistComponent implements OnInit {
  wishlist: Product[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlistService.wishlist$.subscribe((wishlist) => {
      this.wishlist = wishlist; // Subscribe to wishlist changes
    });
  }

  removeFromWishlist(product: Product) {
    this.wishlistService.removeFromWishlist(product);
  }
}
