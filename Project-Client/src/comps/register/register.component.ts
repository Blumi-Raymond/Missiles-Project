import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../classes/customer';
import { CustomerService } from '../../services/customer';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(public cService: CustomerService, public r: Router) { }
  // הגדרת משתנים
  newUser: Customer = new Customer()
  //ובו מבצע קריאת שרת Service פונקציה הניגשת ל
  getAllCustomer() {
    this.cService.getAllCustomers().subscribe(
      succ => {
        // מחפש את האימייל במסד
        const cUser = succ.find(c => c.email == this.newUser.email)
        // אם לא קיים- מוסיף אותו למסד 
        if (!cUser) {
          this.addCustomer(this.newUser)
        }
        else {
          // אם קיים---
          this.cService.currentCustomer = cUser
          Swal.fire({
            title: 'אימייל כבר קיים', text: 'עליך לשנות את כתובת המייל שהזנת או תכנס דרך הכניסה',
            icon: 'warning',
            confirmButtonText: 'אישור',
          })
          console.log("משתמש כבר רשום במערכת");
          console.log(this.cService.currentCustomer);
          console.log(cUser);
        }
      },
      error => {
        console.log("error");
      }
    )
  }
  // ניגשת לשרת ומוסיפה משתמש חדש
  addCustomer(newUser: Customer) {
    this.cService.addCostomer(newUser).subscribe(
      succ => {
        debugger
        this.cService.currentCustomer = succ
        console.log(succ);
        console.log(this.cService.currentCustomer!);
        this.r.navigate(['product'])
      },
      error => {
        alert(error.message)
      }
    )
  }
  //בודק אם המשתמש רשום Submit בעת 
  // ופועל לפי זה
  register() {
    this.getAllCustomer()
  }
}
