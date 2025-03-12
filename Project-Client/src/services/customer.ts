import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Customer } from "../classes/customer";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(public server: HttpClient) { }
    // הניתוב הבסיסי
    basicUrl: string = "https://localhost:7160/api/Customer";
    // המשתמש העכשווי לכל הפעמים שנצטרך להשתמש בו
    currentCustomer: Customer = new Customer()
    
    // פונקציות הניגשות לשרת
    // מחזירה את כל המשתמשים הקיימים במסד
    getAllCustomers(): Observable<Array<Customer>> {
        return this.server.get<Array<Customer>>(this.basicUrl)
    }
    // מוסיפה משתמש חדש למאגר במסד
    addCostomer(customer: Customer): Observable<Customer> {
        return this.server.post<Customer>(this.basicUrl, customer)
    }
}