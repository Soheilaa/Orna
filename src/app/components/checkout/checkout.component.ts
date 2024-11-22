import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../pages/shopping-cart/shopping-cart.service'; // Import your service
import { Router } from '@angular/router';
import { Product } from '../../product.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

 
  deliveryForm: FormGroup;
  currentStep = 1;
  cartItems: { product: Product; quantity: number; selectedSize: string }[] = [];
  cartCount: number = 0;
  subtotal: number = 0;
  shipping: number = 7; // Flat rate for shipping
  shippingDiscount: number = 7; // Example discount
  totalPrice: number = 0;

  constructor(
    private fb: FormBuilder,
    private shoppingCartService: ShoppingCartService, 
    private router: Router
  ) {
    // Initialize the form group here
    this.deliveryForm = this.fb.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      zipcode: ['', Validators.required],
      conutry: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newsletter: [false]
    });
  }

  ngOnInit(): void {
    this.shoppingCartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.cartCount = items.reduce((count, item) => count + item.quantity, 0);
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.subtotal = this.cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    this.totalPrice = this.subtotal + this.shipping - this.shippingDiscount;
  }

  onSubmit(): void {
    if (this.deliveryForm.valid) {
      alert('Form is valid. Proceeding to next step.');
    }
  }

  goToNextStep() {
    this.router.navigate(['/shipping-info']);
  }
}
