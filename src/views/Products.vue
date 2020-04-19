<template>
    <div class="parent_div">
        <!-- Product list -->
        <Product v-for="product in productsArray" :key="product.id" :product="product"
        @increaseQuantity="increaseQuantity"
        @decreaseQuantity="decreaseQuantity"></Product>

        <!-- Checkout -->
        <div class="checkout">
            <div>
                <div>
                    Qty: {{quantity}}
                </div>
                <div>
                    Total: {{total}}
                </div>
            </div>
            <div>
                <button class="checkout_button" :disabled="!total && !quantity" @click="checkout">Checkout</button>
            </div>
        </div>

        <!-- Modal -->
        <div id="myModal" class="modal">

            <!-- Modal content -->
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <div class="modal_total">
                    Total Price: {{total}}
                </div>
                <div class="message">
                    Transaction Successful
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Product from './../components/product'
export default {
    name: 'Products',
    data () {
        return {
            productsArray: [],
            quantity: 0,
            total: 0
        }
    },
    components: {
        Product
    },
    mounted() {
        this.getProducts()
    },
    methods: {
        async getProducts () {
            let promise = await new Promise((resolve, reject) => {
                return fetch('products.json', {
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        resolve(response.json())
                    } else {
                        reject(new Error('error'))
                    }
                }).then((json) => {
                    if (json) {
                        resolve(json)
                    } else {
                        reject (new Error('Can not get Products'))
                    }
                }, error => {
                    reject(new Error(error.message))
                })
            })
            if (promise.length) {
                this.productsArray = promise
            }
        },

        increaseQuantity (id) {
            let index = this.productsArray.findIndex(prod => prod.id === id )
            this.productsArray[index].quantity = this.productsArray[index].quantity + 1
            this.addTotalQuantity()
        },

        decreaseQuantity (id) {
            let index = this.productsArray.findIndex(prod => prod.id === id )
            if (this.productsArray[index].quantity != 0) {
                this.productsArray[index].quantity = this.productsArray[index].quantity - 1
                this.quantity = this.quantity - 1
                this.getTotal()
            }
        },

        async addTotalQuantity () {
            this.quantity = await this.productsArray.map(item => item.quantity).reduce((prev, next) => prev + next);
            this.getTotal() 
        },

        getTotal () {
            this.total = 0
            for (let i = 0; i < this.productsArray.length; i++) {
                this.total = this.total + (this.productsArray[i].quantity * this.productsArray[i].price)
            }
        },

        checkout () {
            document.getElementById("myModal").style.display = 'block'
        }, 

        closeModal () {
            document.getElementById("myModal").style.display = 'none'
            this.total = 0
            this.quantity = 0
            this.getProducts()
        }
    }
}
</script>

<style src="./../css/Product.scss" lang="scss" />