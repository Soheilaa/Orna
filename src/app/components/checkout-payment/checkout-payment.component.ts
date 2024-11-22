import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartService } from '../../pages/shopping-cart/shopping-cart.service';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  
  deliveryForm: FormGroup;
  currentStep: number = 3;
  shippingInfo: { name: string; address: string; city: string; postalCode: string; phone: string } = {
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  };

  billingSameAsShipping: boolean = true;

  cardNumber: string = '';
  cvv: string = '';
  expiryDate: string = '';
  cardHolderName: string = '';
  paymentOption: string = 'creditCard';
  
  cartCount: number = 0;
  selectedDeliveryMethod: string = '';
  deliveryPrice: number = 0;
  subtotal: number = 0;
  shipping: number = 0;
  discount: number = 0;
  totalPrice: number = 0;

  acceptTerms: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private shoppingCartService: ShoppingCartService,
    private cdr: ChangeDetectorRef
  ) {
    this.deliveryForm = this.formBuilder.group({
      firstname: [''],
      surname: [''],
      address: [''],
      zipcode: [''],
      country: [''],
      phone: [''],
      email: [''],
      newsletter: [false]
    });
  }

  ngOnInit(): void {
    this.shoppingCartService.shippingInfo$.subscribe(info => {
      if (info) {
        this.shippingInfo = info;

        this.deliveryForm.patchValue({
          firstname: info.firstname,
          surname: info.surname,
          address: info.address,
          zipcode: info.zipcode,
          country: info.country,
          phone: info.phone,
          email: info.email,
          newsletter: info.newsletter
        });

        this.selectedDeliveryMethod = info.isExpressDelivery ? 'Express Delivery' : 'Standard Delivery';
      }
    });

    this.deliveryPrice = this.shoppingCartService.getDeliveryMethod() === 'Express' ? 15 : 0;
  }

  placeOrder() {
    if (this.acceptTerms) {
      console.log('Order placed!');
    } else {
      console.error('Please accept the terms to place the order.');
    }
  }

  editDelivery() {
    console.log('Editing delivery details');
    // Logic for editing the delivery information can go here.
  }

  editDeliveryMethod() {
    console.log('Editing delivery method');
    // Logic for editing the delivery method can go here.
  }

  updateDeliveryForm(newData: any) {
    this.deliveryForm.patchValue({
      firstname: newData.firstname || '',
      surname: newData.surname || '',
      address: newData.address || '',
      zipcode: newData.zipcode || '',
      country: newData.country || '',
      phone: newData.phone || '',
      email: newData.email || '',
      newsletter: newData.newsletter || false
    });
  }

  goToStep(step: number) {
    this.currentStep = step;
    this.cdr.detectChanges();  // Manually trigger change detection
  }
}
