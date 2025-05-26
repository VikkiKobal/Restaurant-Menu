<template>
    <div class="dishes-list">
        <DishCard
            v-for="dish in dishes"
            :key="dish.id"
            :image="dish.image_url"
            :title="dish.title"
            :description="dish.description"
            :price="dish.price"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import DishCard from './DishCard.vue'

const dishes = ref([])

onMounted(async () => {
    const res = await axios.get('http://localhost:3000/api/dishes')
    dishes.value = res.data
})
</script>

<style scoped>
.dishes-list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
}
</style>
