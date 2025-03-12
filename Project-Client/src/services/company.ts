import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Company } from "../classes/company";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(public server: HttpClient) { }
  // הניתוב הבסיסי
  basicUrl: string = "https://localhost:7160/api"
  // פונקציות הניגשות לשרת
  // מחזירה את כל החברות הקיימות במסד
  getAllCompany(): Observable<Array<Company>> {
    return this.server.get<Array<Company>>(`${this.basicUrl + "/Company"}`);
  }
}