import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../classes/product';
import { Location, NgClass } from '@angular/common';
import { AddRemoveComponent } from '../add-remove/add-remove.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgClass, AddRemoveComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  constructor(public sProduct: ProductService, public l: Location) { }
  // יתבצע בעת טעינת הדף
  ngOnInit(): void {
    this.product = this.sProduct.currentProduct
  }
  // הגדרת משתנים
  product: Product = new Product()
  //פונקציה שמחזירה לעמוד הקודם בו היה המשתמש 
  back() {
    this.l.back()
  }
  // מחפשת את המוצר עליו לחצו בכדי להראות את פרטיו הנוספים
  pProduct(p: number) {
    var product = this.sProduct.allProducts.find(pr => pr.id == p);
    console.log(product);
    return product
  }
}

