import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BraceletsComponent } from './bracelets/bracelets.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component'

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'bracelets', component: BraceletsComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'wishlist', component: WishlistComponent } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
