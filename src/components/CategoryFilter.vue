<template>
    <div class="category-filter">
        <button
            v-for="category in categories"
            :key="category.id"
            @click="handleClick(category.id)"
            :class="['filter-button', { active: selectedCategoryId === category.id }]"
        >
            {{ category.name }}
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categories = ref([])
const selectedCategoryId = ref(null)

onMounted(async () => {
    try {
        const response = await axios.get('/api/categories')
        categories.value = response.data
    } catch (error) {
        console.error('Помилка при завантаженні категорій:', error)
    }
})

const emit = defineEmits(['select'])

function handleClick(categoryId) {
    if (selectedCategoryId.value === categoryId) {
        selectedCategoryId.value = null
        emit('select', null) 
    } else {
        selectedCategoryId.value = categoryId
        emit('select', categoryId)
    }
}
</script>

<style lang="scss" scoped>
.category-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    margin-bottom: 50px;
    margin-top: 50px;
}

.filter-button {
    width: 218px;
    height: 60px;
    background-color: transparent;
    border: 2px solid #ff5c5c;
    border-radius: 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 20px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: #ff5c5c;
        color: white;
    }
}
</style>