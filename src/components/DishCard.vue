<template>
    <div class="dish-card">
        <img :src="imageSrc" alt="Dish image" class="dish-image" />
        <div class="info-overlay">
            <div class="text-block">
                <h3 class="title">{{ title }}</h3>
                <p class="description">{{ description }}</p>
                <div class="bottom-info">
                    <span class="portion"> {{ portionSize }} {{ categoryId === 12 ? 'ml' : 'g' }} </span>
                    <span class="price">{{ price }}₴</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, watch } from 'vue'

const baseUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000'

const props = defineProps({
    image: String,
    title: String,
    description: String,
    price: Number,
    portionSize: Number,
    categoryId: Number,
})

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
$color-yellow: #ffc164;

.dish-card {
    position: relative;
    width: 320px;
    height: 390px;
    border-radius: 15px;
    overflow: hidden;
}

.dish-image {
    width: 100%;
    height: 85%;
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
    padding: 0px;
}

.price,
.portion {
    font-size: 20px;
    font-weight: bold;
    color: $color-yellow;
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
