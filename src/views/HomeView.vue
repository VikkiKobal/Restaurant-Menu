<template>
    <div class="home">
        <img :src="mainPhoto" alt="Main photo" class="main-photo" />
        <div class="bottom-fade"></div>
        <h1 class="main-heading">Taste the rich flavour of high quality meals</h1>
        <p class="sub-heading">
            We only use the five star quality for our menu, come and get the richness in every meals we serve.
        </p>
        <button class="go-to-menu-btn" @click="scrollToMenu">Go to Menu</button>
    </div>

    <section class="todays-special">
        <img :src="vectorLeft" alt="Left arrow" class="arrow arrow-left" />
        <h1 class="special-heading">Today's Special</h1>
        <p class="special-subheading">
            Special menu oftenly comes different everyday,<br />
            this is our special food for today.
        </p>
        <DishList :dishes="category1Dishes" />
        <img :src="vectorRight" alt="Right arrow" class="arrow arrow-right" />
    </section>
    <section class="special-image-section">
        <img :src="kitchenImage" alt="Special Dish" />
    </section>

    <section class="specialities-text" ref="menuSection">
        <h2 class="specialities-heading">Our Specialities</h2>
        <p class="specialities-subheading">Authentic meals from our restaurant served with high quality ingredients.</p>
        <CategoryFilter @select="handleCategorySelect" />
        <DishList :dishes="filteredDishes" />
    </section>
</template>

<script setup>
import DishList from '@/components/DishList.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'

import mainPhoto from '@/assets/main-photo.jpg'
import vectorLeft from '@/assets/Vector 2.png'
import vectorRight from '@/assets/Vector 1.png'
import kitchenImage from '@/assets/kitchen.png'

import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const menuSection = ref(null)

function scrollToMenu() {
    menuSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const allDishes = ref([])
const category1Dishes = ref([])

const selectedCategory = ref(null)

const filteredDishes = computed(() =>
    selectedCategory.value ? allDishes.value.filter((d) => d.category_id === selectedCategory.value) : allDishes.value
)

function handleCategorySelect(categoryId) {
    selectedCategory.value = categoryId
}

onMounted(async () => {
    try {
        const response = await axios.get('/api/menu')

        // Лог усіх отриманих даних
        console.log('Всі страви (response.data):', response.data)

        allDishes.value = response.data

        // Фільтруємо страви за категорією 1
        category1Dishes.value = allDishes.value.filter((dish) => dish.category_id === 1)

        // Лог відфільтрованих страв
        console.log('Страви з category_id === 1:', category1Dishes.value)
    } catch (error) {
        console.error('Помилка при завантаженні страв:', error)
    }
})
</script>

<style lang="scss" scoped>
$color-yellow: #ffc164;
$color-white: white;
$font-heading: 'DM Serif Display', serif;
$font-subheading: 'DM Sans', sans-serif;
$font-button: 'Inter', sans-serif;

/* Міксини для заголовків */
@mixin heading-style($font-size, $color) {
    font-family: $font-heading;
    font-weight: 400;
    font-size: $font-size;
    color: $color;
    margin: 0;
    text-align: center;
}

/* Міксини для підзаголовків */
@mixin subheading-style($font-size, $color) {
    font-family: $font-subheading;
    font-weight: 400;
    font-size: $font-size;
    color: $color;
    max-width: 75%;
    text-align: center;
    margin: 0;
}

.home {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: black;
}

.main-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.6);
    display: block;
}

.main-photo {
    opacity: 0;
    transform: scale(1.1);
    animation: zoomFadeIn 1.5s ease forwards;
}

@keyframes zoomFadeIn {
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.main-heading {
    @include heading-style(45px, $color-yellow);
    position: absolute;
    top: 28%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
}

.sub-heading {
    @include subheading-style(25px, $color-white);
    position: absolute;
    top: 37%;
    left: 50%;
    transform: translateX(-50%);
    white-space: normal;
}

.go-to-menu-btn {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, 0);
    font-family: $font-button;
    font-size: 25px;
    font-weight: 400;
    color: $color-white;
    background-color: rgba(255, 159, 15, 0.15);
    border: 2px solid #ff9f0f;
    padding: 12px 40px;
    border-radius: 6px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: #ff9f0f;
        color: $color-white;
    }
}

.bottom-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    pointer-events: none;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
    z-index: 2;
}

.todays-special {
    position: relative;
    background-color: black;
    padding: 60px 60px 20px;
    text-align: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    margin-top: 0;
}

.arrow {
    position: absolute;
    top: 20%;
    width: 200px;
    height: auto;
    transform: translateY(-50%);
    cursor: pointer;
}

.arrow-left {
    left: 100px;
}

.arrow-right {
    right: 100px;
}

.special-heading {
    @include heading-style(45px, $color-yellow);
}

.special-subheading {
    @include subheading-style(25px, $color-white);
    margin-bottom: 100px;
}

.special-image-section {
    width: 100%; /* буде ширина контейнера, без додаткового розширення */
    overflow: hidden;
    display: flex;
    justify-content: center;
}

.special-image-section img {
    width: 100%; // картинка заповнює контейнер по ширині
    height: auto; // висота адаптивна
    max-width: 100vw; // не більше ширини вікна браузера
    object-fit: cover; // якщо хочеш обрізання (опціонально)
}

.specialities-text {
    position: relative;
    background-color: black;
    text-align: center;
    padding: 60px 20px 40px;
    scroll-margin-top: 80px;
    overflow: hidden;
}

.specialities-text::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('@/assets/knife.png');
    background-size: cover;
    background-position: center;
    filter: brightness(0.6) saturate(0.5);
    opacity: 0.85;
    z-index: 0;
}

.specialities-text > * {
    position: relative;
    z-index: 1;
}

.specialities-heading {
    font-family: 'DM Serif Display', serif;
    font-weight: 400;
    font-size: 45px;
    color: #ffc164;
    margin: 0 0 10px;
    margin-bottom: 20px;
}

.specialities-subheading {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 25px;
    color: white;
    max-width: 75%;
    margin: 0 auto;
}

.main-menu {
    background-color: black;
    padding: 60px 20px;
    height: 100vh;
}
</style>
