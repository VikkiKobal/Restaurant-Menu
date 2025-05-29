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

    <section class="specialities-text" id="menu" ref="menuSection">
        <h2 class="specialities-heading">Our Specialities</h2>
        <p class="specialities-subheading">Authentic meals from our restaurant served with high quality ingredients.</p>
        <CategoryFilter @select="handleCategorySelect" />
        <DishList :dishes="filteredDishes" />
    </section>

    <section class="about-section">
        <div class="about-header">
            <h2 class="about-title">Our Story</h2>
            <p class="about-subtitle">A journey for making successful luxury restaurant with the best services</p>
        </div>

        <div class="about-content">
            <img :src="aboutPhoto" alt="Our Story Photo" class="about-photo" />
            <div class="about-text">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat urna id leo euismod
                    rhoncus. Aliquam erat volutpat. Nulla id aliquam neque, at dignissim quam. Praesent et lacus
                    accumsan, consequat nisl a, mattis sapien. Nam sodales ullamcorper aliquet. Phasellus ut pretium
                    libero, vitae imperdiet purus. Sed sed tincidunt velit. Aliquam vitae ipsum molestie, vehicula nisi
                    quis, finibus leo.
                </p>
                <a href="#" class="more-link">More...</a>
            </div>
        </div>
    </section>
    <Footer />
</template>

<script setup>
import DishList from '@/components/DishList.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import Footer from '@/components/FooterComponent.vue'

import mainPhoto from '@/assets/main-photo.jpg'
import vectorLeft from '@/assets/Vector 2.png'
import vectorRight from '@/assets/Vector 1.png'
import kitchenImage from '@/assets/kitchen.png'
import aboutPhoto from '@/assets/about-photo.png'

import { ref, onMounted, computed } from 'vue'
import { useMenuStore } from '@/store/menuStore'
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const menuSection = ref(null)
const route = useRoute()

function scrollToMenu() {
    menuSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const selectedCategory = ref(null)

const menuStore = useMenuStore()

onMounted(() => {
    menuStore.fetchMenu()
})

onMounted(() => {
    if (route.hash === '#menu' && menuSection.value) {
        menuSection.value.scrollIntoView({ behavior: 'smooth' })
    }
})

watch(
    () => route.hash,
    (newHash) => {
        if (newHash === '#menu' && menuSection.value) {
            menuSection.value.scrollIntoView({ behavior: 'smooth' })
        }
    }
)

const category1Dishes = computed(() => menuStore.getDishesByCategory(1))

const filteredDishes = computed(() =>
    selectedCategory.value ? menuStore.getDishesByCategory(selectedCategory.value) : menuStore.allDishes
)

function handleCategorySelect(categoryId) {
    selectedCategory.value = categoryId
}
</script>


<style lang="scss" scoped>
$color-yellow: #ffc164;
$color-white: white;
$font-heading: 'Forum', serif;
$font-subheading: 'Forum', sans-serif;
$font-button: 'Forum', sans-serif;

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
    margin: 0 auto;
}

.home,
.todays-special,
.specialities-text,
.about-section,
.footer {
    background-color: black;
    text-align: center;
    padding: 60px 20px;
    color: $color-white;
    position: relative;
}

.footer {
    padding: 0;
}

.home {
    height: 100vh;
    overflow: hidden;
    padding: 0;
}

.main-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.6);
    display: block;
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    padding-bottom: 20px;
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
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
}

.special-image-section img {
    width: 100%;
    height: auto;
    max-width: 100vw;
    object-fit: cover;
}

.specialities-text {
    scroll-margin-top: 80px;
    overflow: hidden;

    &::before {
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

    > * {
        position: relative;
        z-index: 1;
    }
}

.specialities-heading {
    @include heading-style(45px, $color-yellow);
    margin-bottom: 20px;
}

.specialities-subheading {
    @include subheading-style(25px, $color-white);
    margin-bottom: 0;
}

.about-section {
    padding-top: 40px;
    padding-bottom: 100px;
}

.about-header {
    text-align: center;
    margin-bottom: 50px;
}

.about-title {
    @include heading-style(45px, $color-yellow);
    margin-bottom: 12px;
}

.about-subtitle {
    @include subheading-style(25px, $color-white);
    line-height: 1.4;
    margin-bottom: 20px;
    white-space: nowrap;
}

.about-content {
    display: flex;
    align-items: center;
    gap: 120px;
    justify-content: flex-start;
    max-width: 1100px;
    margin: 0 auto;
    padding-left: 20px; /* зменшили відступ контейнера */
}

.about-photo {
    width: 55%;
    max-width: none;
    border-radius: 8px;
    object-fit: cover;
    height: auto;
    margin-left: -50px; /* ще сильніший зсув вліво */
}

.about-text {
    flex: 1;
    max-width: 400px;
    color: $color-white;
    display: flex;
    flex-direction: column;
    text-align: left;

    p {
        font-size: 18px;
        line-height: 1.6;
        text-align: left;
    }

    .more-link {
        align-self: flex-end;
        margin-top: 12px;
        font-weight: bold;
        color: $color-yellow;
        text-decoration: none;
    }
}
</style>
