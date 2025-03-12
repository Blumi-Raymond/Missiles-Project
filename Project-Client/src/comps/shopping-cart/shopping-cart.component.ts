import { Component } from '@angular/core';
import { ShoppingCartNewService } from '../../services/shoppingCartNew';
import { Product } from '../../classes/product';
import { NgClass } from '@angular/common';
import { ProductService } from '../../services/product';
import { Router } from '@angular/router';
import { AddRemoveComponent } from '../add-remove/add-remove.component';
@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NgClass, AddRemoveComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})

export class ShoppingCartComponent {
  constructor(public sShoppingCart: ShoppingCartNewService, public sProduct: ProductService, public r: Router) { }
  // בלחיצה על פרטים נוספים-מעבר לקומפוננטה הזאת
  // ושמירה במשתנה אחורי את המוצר עליו לחצו
  details(p: Product) {
    this.sProduct.currentProduct = p
    this.r.navigate([`productsDetail`])
  }
  // בכדי לשלוח את המוצר שבכל המוצרים ולא את המוצר שבסל 
  // נחפש ונשלח את המשתנה הנכון
  product(p: number) {
    var product = this.sProduct.allProducts.find(pr => pr.id == p);
    console.log(product);
    return product
  }
  // ימחק לגמרי את המוצר מהסל גם אם בחרו כמה
  delete(product: Product) {
    var indexDelete = this.sShoppingCart.ShoppingCartNew?.products?.findIndex(x => x.id == product.id)
    this.sShoppingCart.ShoppingCartNew?.products?.splice(indexDelete!, 1)
    this.sShoppingCart.cart! -= product.qty!
  }
}

