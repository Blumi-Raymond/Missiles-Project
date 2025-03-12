import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CustomerService } from '../services/customer';
import { ProductService } from '../services/product';
import { ShoppingCartNewService } from '../services/shoppingCartNew';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public r: Router, public sCustomer: CustomerService, public sProduct: ProductService, public sShopping: ShoppingCartNewService) { }
  title = 'Missiles project';
}
