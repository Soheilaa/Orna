import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BraceletsComponent } from './bracelets/bracelets.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { NecklaceListComponent } from './necklace/necklace.component';
import { ProductDetailComponent } from '../app/components/product-details/product-details.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'bracelets', component: BraceletsComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'wishlist', component: WishlistComponent } ,
  { path: 'necklaces', component: NecklaceListComponent},
  { path: 'product-detail/:id', component: ProductDetailComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
