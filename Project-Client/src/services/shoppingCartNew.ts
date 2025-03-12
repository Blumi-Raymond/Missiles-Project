import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../classes/product";
import { ShoppingCartNew } from "../classes/shoppingCartNew";
import { CustomerService } from "./customer";
import { ProductService } from "./product";
import { Shopping } from "../classes/shopping";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartNewService {
    constructor(public server: HttpClient, public r: Router, public sCustomer: CustomerService, public sProduct: ProductService) { }
    // הניתוב הבסיסי
    basicUrl: string = "https://localhost:7160/api/ShoppingCartNew";
    // אוביקט של הסל  ששייך למשתמש הנוכחי
    ShoppingCartNew: ShoppingCartNew | undefined
    // מונה לכמות המוצרים שהוזמנו
    cart: number | undefined
    // מערך של המוצרים שנגמרו 
    outOfStockProducts: Array<any> = [];

    //ShoppingCartNew- מוסיפה מוצר לסל  לרשימת המוצרים שבאוביקט
    addProduct(product: Product) {
        // בדיקה אם עגלת הקניות קיימת, ואם לא - יצירה שלה
        if (!this.ShoppingCartNew) {
            this.ShoppingCartNew = new ShoppingCartNew();
            this.ShoppingCartNew.shopping = new Shopping();
            this.ShoppingCartNew.products = [];
        }
        // מציאת המוצר במלאי
        var data = this.sProduct.allProducts!.find(p => p.id == product.id);
        if (!data || data.qty === 0) {
            console.log(data);
            alert("אין כמות במלאי");
            console.log("כמות במלאי: " + data!.qty);
            return 0;
        }
        // חיפוש המוצר בעגלת הקניות
        var cartProduct = this.ShoppingCartNew.products!.find(p => p.id == product.id);
        // בדיקה אם המוצר כבר בעגלת הקניות
        // אם לא מוסיפה אוביקט שלו לרשימה
        if (!cartProduct) {
            this.ShoppingCartNew.products!.push({ ...product, qty: 1 });
            console.log(this.ShoppingCartNew.products);
        }
        // אחרת-מוסיפה רק לכמות 1
        else {
            cartProduct.qty!++;
        }
        if (this.cart == undefined) {
            this.cart = 1
        }
        else
            this.cart++
        if (this.sCustomer.currentCustomer)
            this.ShoppingCartNew.shopping!.codeCustomer = this.sCustomer.currentCustomer.id;
        else
            this.ShoppingCartNew.shopping!.codeCustomer = 0
        this.ShoppingCartNew.shopping!.payment = (this.ShoppingCartNew.shopping!.payment || 0) + product.price!;
        this.ShoppingCartNew.shopping!.id = 0
        this.ShoppingCartNew.shopping!.comment = null
        this.ShoppingCartNew.shopping!.dateShopping = new Date().toISOString().split('T')[0];
        return cartProduct ? cartProduct.qty! : 1;
    }
    // מחיקת מוצר מהסל
    removeProduct(product: Product) {
        if (!this.ShoppingCartNew) {
            this.ShoppingCartNew = new ShoppingCartNew();
            this.ShoppingCartNew.shopping = new Shopping();
            this.ShoppingCartNew.products = [];
            console.log(this.ShoppingCartNew);
            return 0;
        }
        var cartProduct = this.ShoppingCartNew.products?.find(p => p.id == product.id)
        if (cartProduct && cartProduct.qty! > 0) {
            cartProduct.qty!--
            this.cart!--
            if (cartProduct.qty == 0) {
                const index = this.ShoppingCartNew.products?.indexOf(cartProduct)
                if (index != -1) {
                    this.ShoppingCartNew.products!.splice(index!, 1)
                }
            }
            this.ShoppingCartNew.shopping!.payment = (this.ShoppingCartNew.shopping!.payment || 0) - product.price!;
            return cartProduct ? cartProduct.qty! : 1;
        }
        return 0;
    }
    // בדיקה אם המוצרים שהמשתמש בחר עדיין קיימים 
    checkInStock() {
        // בודק קודם אם המשתמש מחובר
        if (this.sCustomer.currentCustomer.id == undefined) {
            console.log("user" + this.sCustomer.currentCustomer)
            Swal.fire({
                title: 'אינך מחובר', text: 'אנא התחבר כדי להמשיך',
                icon: 'warning',
                confirmButtonText: 'אישור',
                showCancelButton: true,
                cancelButtonText: 'ביטול'

            }).then((result) => {
                if (result.isConfirmed)
                    this.r.navigate(['/login'])
            })
        }
        // בודק אם קיים סל קניות
        else if (this.ShoppingCartNew) {
            this.sProduct.getAllProduct().subscribe(
                succ => {
                    for (let pc of this.ShoppingCartNew!.products!) {
                        const products = succ.find(p => p.id === pc.id)
                        console.log("Product:" + products!.qty);
                        if (products!.qty! < pc.qty!) {
                            this.outOfStockProducts.push({ pc: pc, p: products!.qty });
                            console.log(this.outOfStockProducts);

                        }
                    }
                    if (this.outOfStockProducts.length > 0) {
                        let message = 'למוצרים הבאים הכמות לא מספיקה:'
                        for (let product of this.outOfStockProducts) {
                            console.log("product");
                            console.log(product);
                            message += `${product.pc.nameProducts}----כמות זמינה : ${product.p} , `
                        }
                        this.outOfStockProducts = []
                        if (this.sCustomer.currentCustomer.id != undefined) {
                            Swal.fire({
                                title: 'חסר במלאי',
                                text: message,
                                icon: 'warning',
                                confirmButtonText: 'בסדר'
                            });
                        }
                    }
                    else if (this.sCustomer.currentCustomer.id) {
                        this.r.navigate(['/payment'])
                    }
                },
                error => {
                    console.log("error")
                    console.log(error)
                }
            )
        }
        // אם לא ביצע הזמנה
        else {
            Swal.fire({
                text: 'עדיין לא ביצעת הזמנה ',
                icon: 'warning',
                confirmButtonText: 'אישור',
            })

        }
    }

    //  מוסיפה קניה למאגר במסד
    add(cart: ShoppingCartNew): Observable<Shopping> {
        return this.server.post<Shopping>(this.basicUrl, cart, {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
