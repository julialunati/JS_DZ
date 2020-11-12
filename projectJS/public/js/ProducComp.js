Vue.component('products', {
    data(){
        return {
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :img="'../img/'+item.image" :product="item"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    data() {
      return {
          cartAPI: this.$root.$refs.cart, 
          itemAPI: this.$root.$refs.item,
      };
    },

    template: `
    <div class="product-item">
                <a :href="img" class="highslide" onclick="return hs.expand(this)">
                <img :src="img" alt="Highslide JS" title="Click to enlarge" height="300"/></a>
                <div class="desc">
                    <h3 class="title">{{product.product_name}}</h3>
                    <p class="price">{{product.price}}€</p>
                    <button class="buy-btn" @click="cartAPI.addProduct(product)">Add to card</button>
                </div>
            </div>
    `
});
