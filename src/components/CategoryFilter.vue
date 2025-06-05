<template>
    <div class="category-filter">
        <select v-model="selectedCategoryId" @change="emitCategoryChange">
            <option :value="null">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categories = ref([])
const error = ref(null)
const selectedCategoryId = ref(null) // Define selectedCategoryId

// Fetch categories from the backend
onMounted(async () => {
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/categories`)
        categories.value = response.data
    } catch (err) {
        error.value = err
        console.error('Помилка при завантаженні категорій:', err)
    }
})

// Emit selected category to parent component
const emit = defineEmits(['update:categoryId'])
const emitCategoryChange = () => {
    emit('update:categoryId', selectedCategoryId.value)
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