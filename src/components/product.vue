<template>
  <div class="product_container">
        <div class="grid_image">
            <img :src="product.image_url" alt="product">
            <div class="offer">
                {{product.offer_text}}% OFF
            </div>
        </div>
        <div class="grid_description">
            <div class="brand_name">
                {{product.brand_name}}
            </div>
            <div class="product_name">
                {{product.product_name}}
            </div>
            <div class="mrp">
                MRP {{product.mrp}}
            </div>
            <div class="price">
                RS {{product.price}}
            </div>
            <div class="cart">
                <div>
                    <button class="button">Add Cart</button>
                </div>
                <div class="quantity">
                    <div class="add">
                        <button class="add_button" @click="$emit('increaseQuantity', product.id)">+</button>
                    </div>
                    <div class="number">
                        {{product.quantity}}
                    </div>
                    <div class="add">
                        <button class="add_button" @click="$emit('decreaseQuantity', product.id)">-</button>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name: 'Product',
    props: ['product']
}   
</script>

<style src="./../css/Product.scss" lang="scss">