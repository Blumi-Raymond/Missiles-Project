import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../classes/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(public server: HttpClient) { }
  // הניתוב הבסיסי
  basicUrl: string = "https://localhost:7160/api"
  // פונקציות הניגשות לשרת
  // מחזירה את כל הקטגוריות הקיימות במסד
  getAllCategory(): Observable<Array<Category>> {
    return this.server.get<Array<Category>>(`${this.basicUrl + "/Category"}`);
  }
}