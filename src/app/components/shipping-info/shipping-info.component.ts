import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../pages/shopping-cart/shopping-cart.service'; 
import { Router } from '@angular/router'; 
import { Product } from '../../product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-shipping-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.css']
})
export class ShippingInfoComponent implements OnInit {

  currentStep = 2;  
  cartItems: { product: Product; quantity: number; selectedSize: string }[] = [];
  cartCount: number = 0;
  subtotal: number = 0;
  shipping: number = 7; // Flat rate for shipping
  shippingDiscount: number = 7; // Example discount
  totalPrice: number = 0;
  isStandardDelivery: boolean = false;  // Default to unchecked
  isExpressDelivery: boolean = false; 
  deliveryForm: FormGroup;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.deliveryForm = this.fb.group({
      firstname: [''],
      surname: [''],
      address: [''],
      zipcode: [''],
      country: [''],
      phone: [''],
      email: [''],
      newsletter: [false],
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

  goToNextStep(): void {
    const shippingInfo = this.deliveryForm.value;
    // Update service
    this.shoppingCartService.updateShippingInfo(shippingInfo);
  
    // Update delivery method
    const method = this.isExpressDelivery ? 'Express' : 'Standard';
    this.shoppingCartService.setDeliveryMethod(method);
  
    this.router.navigate(['/checkout-payment']);
  }
  
}
