export class Product {
    constructor(public id?: number, public nameProducts?: string, public codeCategory?: number, public codeCompany?: number,
        public price?: number, public qty?: number, public lastUpdatedDate?: Date,
        public nameCategory?: string, public nameCompany?: string, public descriptions?: string, public images?: string) { }
}