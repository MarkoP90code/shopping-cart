
//.forEach()
//class
//constructor()
//.find()
//.toFixed()
//ISPOD IMAM I OBJANJENJE ZA JEDAN DEO.

const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");

let isCartShowing = false;
const products = [                                  //Array sa pproductima.
    {                                               //Unutar array-a pravimo objekte da bi detaljnije opisao svaki item (id, name, price, category). Step 6. - You now need to start adding products. Before you do that, you need to consider the structure of your product data. A product will need a unique identifier to distinguish it from other products, a price so people know how much it costs, and a name so people know what they are buying. You should also add a category to each product.
        id: 1,
        name: "Vanilla Cupcakes (6 Pack)",
        price: 12.99,
        category: "Cupcake",
    },
    {
        id: 2,
        name: "French Macaron",
        price: 3.99,
        category: "Macaron",
    },
    {
        id: 3,
        name: "Pumpkin Cupcake",
        price: 3.99,
        category: "Cupcake",
    },
    {
        id: 4,
        name: "Chocolate Cupcake",
        price: 5.99,
        category: "Cupcake",
    },
    {
        id: 5,
        name: "Chocolate Pretzels (4 Pack)",
        price: 10.99,
        category: "Pretzel",
    },
    {
        id: 6,
        name: "Strawberry Ice Cream",
        price: 2.99,
        category: "Ice Cream",
    },
    {
        id: 7,
        name: "Chocolate Macarons (4 Pack)",
        price: 9.99,
        category: "Macaron",
    },
    {
        id: 8,
        name: "Strawberry Pretzel",
        price: 4.99,
        category: "Pretzel",
    },
    {
        id: 9,
        name: "Butter Pecan Ice Cream",
        price: 2.99,
        category: "Ice Cream",
    },
    {
        id: 10,
        name: "Rocky Road Ice Cream",
        price: 2.99,
        category: "Ice Cream",
    },
    {
        id: 11,
        name: "Vanilla Macarons (5 Pack)",
        price: 11.99,
        category: "Macaron",
    },
    {
        id: 12,
        name: "Lemon Cupcakes (4 Pack)",
        price: 12.99,
        category: "Cupcake",
    },
];

//2.
products.forEach(({name, id, price, category}) => {             //Ovde u zagradi imam destructuring.
    dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button id="${id}" class="btn add-to-cart-btn">Add to cart</button>
      </div>
    `;
});


//3. jedan i dva nisam obelezio ali to je sve ovo iznad.
class ShoppingCart {                        //Ovo je valjda kao constructor function. Ima i u wordu. https://www.w3schools.com/js/js_classes.asp 
    constructor() {                         //constructor() je method koji ide uz class.
      this.items = [];
      this.total = 0;
      this.taxRate = 8.25;
    }

    addItem(id, products) {                 //Ovo je method tj funkcija koja je povezana sa objektom (ima u wordu tamo pod constructor function samo ovde malo drugacije zadajemo). Step 17. - The first parameter, id, is the id of the product the user has added to their cart. The second parameter, products, is an array of product objects. By using a parameter instead of directly referencing your existing products array, this method will be more flexible if you wanted to add additional product lists in the future.
        const product = products.find(item => item.id === id)           //Trazi prvi product koji ce proci test item.id === id i onda je return taj product.
        const {name, price} = product;                                  //Ovde radim destructuring. Pravim const name i price od product objecta iznad. A to ce u stvari biti name i price od products.
        this.items.push(product);           //Ovde pusujem product u items array gore ali mora da pise this.item.
        
        const totalCountPerProduct = {};                //Step 21. - You now need a total count of each product that the user has in the cart. Declare a totalCountPerProduct variable, and assign it an empty object.
        this.items.forEach(dessert => {
        totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;     //* ispod.
    })
        const currentProductCount = totalCountPerProduct[product.id];
        const currentProductCountSpan = document.getElementById(`product-count-for-id${product.id}`);   //Prvi put kad dodajem item ovaj getElement ne postoji (stavio sam console.log ispod da proverim, izbaci null), tek se kreira ispod posto currentProductCount nije > 1. Pa onda ako opet dodamo isti item ce pronaci taj element.
        // console.log(currentProductCountSpan)
        //Ovo ispod je ternary? truthy : falsy. Rastavio sam na redove da bude preglednije
        currentProductCount > 1 ?       //Proverava da li je current product vec ubacen u shopping cart. Step 27. - The behaviour of the addItem method needs to change if the product is already in the cart or not. Create a ternary that checks if the current product is already in the cart.
        currentProductCountSpan.textContent = `${currentProductCount}x` : 
        productsContainer.innerHTML += `<div class=product id=dessert${id}>
                                        <p><span class="product-count" id="product-count-for-id${id}"></span>${name}</p>
                                        <p>${price}</p>
                                        </div>`;
    }

    getCounts() {
        return this.items.length;       //Dodali smo novi method koji broji koliko ima itema u korpi.   Step 41. - You need a way to access the total number of items in the cart. The best way to do this is to add another method to your ShoppingCart class, rather than accessing the items array directly. Add a getCounts method to the ShoppingCart class. It should return the number of items in the items array.
    }

    calculateTaxes(amount) {
        return parseFloat(((this.taxRate / 100) * amount).toFixed(2));       //taxRate je zadato gore.  **** Ispod.
    }      

    calculateTotal() {
        const subTotal = this.items.reduce((total, item) => total + item.price, 0);     //*** Ispod.
        const tax = this.calculateTaxes(subTotal);   //OVDE MORAM THIS DA STAVIM JER TAKO POKAZUJEM DA JE UNUTAR OBJECTA. KOLIKO SAM PROVERIO I OVO BI RADILO cart.calculateTaxes(subTotal) (cart je const koju sam ispod zadao) i ovo new ShoppingCart().calculateTaxes(subTotal).
        this.total = subTotal + tax;    //total mi je vrednost koju imam zadatu unutar objekta.
        cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
        cartTaxes.textContent = `$${tax.toFixed(2)}`;               //Ovde i ispod mislim da ne treba toFixed jer je vec odradjeno ranije.
        cartTotal.textContent = `$${this.total.toFixed(2)}`;
        return this.total;

        // cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
        // cartTaxes.textContent = tax;
        // console.log(subTotal)
        // console.log(tax)
    } 

    clearCart() {
        if (!this.items.length) {           //Ovde proveravam da li je this.items array prazan. Ako je prazan onda je length nula. NULA JE FALSY VALUE. ZATO STAVLJAM "!" PA JE ONDA NULA TRUTHY VALUE.
            alert("Your shopping cart is already empty");
            return;
        }
        const isCartCleared = confirm("Are you sure you want to clear all items from your shopping cart?");
        //Step 56. - Browsers have a built-in confirm() function which displays a confirmation prompt to the user. 
        //confirm() accepts a string, which is the message displayed to the user. It returns TRUE if the user 
        //confirms, and FALSE if the user cancels.
        
        if (isCartCleared) {        //Ovo gore confirm() je prompt i izbacice "ok" ili "cancel". Pise iznad da ako stisnem ok da ce return biti TRUE. Znaci ako sam potvrdio radi ovo ispod.
            this.items = [];
            this.total = 0;
            productsContainer.innerHTML = "";
            totalNumberOfItems.textContent = `$0`;      //Na kursu su oni samo 0 stavili.
            cartSubTotal.textContent = `$0`;
            cartTaxes.textContent = `$0`;
            cartTotal .textContent = `$0`;
          }
    }
  };


//4.
const cart = new ShoppingCart(); //testiranje.  **ISPOD
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");         //Ovde targeturjem svu dugmad koju sam dodao u koraku 2 gore.
[...addToCartBtns].forEach((btn) => {btn.addEventListener("click", event=>{       //Posto imam vise istih dugmica, addToCartBtns je collection(slicno array-u, ali nije array) zato forEach nece raditi pa zato treba da uradim ...spread da bi addToCartBtns postao pravi array.
    cart.addItem(Number(event.target.id), products)
    totalNumberOfItems.textContent = cart.getCounts();
    cart.calculateTotal();
    
    // console.log(cart.getCounts())
    // console.log(cart.calculateTotal())
    // console.log(cart.items[0])
    // console.log(cart.items.length)
}
)});    


//5.
cartBtn.addEventListener("click", () => {
    isCartShowing = !isCartShowing;             //Gore imamo zadato da je isCartShoving = false pa smo ga ovako promenuli u true.   Step 38. - Start by inverting the value of isCartShowing. Remember that you can use the logical not operator ! to invert the value of a boolean. Assign the inverted value to isCartShowing.
    showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";         //ternary expression.
    cartContainer.style.display = isCartShowing ? "block" : "none";         //Ovde menjam CSS display proparty izmedju block i none. Ima u wordu i ovo i koja je razlika u odnosu na visibility:hidden. https://www.w3schools.com/jsref/prop_style_display.asp
})

clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));          //.bind() ima u wordu i na googlu https://www.w3schools.com/js/js_function_bind.asp 



// OBJASNJENJE
// U koraku 4. ovde 
// const addToCartBtns = document.getElementsByClassName("add-to-cart-btn"); targetujem svu 
// dugmad add-to-cart-button (njih smo dodali u koraku 2.)

// Onda ispod radim [...addToCartBtns], objasnjeno je gore u tom redu sto radim to. Onda dodajem event listener
// na svako dugme. Kad kliknem dugme pokrecem tri funkcije tj tri method() posto se funkcija vezana za
// objekat zove method() (to znam od ranije). 

// Pokrece se cart.addIdem(), cart.getCounts(), cart.calculateTotal(), a ovde je cart objekat koji smo
// dobili kad smo pozvali constructor function new ShoppingCart() (pre sam ucio da je construktor function
//     ovde se valjda zove klasa, fora je sto je malo drugacije zadana nego kad sam pre radio).

// Ovde cart.addItem(Number(event.target.id), products) prosledjujem u addItem method dva parametra
// Number(event.target.id) (sto je id dugmeta) i products sto je array koji smo gore zadali.

// Onda addItem method radi sledece
// const product = products.find(item => item.id === id)        //Trazi prvi product koji ce proci test item.id === id i onda je return taj product.
//         const {name, price} = product;                       //Ovde radim destructuring. Pravim const name i price od product objecta iznad. A to ce u stvari biti name i price od products.
//         this.items.push(product);      
// Objasnicu npr za dugme koje ima id 3.
// Ovde ce find da nadje taj object unutar products array-a i onda pravi dve konstante (name i price ali ovde
//     je uradjen destructuring).
// Znaci za nas slicaj gde je id = 3 dobicemo da je name = "Pumpkin Cupcake", a price = 3.99.
// Posle toga se product object ubacuje u this.items array koji smo zadali.

// Znaci this.item array nije vise =[], nego je    =[
//                                                 {id: 3,
//                                                 name: "Pumpkin Cupcake",
//                                                 price: 3.99,
//                                                 category: "Cupcake",
//                                                 }]

// Onda radim ovo:
// const totalCountPerProduct = {};                //Step 21. - You now need a total count of each product that the user has in the cart. Declare a totalCountPerProduct variable, and assign it an empty object.
//         this.items.forEach(dessert => {
//         totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;     //* ispod.
//     })
// Ovde trazimo koliko puta imamo svaki produkt u korpi. Objasnjeno je pod "*" sta se desava.

// Onda se radi ovo:
// const currentProductCount = totalCountPerProduct[product.id];
//         const currentProductCountSpan = document.getElementById(`product-count-for-id${product.id}`);   //Prvi put kad dodajem item ovaj getElement ne postoji (stavio sam console.log ispod da proverim, izbaci null), tek se kreira ispod posto currentProductCount nije > 1. Pa onda ako opet dodamo isti item ce pronaci taj element.
//         // console.log(currentProductCountSpan)
//         //Ovo ispod je ternary? truthy : falsy. Rastavio sam na redove da bude preglednije
//         currentProductCount > 1 ?       //Proverava da li je current product vec ubacen u shopping cart. Step 27. - The behaviour of the addItem method needs to change if the product is already in the cart or not. Create a ternary that checks if the current product is already in the cart.
//         currentProductCountSpan.textContent = `${currentProductCount}x` : 
//         productsContainer.innerHTML += `<div class=product id=dessert${id}>
//                                         <p><span class="product-count" id="product-count-for-id${id}"></span>${name}</p>
//                                         <p>${price}</p>
//                                         </div>`;

// Posto sam samo jednom stisnuo dugme sa id=3 onda je currentProductCount = 1.
// Za const currentProductCountSpan =... objanjenje sam vec gore napisao.
// Posto je u currentProductCount = 1 sto znaci da nije > 1 onda se izvrsava falsy deo ternary statement-a
// i kreira se div koji ispisuje ime produkta i cenu produkta. Ovde treba obratiti paznju da imam += kad 
// dodajem div jer ako dodam jos nesto treba mi da se taj idem doda, a ne da se stari obrise, a novi doda.

// Onda ako opet stisnem dugme sa id=3 onda se pokrece truthy deo statementa sto dodaje "2x" ispred
// imena artikla. Ako opet stisnem pisace "3x". 




// ****
// .toFixed(2) ogranicava broj na samo 2 decimale i pretvara broj u string. Ogrnicavam jer kad kompjuter radi sa decimalama desavaju se greske. Npr 0.1 + 0.2 nije 0.3 (IMA U WORDU).
// posto toFixed pravi string onda treba uraditi parseFloat() da bi dobili number.




// ***
// calculateTotal() {
//     const subTotal = this.items.reduce((total, item) => total + item.price, 0);    
//   }
// Ovde imam implicit return. Inicijalna vrednost je nula, znaci u prvoj iteraciji je total = 0 i na to
// se dodaje item.price (morali smo da stavimo .price zato sto je this.item array ispunjena objektima
// pa da bi ptistupili price properiju stavljamo .price). 
// U drugoj iteraciji je total ono sto smo dobili u prvoj iteraciji i na to se dodaje sledeci item.price.
// Tako ce se sabrati sve cene i dobicemo ukupnu cenu.




// **
// const cart = new ShoppingCart();                //Pravim novi objekat. 
//   const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");          //Ovde targeturjem svu dugmad koju sam dodao u koraku 2 gore.
//   [...addToCartBtns].forEach((btn) => {btn.addEventListener("click", event=>{        //Posto imam vise istih dugmica, addToCartBtns je collection(slicno array-u, ali nije array) zato forEach nece raditi pa zato treba da uradim ...spread da bi addToCartBtns postao pravi array.
//         cart.addItem(Number(event.target.id), products)         //The target property returns the element where the event occured. Ima na googlu https://www.w3schools.com/jsref/event_target.asp
//   }
//   )});     
// Znaci target targeturje dugme i onda uzimamo id ali TARGET RETURNUJE STRING U OVOM SLUCAJU, a posto 
// nama treba broj dodali smo Number ispored Number(event.target.id). products je array koji smo zadali gore.



//   *
//   Ovde smo prvo zadali
//   totalCountPerProduct[dessert.id] = totalCountPerProduct[dessert.id] + 1;
//   ali smo onda dodali || 0 zato sto je totalCountPerProduct prazan object i onda kad hocemo
//   da pristupimo property-ju izbacuje undefined pa kad na to dodamo 1 izbaci NaN. Zato treba ovako
//   totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;

//   Znaci ako je dessert.id (sto je u stvari product.id) jednako 3 onda posle prvog dodavanja u korpu
//   imam totalCountPerProduct = {3: 1}, ovde je 1 zbog 0+1. Kad opet dodamo imamo {3: 2}, 
//   zato sto je 2 jednako 1+1.
  
//   totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1; OVDE JE 
//   totalCountPerProduct[dessert.id] SA LEVE STRANE IME PROPERTY-JA, A SA DESNE VREDNOST PROPERTY-JA.
//   DA PONOVIM OVO JE BRACKET NOTATION.

//   Objasnjenje na engleskom
//   Step 24. - You now have a small bug. When you try to access a property of an object and 
//   the property doesn't exist, you get undefined. This means if the dessert isn't already present 
//   in the totalCountPerProduct object, you end up trying to add 1 to undefined, which results in NaN.
//   To fix this, you can use the || operator to set the value to 0 if it doesn't exist. Wrap your right-hand 
//   totalCountPerProduct[dessert.id] in parentheses, and add || 0 to the end of the expression.
  