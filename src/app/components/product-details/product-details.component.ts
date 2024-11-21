import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../product.model';
import { products } from '../../products';
import { necklaces } from '../../necklace/necklaces'
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ShoppingCartService } from '../../pages/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})


export class ProductDetailComponent implements OnInit {

  product: Product | undefined;

  
  selectedSize: string = '';
  isInfoOpen: boolean = false;
  isShippingOpen: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = [...products, ...necklaces].find((item) => item.id === productId); 
  }
  goBack(): void {
    this.router.navigate(['/product-list']); // Navigate to the previous page (update the path as needed)
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  addToCart(product: Product | undefined): void {
    if (!product || !this.selectedSize) {
      alert('Please select a size first.');
      return;
    }

    this.shoppingCartService.addToCart(product, this.selectedSize);
  }
  
  toggleFavorite(product: Product | undefined): void {
    if (!product) return; 
    product.isFavorite = !product.isFavorite;
    console.log('Product favorite state toggled:', product.isFavorite);
  }

  toggleSection(section: string): void {
    if (section === 'info') {
      this.isInfoOpen = !this.isInfoOpen;
    } else if (section === 'shipping') {
      this.isShippingOpen = !this.isShippingOpen;
    }
  }
}
