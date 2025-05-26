<template>
    <div class="dish-card">
        <img :src="image" alt="Dish image" class="dish-image" />
        <div class="info-overlay">
            <div class="text-block">
                <h3 class="title">{{ title }}</h3>
                <p class="description">{{ description }}</p>
                <div class="bottom-info">
                    <span class="price">{{ price }}₴</span>
                    <div class="quantity-selector">
                        <button @click="decrease" class="btn">-</button>
                        <span>{{ quantity }}</span>
                        <button @click="increase" class="btn">+</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    image: String,
    title: String,
    description: String,
    price: Number,
})

const quantity = ref(1)
const increase = () => quantity.value++
const decrease = () => {
    if (quantity.value > 1) quantity.value--
}
</script>

<style scoped lang="scss">
.dish-card {
    position: relative;
    width: 467px;
    height: 379px;
    border-radius: 15px;
    overflow: hidden;
}

.dish-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
}

.info-overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #1e1e1e;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding: 20px;
    box-sizing: border-box;
}

.text-block {
    text-align: center;
    color: white;
}

.title {
    margin: 0;
    font-size: 24px;
}

.description {
    font-size: 16px;
    margin: 8px 0 16px;
}

.bottom-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.price {
    font-size: 20px;
    font-weight: bold;
}

.quantity-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffc164;
    border-radius: 30px;
    width: 100px;
    height: 40px;
    color: white;
}

.btn {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    width: 30px;
    cursor: pointer;
}
</style>
