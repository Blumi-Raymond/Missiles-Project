import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../classes/product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(public server: HttpClient) { }
    // הניתוב הבסיסי
    basicUrl: string = "https://localhost:7160/api/Product";
    // המוצר עליו לחצו לדוגמא בשביל לדעת על מי לחצו לפרטים נוספים
    currentProduct: Product = new Product()
    // שומר את כל המוצרים לפעמים מסוימים שחבל לבצע קריאות שרת
    allProducts: Array<Product> = new Array<Product>();

    // פונקציות הניגשות לשרת
    // מחזירה את כל המוצרים הקיימים במסד
    getAllProduct(): Observable<Array<Product>> {
        return this.server.get<Array<Product>>(this.basicUrl + "/all")
    }

    //  מחזירה את כל המוצרים הקיימים במסד לפי הסינון שביצעו 
    // stringQuery ולכן שולחים ב
    getByAll(idCategory?: Array<number>, idCompany?: Array<number>, minPrice?: number, maxPrice?: number): Observable<Array<Product>> {
        const params: { [key: string]: string } = {};
        if (idCategory !== undefined) {
            idCategory.forEach((id, index) => {
                params[`idCategory[${index}]`] = id.toString();
            });
        }
        if (idCompany !== undefined) {
            idCompany.forEach((id, index) => {
                params[`idCompany[${index}]`] = id.toString();
            });
        }
        if (minPrice !== undefined) params['minPrice'] = minPrice.toString();
        if (maxPrice !== undefined) params['maxPrice'] = maxPrice.toString();
        return this.server.get<Array<Product>>(this.basicUrl, { params });
    }
    // מחזירה את 10 המוצרים הזולים ביותר הקיימים במסד
    getTenProduct(): Observable<Array<Product>> {
        return this.server.get<Array<Product>>(this.basicUrl + "/ten")
    }
}