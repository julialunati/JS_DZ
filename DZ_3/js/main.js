const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let button = document.querySelector('button.btn-cart').addEventListener('click', () => {
    document.getElementById('light').style.display = 'block'; document.getElementById('fade').style.display = 'block'
})

class ProductList {
    #goods;

    constructor(container = '.products') {
        this.container = container;
        this.#goods = [];
        this._allProducts = [];

        this.#getProducts().then((data) => {
            this.#goods = [...data];
            this.#render();
            this.workWithBasket();
        });

        console.log(this.sum());
    }

    #getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    workWithBasket() {
        document.querySelectorAll('button.buy-btn').forEach((button) => {
            button.addEventListener('click', () => {
                button.innerHTML = "Добавлено";
                let elem = { title: "indefined", price: button.parentNode.childNodes[3].innerHTML.slice(0, -1), id: button.parentNode.parentNode.getAttribute('data-id') };
                let selectedToCart = new CartItem(elem);
                let block = document.querySelector('.cartProducts');
                block.insertAdjacentHTML('beforeend', selectedToCart.getCartHTML());
                this.getNewPrice();
                fetch(`${API}/addToBasket.json`)
                    .then(response => console.log(response.json()));
                document.querySelectorAll('button.btn-delete').forEach((button) => {
                    button.addEventListener('click', () => {
                        button.parentNode.parentNode.innerHTML = " ";
                        this.getNewPrice();
                        fetch(`${API}/deleteFromBasket.json`)
                            .then(response => console.log(response.json()))
                    });
                });
            });
        });
    }

    sum() {
        return this.#goods.reduce((sum, { price }) => sum + price, 0);
    }

    #render() {
        const block = document.querySelector(this.container);

        for (let product of this.#goods) {
            const productObject = new ProductItem(product);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.getGoodHTML());
        }
    }

    getNewPrice() {
        let postPrice = document.querySelector('div.total');
        postPrice.innerHTML = "";
        let insertTotal = document.querySelectorAll('p.price');
        let sum = 0;
        for (let i = 0; i < insertTotal.length; i++) {
            sum = sum + parseInt(insertTotal[i].innerHTML);
        }
        postPrice.insertAdjacentHTML('beforeend', `<span>Cумма заказа составит: ${sum}</span> руб.`);
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    getGoodHTML() {
        return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
            </div>`;
    }
}

const list = new ProductList();

//  корзина 

class Cart {
    #cartGoods;

    constructor(container = '.cartProducts') {
        this.container = container;
        this.#cartGoods = [];
        this._allProducts = [];

        this.#getProducts().then((data) => {
            this.#cartGoods = [...data.contents];
            this.#render();
            this.price();
            this.deleteFromBasket();
        });
    }

    #getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    deleteFromBasket() {
        document.querySelectorAll('button.btn-delete').forEach((button) => {
            button.addEventListener('click', () => {
                button.parentNode.parentNode.innerHTML = "";
                this.getNewPrice();
                fetch(`${API}/deleteFromBasket.json`)
                    .then(response => console.log(response.json()))
            });
        });
    }

    price() {
        let totalSum = this.#cartGoods.reduce((sum, { price }) => sum + price, 0);;
        document.querySelector('div.total').insertAdjacentHTML('beforeend', `<span>Cумма заказа составит: ${totalSum}</span> руб.`)
    }

    getNewPrice() {
        let postPrice = document.querySelector('div.total');
        postPrice.innerHTML = "";
        let insertTotal = document.querySelectorAll('p.price');
        let sum = 0;
        for (let i = 0; i < insertTotal.length; i++) {
            sum = sum + parseInt(insertTotal[i].innerHTML);
        }
        postPrice.insertAdjacentHTML('beforeend', `<span>Cумма заказа составит: ${sum}</span> руб.`);
    }

    #render() {
        const block = document.querySelector(this.container);

        for (let product of this.#cartGoods) {
            const productObject = new CartItem(product);

            this._allProducts.push(productObject);

            block.insertAdjacentHTML('beforeend', productObject.getCartHTML());
        }
    }
}

class CartItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    getCartHTML() {
        return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p class="price">${this.price} \u20bd</p>
                  <button class="btn-delete">Удалить</button>
              </div>
            </div>`;
    }
}

//отрисовывает элемент сохраненные в корзине 
let cart = new Cart();
