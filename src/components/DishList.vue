<template>
    <div class="dishes-list">
        <DishCard
            v-for="dish in dishes"
            :key="dish.id"
            :image="dish.image_url"
            :title="dish.name"
            :description="dish.description"
            :price="dish.price"
            :portionSize="dish.portion_size"
            :categoryId="dish.category_id"
        />
    </div>
</template>


<script setup>
import DishCard from './DishCard.vue'

defineProps({
    dishes: {
        type: Array,
        required: true,
    },
})
</script>

<style scoped>
.dishes-list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    margin-bottom: 30px;
}
</style>