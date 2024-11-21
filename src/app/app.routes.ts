import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { BraceletsComponent } from './bracelets/bracelets.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { NecklaceListComponent } from './necklace/necklace.component';
import { ProductDetailComponent } from '../app/components/product-details/product-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'product-list', component: ProductListComponent },
    { path: 'cart', component: ShoppingCartComponent },
    { path: 'bracelets', component: BraceletsComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'necklaces', component: NecklaceListComponent},
    { path: 'product-detail/:id', component: ProductDetailComponent},
    { path: 'shopping-cart', component: ShoppingCartComponent},
];
