import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CartComponent } from './products/cart/cart.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { CheckoutComponent } from './products/checkout/checkout.component';
import { AuthGuard } from './auth/auth.guard';
import { OrderComponent } from './products/order/order.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'products/new-product', component: NewProductComponent, canActivate: [AuthGuard]},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'products/:id/edit', component: ProductEditComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
