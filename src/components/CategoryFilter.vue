<template>
    <div class="category-filter">
        <button
            v-for="category in filteredCategories"
            :key="category.id"
            @click="handleClick(category.id, $event)"
            :class="['filter-button', { active: selectedCategoryId === category.id && selectedCategoryId !== null }]"
        >
            {{ category.name }}
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import axios from 'axios'

const categories = ref([])
const error = ref(null)
const selectedCategoryId = ref(null)

const filteredCategories = computed(() => categories.value.filter((category) => category.name !== 'Specialities'))

onMounted(async () => {
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/categories`)
        categories.value = response.data
    } catch (err) {
        error.value = err
        console.error('Помилка при завантаженні категорій:', err)
    }
})

const emit = defineEmits(['update:categoryId'])

function handleClick(categoryId, event) {
    if (selectedCategoryId.value === categoryId) {
        selectedCategoryId.value = null
        event.target.blur()
    } else {
        selectedCategoryId.value = categoryId
    }

    nextTick(() => {
        emit('update:categoryId', selectedCategoryId.value)
    })
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

    @media (max-width: 600px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        justify-content: center;
    }
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

    &.active {
        background-color: #ff5c5c;
        color: white;
    }

    @media (max-width: 600px) {
        width: 180px;
    }
}
</style>
