import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../classes/customer';
import { CustomerService } from '../../services/customer';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(public cService: CustomerService, public r: Router, public l: Location) { }
  // הגדרת משתנים
  user: Customer = new Customer()

  //בודק אם המשתמש רשום Submit בעת 
  login() {
    this.getAllCustomer()
  }
  //ובו מבצע קריאת שרת Service פונקציה הניגשת ל
  getAllCustomer() {
    this.cService.getAllCustomers().subscribe(
      succ => {
        console.log(succ);
        console.log(this.user);
        // מחפש אם המשתמש כבר רשום
        const cUser = succ.find(c => c.email == this.user.email)
        console.log("cUser");
        console.log(cUser);
        // אם רשום מעביר אותו לדף המוצרים
        if (cUser && cUser.passwordCostomer == this.user.passwordCostomer) {
          this.cService.currentCustomer = cUser
          this.r.navigate(['product'])
          console.log(this.cService.currentCustomer);
        }
        // אחרת מעביר לדף הרשמה
        else {
          this.r.navigate(['register'])
        }
      },
      error => {
        console.log("error");
      }
    )
  }

}
