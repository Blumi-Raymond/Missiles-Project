import { Routes } from '@angular/router';
import { HomeComponent } from '../comps/home/home.component';
import { ProductComponent } from '../comps/product/product.component';
import { LoginComponent } from '../comps/login/login.component';
import { RegisterComponent } from '../comps/register/register.component';
import { ShoppingCartComponent } from '../comps/shopping-cart/shopping-cart.component';
import { ProductDetailComponent } from '../comps/product-detail/product-detail.component';
import { PaymentComponent } from '../comps/payment/payment.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent, 'title': 'home' },
    {path: 'product', component: ProductComponent, 'title': 'products'},
    { path: 'productsDetail', component: ProductDetailComponent, 'title': 'productsDetail' },

    { path: 'shoppingCart', component: ShoppingCartComponent, 'title': 'shoppingCart' },

    { path: 'login', component: LoginComponent, 'title': 'login' },

    { path: 'payment', component: PaymentComponent, 'title': 'payment' },

    { path: 'register', component: RegisterComponent, 'title': 'register' },
    { path: '', component: HomeComponent, 'title': 'home' }


];
