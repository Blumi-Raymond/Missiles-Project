import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../classes/product';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category';
import { CompanyService } from '../../services/company';
import { Category } from '../../classes/category';
import { Company } from '../../classes/company';
import { AddRemoveComponent } from '../add-remove/add-remove.component';
import { ShoppingCartNewService } from '../../services/shoppingCartNew';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgClass, FormsModule, AddRemoveComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  constructor(public sProduct: ProductService, public r: Router, public sCategory: CategoryService,
    public sCompany: CompanyService, public sShoppingCart: ShoppingCartNewService) { }
  // יתבצע בעת טעינת הדף
  // יוצג ישר על המסך כל הקטגוריות ,כל המוצרים,והחברות
  ngOnInit(): void {
    this.getAllProduct()
    this.getAllCategory()
    this.getAllCompany()
  }
  // הגדרת משתנים
  allCategory: Array<Category> = new Array<Category>
  allCompany: Array<Company> = new Array<Company>
  allProducts: Array<Product> = new Array<Product>()
  byPrice: Array<Product> = new Array<Product>()
  category: Array<number> = new Array<number>()
  company: Array<number> = new Array<number>()
  //בשביל הסינונים Json הגדרת 
  filters = {
    category: this.category,
    company: this.company,
    minPrice: null as number | null,
    maxPrice: null as number | null,
  }
  //ובהם מבצעות קריאות שרת Service פונקציות הניגשות ל
  // הצגת המוצרים ע"י קריאת שרת
  getAllProduct() {
    this.sProduct.getAllProduct().subscribe(
      succ => {
        this.allProducts = succ
        this.sProduct.allProducts = succ
      },
      error => {
        console.log("error");
        console.log(error);
      }
    )
  }
  // הצגת 10 המוצרים הזולים ביותר ע"י קריאת שרת
  getTenProduct() {
    this.sProduct.getTenProduct().subscribe(
      succ => {
        this.allProducts = succ
      },
      error => {
        console.log("error");
        console.log(error);
      }
    )
  }
  // הצגת כל הקטגוריות ע"י קריאת שרת
  getAllCategory() {
    this.sCategory.getAllCategory().subscribe(
      succ => {
        console.log(succ);

        this.allCategory = succ
      },
      error => {
        return error
      }

    )
  }
  // הצגת כל החברות ע"י קריאת שרת
  getAllCompany() {
    this.sCompany.getAllCompany().subscribe(
      succ => {
        this.allCompany = succ
      },
      error => {
        return error
      }

    )
  }
  // שליחת המשתנה שבו הצבנו את כל הסינונים שבחר המשתמש
  getByAll(filters: { category: Array<number> | null; company: Array<number> | null; minPrice: number | null; maxPrice: number | null }) {
    const category = filters.category !== null ? filters.category : undefined
    const company = filters.company !== null ? filters.company : undefined
    const minPrice = filters.minPrice !== null ? filters.minPrice : undefined
    const maxPrice = filters.maxPrice !== null ? filters.maxPrice : undefined
    this.sProduct.getByAll(category, company, minPrice, maxPrice).subscribe(
      succ => {
        console.log(succ);
        this.allProducts = succ
      },
      error => {
        console.log(error);
      }
    );
  }
  // בלחיצה על פרטים נוספים-מעבר לקומפוננטה הזאת
  // ושמירה במשתנה אחורי את המוצר עליו לחצו
  allDetails(current: Product) {
    this.sProduct.currentProduct = current
    this.r.navigate(['productsDetail'])
  }

  // סינונים
  // נציב באבויקט שיצרנו את כל הקטגוריות שהמשתמש בחר לסנן
  categoryChanged(event: any, category: number) {
    if (event.target.checked) {
      this.filters.category.push(category);
      console.log(this.filters.category);
    } else {
      const index = this.filters.category.indexOf(category);
      if (index !== -1) {
        this.filters.category.splice(index, 1);
        console.log(this.filters.category);
      }
    }
  }
  // נציב באוביקט שיצרנו את כל המוצרים שהמשתמש בחר לסנן
  companyChanged(event: any, company: number) {
    if (event.target.checked) {
      this.filters.company.push(company);
      console.log(this.filters.company);
    } else {
      const index = this.filters.company.indexOf(company);
      if (index !== -1) {
        this.filters.company.splice(index, 1);
        console.log(this.filters.company);
      }
    }
  }
  // נציב באביקט שיצרנו את כל המחירים שבטווח שהמשתמש בחר לסנן
  updateMinPrice() {
    if (this.filters.minPrice !== null && this.filters.maxPrice !== null && this.filters.minPrice > this.filters.maxPrice) {
      this.filters.maxPrice = this.filters.minPrice;
    }
  }
  updateMaxPrice() {
    if (this.filters.minPrice !== null && this.filters.maxPrice !== null && this.filters.maxPrice < this.filters.minPrice) {
      this.filters.minPrice = this.filters.maxPrice;
    }
  }


  //לבצע קריאת שרת json בלחיצה על הכפתור נשלח את ה
  filter() {
    this.getByAll(this.filters);
  }
  // נציב במתנה הזה את הבחירה של המשתמש
  toSort: string = "0"
  // נבצע מיון לפי בחירת המשתמש
  sortSelect() {
    switch (this.toSort) {
      case '0':
        this.getAllProduct()
        break;
      case '1':
        this.allProducts.sort((a, b) => a.price! - b.price!);
        break;
      case '2':
        this.allProducts.sort((a, b) => a.nameProducts!.localeCompare(b.nameProducts!));
        break;
      case '3':
        this.allProducts.sort((a, b) => a.nameCompany!.localeCompare(b.nameCompany!));
        break;
      case '4':
        this.allProducts.sort((a, b) => a.nameCategory!.localeCompare(b.nameCategory!));
        break;
      default:
        this.allProducts.sort((a, b) => new Date(a.lastUpdatedDate!).getTime() - new Date(b.lastUpdatedDate!).getTime());
        break;
    }

  }

}


