const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',

    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        searchLine: '',
        filtered: [],
        allProducts: [],
        visible: false,
        plug: 'Корзина пуста'
    },

    methods: {

        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(product) {
            console.log(product.id_product)
        },

        filterProduct() {
            if (this.searchLine == "") {
                this.products = this.allProducts; //при удалении запроса из поискового поля покажет все товары 
            } else {
                const regexp = new RegExp(this.searchLine, 'i');
                this.filtered = this.products.filter(product => regexp.test(product.product_name));
                this.products = this.filtered;
            }
        },
    },
    
    created() {
        console.log('created');
        this.getJson(`${API}${this.catalogUrl}`)
            .then(data => {
                for (el of data) {
                    this.products.push(el);
                }
                this.allProducts = this.products; //будет хранить данные без изменений
            });
    },
});
