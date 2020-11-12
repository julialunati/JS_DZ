Vue.component('basket', {
    data() {
        return {
            cartItems: [],
        }
    },
    methods: {
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },

    computed:{
        cartTotalCost() {
            
            let result =[];
            let res = 0;
         
            if (this.cartItems.length > 0){
                for (let item of this.cartItems){
                    result.push(item.price*item.quantity)
                }
    
                res = result.reduce((sum, el)=> {
                    return sum+el;
                })
            }

            return res
         }
    },

    template: `
        <div>
                <p class="empty" v-if="!cartItems.length">Cart is empty</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="'../img/'+item.image"
                @remove="remove">
                </cart-item>

                <div class="cartButtons">
                    <button class="cartButton">CLEAR SHOPPING CART</button>
                    <button class="cartButton">CONTINUE SHOPPING</button>
                </div>
                <div class="finalCartInput">
                    <div class="shippingAddress">
                        <div class="cartTitle">SHIPPING ADDRESS</div>
                        <input class="cartForm" type="text" placeholder="Bangladesh">
                        <input class="cartForm" type="text" placeholder="State">
                        <input class="cartForm" type="text" placeholder="Postcode / Zip">
                        <button class="cartButtonShipping">GET A QUOTE</button>
                    </div>
                    <div class="couponDiscount">
                        <div class="cartTitle">COUPON DISCOUNT</div>
                        <div class="enterDiscount">Enter your coupon code if you have one</div>
                        <input class="cartForm" type="text" placeholder="State">
                        <button class="cartButtonCoupon">APPLY COUPON</button>
                    </div>
                    <div class="totalSummary">
                        <div class="subTotal">SUB TOTAL {{cartTotalCost}}€</div>
                        <div class="grandTotal">GRAND TOTAL <span class="grandTotalNumber">{{cartTotalCost}}€</span></div>
                        <button class="checkoutButton"> PROCEED TO CHECKOUT</button>
                    </div>
                </div>

        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="row">
                    <div class="col"><img class="cartImg" :src="img" alt="Some image" style="width: 100px"></div>
                        <div class="col">
                            <div class="productName">{{cartItem.product_name}}</div>
                            <div class="colorProduct"><span class="colorText">Color:</span> Red </div>
                            <div class="sizeProduct"><span class="sizeText">Size:</span> Xll</div>
                        </div>
                            <div class="productInf">{{cartItem.price}}€</div>
                            <div class="productInf">{{cartItem.quantity}}</div>
                            <div class="productInf">FREE</div>
                            <div class="productInf">{{cartItem.quantity*cartItem.price}}€</div>
                            <div class="productInf"><button class="del-btn" @click="$emit('remove', cartItem)">&times;</button></div>
                        </div>
                    </div>
                </div>
    `
});
