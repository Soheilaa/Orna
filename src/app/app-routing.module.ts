import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BraceletsComponent } from './bracelets/bracelets.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { NecklaceListComponent } from './necklace/necklace.component';
import { ProductDetailComponent } from '../app/components/product-details/product-details.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from '../app/components/checkout/checkout.component';
import { ShippingInfoComponent } from '../app/components/shipping-info/shipping-info.component';
import { CheckoutPaymentComponent } from '../app/components/checkout-payment/checkout-payment.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'bracelets', component: BraceletsComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'wishlist', component: WishlistComponent } ,
  { path: 'necklaces', component: NecklaceListComponent},
  { path: 'product-detail/:id', component: ProductDetailComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'shipping-info', component: ShippingInfoComponent},
  { path: 'checkout-payment', component: CheckoutPaymentComponent},
  { path: '', redirectTo: '/category/bracelets', pathMatch: 'full' },
  { path: 'category/bracelets', component: BraceletsComponent },
  { path: 'category/necklaces', component: NecklaceListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
