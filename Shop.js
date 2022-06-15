const Category = {
    food,
    clothes
}
class Product {
    #code;
    #name;
    #category;    
    #price;
    #amount;
    constructor(code, name, category, price, amount) {
        this.#code = code;
        this.#name = name;
        this.#category = category;
        this.#price = price;
        this.#amount = amount;
    }
    setCode(code) {
        this.#code = code;
    }
    getCode() {
        return this.#code;
    }
    setName(name) {
        this.#name = name;
    }
    getName() {
        return this.#name;
    }
    setCategory(c) {
        this.#category = c;
    }
    getCategory() {
        return this.#category;
    }
    setPrice(price) {
        this.#price = price;
    }
    getPrice() {
        return this.#price;
    }
    getAmount() {
        return this.#amount;
    }
    addAmount() {
        this.#amount++;
    }
    lessAmount() {
        if (this.#amount > 0) {
            this.#amount--;
        }
    }
    setAmount(amount) {
        this.#amount = parseInt(amount);
    }
}

class Shop {
    #products;
    constructor() {
        this.#products = new Array();
    }
    //החזרת מערך המוצרים
    getProducts() {
        return this.#products;
    }
    //הוספת מוצר לרשימה
    addProduct(p) {
        const ans = this.#products.find(t => t.getName() === p.getName());
        console.log(ans);
        if (ans != undefined)
            ans.setAmount(p.getAmount());
        else
            this.#products.push(p);
    }
    // מחיקת מוצר לגמרי
    deleteProduct(code) {
        console.log(code);
        const arr = this.#products.filter(c => c.getCode() != code);
        console.log(arr);
        return arr;
    }

    //פונקציות חיפוש

    //חיפוש לפי id
    searchById(arr, id) {
        console.log(id);
        const ans = arr.filter(f => f.getCode() === id);
        console.log(ans);
        return ans;
    }
    //חיפוש לפי שם
    searchByName(arr, name) {
        const pro = arr.filter(p => p.getName() === name);
        if (pro != null) {
            return pro;
        }
        else {
            console.log("not exist!");
        }
    }
    //חיפוש לפי טווח מחיר
    searchByPrice(arr, min, max) {
        const pByPrice = arr.filter(f => f.getPrice() >= min && f.getPrice() <= max);
        return pByPrice;
    }
    //חיפוש לפי קטגוריה
    searchByCategory(arr, c) {
        const pByCategory = arr.filter(e => e.getCategory() === c);
        return pByCategory;
    }
    //חיפוש מוצרים שאזלו מהמלאי
    searchFinishAmount(arr) {
        const pFinish = arr.filter(c => c.getAmount() == 0)
        return pFinish;
    }
}
//
let p1 = new Product(111, 'bread', "food", 6, 20);
let p2 = new Product(111, 'bread', "food", 6, 20);
let p3 = new Product(222, 'milk', "food", 5, 5);
let p4 = new Product(333, 'shirt', "clothes", 50, 0);
let p5 = new Product(444, 'shoko', "food", 8, 5);
let s = new Shop();
s.addProduct(p1);
s.addProduct(p2);
s.addProduct(p3);
s.addProduct(p4);
s.addProduct(p5);
console.log(s.getProducts());
console.log(s.searchByName(s.getProducts(), "bread"));
console.log(s.searchByPrice(s.getProducts(), 4, 5));
console.log(s.searchByCategory(s.getProducts(), "food"));
console.log(s.searchFinishAmount(s.getProducts()));
console.log("!!!!!!!!!!!!!!!!!");
//
////
const pCode = document.querySelector('#code');
const pName = document.querySelector('#name');
const pCategory = document.querySelector('#category');
const pPrice = document.querySelector('#price');
const pAmount = document.querySelector('#amount');
const list = document.querySelector('#list');
const addbtn = document.querySelector('#addbtn');
const updatebtn = document.querySelector('#updatebtn');
const form = document.querySelector('#save');
const search = document.querySelector('#search');
let AllList = s.getProducts();
let currentList = AllList;
console.log(currentList);
const boolSearch = [false, false, false, false];
console.log(boolSearch);

//אפשרות לחיפוש על חיפוש
search.onclick = (e) => {
    console.log("search1");
    e.preventDefault();
    for (let index = 0; index < boolSearch.length; index++) {
        if (boolSearch[index] == true) {
            switch (index) {
                case 0: currentList = s.searchByName(currentList, inputName.value);
                    break;
                case 1: currentList = s.searchByPrice(currentList, min.value, max.value);
                    break;
                case 2: currentList = s.searchByCategory(currentList, ByCategory.value);
                    break;
                case 3: currentList = s.searchFinishAmount(AllList);
                    break;
            }
        }
    }
    console.log("search2");
    printProducts(currentList);
}

//הוספה
addbtn.onclick = (e) => {
    e.preventDefault();
    let newProduct = new Product(parseInt(pCode.value), pName.value, pCategory.value, parseInt(pPrice.value), parseInt(pAmount.value));
    console.log(newProduct);
    s.addProduct(newProduct);
    printProducts(s.getProducts());
    console.log(s.getProducts());
    pCode.value = "";
    pCode.value = "";
    pName.value = "";
    pCategory.value = "";
    pPrice.value = "";
    pAmount.value = "";
}
//מחיקה
const delProduct = document.querySelector('#delProduct');
const inputDel = document.querySelector('#inputDel');
delProduct.onclick = (e) => {
    e.preventDefault();
    printProducts(s.deleteProduct(inputDel.value));
}
//עדכון
updatebtn.onclick = (e) => {
    e.preventDefault();
    const p = s.searchById(s.getProducts(), parseInt(pCode.value));
    if (p) {
        p.setName = pName.value;
        p.setCategory = pCategory.value;
        p.setPrice = pPrice.value;
        p.setAmount = pAmount.value;
        console.log(s.getProducts());
        printProducts(s.getProducts());
        pCode.value = "";
        pName.value = "";
        pCategory.value = "";
        pPrice.value = "";
        pAmount.value = "";
    }
}
//הדפסת רשימת המוצרים
list.onclick = (e) => {
    e.preventDefault();
    printProducts(s.getProducts());
};
//חיפוש לפי שם
const searchByName = document.querySelector('#searchByName');
const inputName = document.querySelector('#inputName');
searchByName.onclick = (e) => {
    boolSearch[0] = true;
    // console.log(inputName.value);
    // e.preventDefault();
    // printProducts(s.searchByName(AllList, inputName.value));
}
//חיפוש לפי טווח
const searchByRange = document.querySelector('#searchByRange');
const min = document.querySelector('#min');
const max = document.querySelector('#max');
searchByRange.onclick = (e) => {
    boolSearch[1] = true;
    // e.preventDefault();
    // printProducts(s.searchByPrice(AllList, min.value, max.value));
}
//חיפוש לפי קטגוריה
const ByCategory = document.querySelector('#ByCategory');
console.log(ByCategory.value);
ByCategory.onchange = (e) => {
    if (ByCategory.value != "") {
        console.log("--"+ByCategory.value+"--");
        boolSearch[2] = true;
        // e.preventDefault();
        // printProducts(s.searchByCategory(AllList, ByCategory.value));
    }
}
//חיפוש לפי מלאי
const searchByAmount = document.querySelector('#searchByAmount');
searchByAmount.onclick = (e) => {
    boolSearch[3] = true;
    // e.preventDefault();
    // printProducts(s.searchFinishAmount(AllList));
}
//
let hCode = null;
let hName = null;
let hCategory = null;
let hPrice = null;
let hAmount = null;
let div = null;
let add = null;
let less = null;
let update = null;
const listProducts = document.querySelector('#listProducts');
//פונקציה להדפסת המוצרים
const printProducts = (arr) => {
    console.log(arr);
    console.log(boolSearch);
    console.log("printProducts");
    listProducts.innerHTML = "";
    arr.forEach(p => {
        update = document.createElement('button');
        add = document.createElement('button');
        less = document.createElement('button');
        div = document.createElement('div');
        hCode = document.createElement('span');
        hName = document.createElement('span');
        hCategory = document.createElement('span');
        hPrice = document.createElement('span');
        hAmount = document.createElement('span');
        hCode.innerHTML = "id: " + p.getCode();
        hName.innerHTML = "name: " + p.getName();
        hCategory.innerHTML = "category: " + p.getCategory();
        hPrice.innerHTML = "price: " + p.getPrice();
        hAmount.innerHTML = "amount: " + p.getAmount();
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.padding = "20px";
        div.style.alignItems = "end";
        add.innerHTML = "+";
        less.innerHTML = "-";
        add.style.width = "20px";
        less.style.width = "20px";
        update.innerHTML = "update";
        div.append(hCode, hName, hCategory, hPrice, hAmount, add, less, update);
        listProducts.append(div);
        //הוספת כמות
        add.onclick = (e) => {
            e.preventDefault();
            p.addAmount();
            printProducts(s.getProducts());
        }
        //חיסור כמות
        less.onclick = (e) => {
            e.preventDefault();
            p.lessAmount();
            printProducts(s.getProducts());
        }
        //מילוי הטופס לעדכון
        update.onclick = (e) => {
            console.log("uuuuuuu");
            e.preventDefault();
            pCode.value = p.getCode();
            pName.value = p.getName();
            pCategory.value = p.getCategory();
            pPrice.value = p.getPrice();
            pAmount.value = p.getAmount();
        }
    });
    for (let index = 0; index < boolSearch.length; index++) {
        boolSearch[index] = false;
    }
    console.log("---------------");
    console.log(boolSearch);
    currentList = AllList;
    console.log(AllList);
    ByCategory.value="";
}
//
