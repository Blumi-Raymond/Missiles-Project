import { Component } from '@angular/core';
import { ShoppingCartNewService } from '../../services/shoppingCartNew';
import { CustomerService } from '../../services/customer';
import { Router } from '@angular/router';
import { Shopping } from '../../classes/shopping';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor(public sShoppingCart: ShoppingCartNewService, public sCustomer: CustomerService, public r: Router) { }
  // הגדרת משתנים
  currentShopping: Shopping | undefined

//ובו מבצע קריאת שרת Service פונקציה הניגשת ל
  payment() {
    // אם עדיין לא עודכן המשתמש הנוכחי נגדירו כעת
    if (this.sShoppingCart.ShoppingCartNew!.shopping!.codeCustomer == undefined) {
      this.sShoppingCart.ShoppingCartNew!.shopping!.codeCustomer = this.sCustomer.currentCustomer.id
    }
    // מוסיף קניה
    this.sShoppingCart.add(this.sShoppingCart.ShoppingCartNew!).subscribe(
      succ => {
        console.log(succ);
        this.currentShopping = succ
        console.log("עבד!!!!!!!!");
        // נאפס את הסל הנוכחי אחר סיום התשלום
        this.sShoppingCart.ShoppingCartNew = undefined;
        this.sShoppingCart.cart=undefined
      },
      error => {
        console.log(error);
        console.log("לא עובד😒😒😒😒😒😒😒😒😒😒");
      }
    )
  }
}
