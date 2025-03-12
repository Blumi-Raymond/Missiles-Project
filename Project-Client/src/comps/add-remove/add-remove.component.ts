import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartNewService } from '../../services/shoppingCartNew';
import { Product } from '../../classes/product';

@Component({
  selector: 'app-add-remove',
  standalone: true,
  imports: [],
  templateUrl: './add-remove.component.html',
  styleUrl: './add-remove.component.css'
})
export class AddRemoveComponent implements OnInit {
  constructor(public sShoppingCart: ShoppingCartNewService) { }
  ngOnInit(): void {
    this.calculateCount()
  }
  @Input() count: number | undefined = 0;
  @Input() p: Product = new Product()

  add() {
    this.count = this.sShoppingCart.addProduct(this.p!);
  }

  remove() {
    this.count = this.sShoppingCart.removeProduct(this.p!);
  }
  calculateCount() {
    if (!this.sShoppingCart.ShoppingCartNew)
      return 0;
    var data = this.sShoppingCart.ShoppingCartNew!.products!.find(details =>
      details.id == this.p.id
    );
    console.log("calculateCount: " + data);
    if (data) {
      this.count = data.qty;
      return this.count;
    }
    return 0;
  }
}

