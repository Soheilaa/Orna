import { Component,OnInit  } from '@angular/core';
import { Product } from '../../product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
  wishlist: Product[] = [];
  ngOnInit(): void {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
    }
  }

  removeFromWishlist(product: Product) {
    this.wishlist = this.wishlist.filter(item => item.id !== product.id);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }
}
