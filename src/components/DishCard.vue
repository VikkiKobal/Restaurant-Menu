<template>
    <div class="dish-card">
        <img :src="imageSrc" alt="Dish image" class="dish-image" />
        <div class="info-overlay">
            <div class="text-block">
                <h3 class="title">{{ title }}</h3>
                <p class="description">{{ description }}</p>
                <div class="bottom-info">
                    <span class="price">{{ price }}₴</span>
                    <button @click="toggleFavorite" class="favorite-btn" :class="{ active: isFavorite }">
                        <svg viewBox="0 0 24 24" class="heart-icon" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                   2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                                   C13.09 3.81 14.76 3 16.5 3
                                   19.58 3 22 5.42 22 8.5
                                   c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="none"
                                stroke="white"
                                stroke-width="2"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const baseUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000'

const props = defineProps({
    image: String,
    title: String,
    description: String,
    price: Number,
})

const isFavorite = ref(false)
const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value
}

const imageSrc = computed(() => {
    if (!props.image) return '/assets/placeholder.png'

    if (/^https?:\/\//.test(props.image)) return props.image

    const cleanPath = props.image.replace(/^\/?assets\/images\//, '')

    return `${baseUrl}/assets/images/${cleanPath}`
})

watch(
    () => props.image,
    (newVal) => {
        console.log('props.image:', newVal)
        console.log('computed imageSrc:', imageSrc.value)
    },
    { immediate: true }
)
</script>



<style scoped lang="scss">
.dish-card {
    position: relative;
    width: 325px;
    height: 380px;
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
    padding-right: 10px;
}

.price {
    font-size: 20px;
    font-weight: bold;
}

.favorite-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: transform 0.2s;
}

.favorite-btn:hover {
    transform: scale(1.2);
}

.heart-icon {
    width: 28px;
    height: 28px;
    stroke: white;
    fill: none;
    transition: fill 0.3s, stroke 0.3s;
}

.favorite-btn.active .heart-icon {
    fill: red;
    stroke: red;
}
</style>
