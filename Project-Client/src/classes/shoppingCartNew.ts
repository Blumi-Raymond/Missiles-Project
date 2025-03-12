import { Product } from "./product";
import { Shopping } from "./shopping";

export class ShoppingCartNew {
    constructor(public shopping?: Shopping,
        public products?: Array<Product>) { }
}
