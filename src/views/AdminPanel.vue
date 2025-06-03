<template>
    <div class="admin-panel">
        <button @click="showAddForm = true" class="add-button">+ Add New Dish</button>

        <div v-if="showAddForm || editDish" class="form-wrapper">
            <form @submit.prevent="submitForm" enctype="multipart/form-data">
                <input v-model="form.name" placeholder="Name" required />
                <input v-model.number="form.price" type="number" placeholder="Price" required />
                <textarea v-model="form.description" placeholder="Description"></textarea>
                <input type="file" @change="handleFileUpload" />
                <label>
                    <input type="checkbox" v-model="form.is_available" />
                    Available
                </label>
                <input v-model.number="form.category_id" type="number" placeholder="Category ID" />
                <label>
                    <input type="checkbox" v-model="form.is_special" />
                    Special
                </label>
                <button type="submit">{{ editDish ? 'Update' : 'Add' }}</button>
                <button type="button" @click="resetForm">Cancel</button>
            </form>
        </div>

        <table class="dish-table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price ($)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="dish in dishes" :key="dish.id">
                    <td>
                        <img
                            v-if="dish.image_url"
                            :src="imageUrl(dish.image_url)"
                            alt="Dish Image"
                            style="max-width: 100px; max-height: 100px"
                        />
                        <span v-else>No Image</span>
                    </td>
                    <td>{{ dish.name }}</td>
                    <td>{{ dish.description }}</td>
                    <td>{{ dish.price.toFixed(2) }}</td>
                    <td>
                        <button @click="startEdit(dish)">Edit</button>
                        <button @click="deleteDish(dish.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/store/menuStore'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const menuStore = useMenuStore()
const userStore = useUserStore()
const { isLoggedIn, isAdmin } = storeToRefs(userStore)
const router = useRouter()
const selectedFile = ref(null)

const handleFileUpload = (event) => {
    selectedFile.value = event.target.files[0]
}

const dishes = ref([])
const form = ref({
    name: '',
    price: 0,
    description: '',
    is_available: true,
    category_id: null,
    is_special: false,
})
const showAddForm = ref(false)
const editDish = ref(null)

const imageUrl = (path) => {
    return path ? `http://localhost:3000${path}` : ''
}

const loadDishes = async () => {
    await menuStore.fetchMenu()
    dishes.value = menuStore.allDishes
}

onMounted(() => {
    // Перевірка при завантаженні
    if (!isLoggedIn.value || !isAdmin.value) {
        router.push('/login')
    } else {
        loadDishes()
    }
})

// Слідкуємо за змінами стану авторизації
watch([isLoggedIn, isAdmin], ([loggedIn, admin]) => {
    if (!loggedIn || !admin) {
        router.push('/login')
    }
})

const submitForm = async () => {
    try {
        const dishData = {
            name: form.value.name,
            price: form.value.price,
            description: form.value.description || null,
            is_available: form.value.is_available,
            category_id: form.value.category_id || null,
            is_special: form.value.is_special ? 1 : 0, // Зміна з special_category на is_special
        }

        if (editDish.value) {
            if (selectedFile.value) {
                const formData = new FormData()
                formData.append('name', dishData.name)
                formData.append('price', dishData.price)
                formData.append('description', dishData.description || '')
                formData.append('is_available', dishData.is_available)
                formData.append('category_id', dishData.category_id || '')
                formData.append('is_special', dishData.is_special) // Зміна з special_category на is_special
                formData.append('image', selectedFile.value)
                await menuStore.updateDishWithFile(editDish.value.id, formData)
            } else {
                await menuStore.updateDish(editDish.value.id, dishData)
            }
        } else {
            if (selectedFile.value) {
                const formData = new FormData()
                formData.append('name', dishData.name)
                formData.append('price', dishData.price)
                formData.append('description', dishData.description || '')
                formData.append('is_available', dishData.is_available)
                formData.append('category_id', dishData.category_id || '')
                formData.append('is_special', dishData.is_special) // Зміна з special_category на is_special
                formData.append('image', selectedFile.value)
                await menuStore.addDishWithFile(formData)
            } else {
                await menuStore.addDish(dishData)
            }
        }
        await loadDishes()
        resetForm()
    } catch (err) {
        console.error('Error submitting form:', err)
        alert('Error: ' + err.message)
    }
}

const startEdit = (dish) => {
    editDish.value = dish
    form.value = {
        name: dish.name,
        price: dish.price,
        description: dish.description || '',
        is_available: dish.is_available,
        category_id: dish.category_id,
        is_special: dish.is_special === 1,
    }
    selectedFile.value = null
    showAddForm.value = true
}

const deleteDish = async (id) => {
    try {
        await menuStore.deleteDish(id)
        await loadDishes()
    } catch (err) {
        console.error('Error deleting dish:', err)
        alert('Error: ' + err.message)
    }
}

const resetForm = () => {
    showAddForm.value = false
    editDish.value = null
    selectedFile.value = null
    form.value = {
        name: '',
        price: 0,
        description: '',
        is_available: true,
        category_id: null,
        is_special: false,
    }
}
</script>

<style lang="scss" scoped>
// Твої стилі без змін
$color-yellow: #ffc164;
$color-white: #fff;
$color-black: #000;
$color-dark-gray: #222;
$font-heading: 'Forum', serif;

.admin-panel {
    width: 100vw;
    min-height: 100vh;
    padding: 40px;
    background-color: $color-black;
    color: $color-white;
    font-family: $font-heading;
    box-sizing: border-box;
    overflow-x: hidden;
}

h1 {
    text-align: center;
    font-size: 3rem;
    color: $color-yellow;
    margin-bottom: 20px;
}

.add-button {
    background-color: transparent;
    border: 2px solid $color-yellow;
    color: $color-yellow;
    font-size: 1.2rem;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 30px;
    display: block;

    &:hover {
        background-color: $color-yellow;
        color: $color-black;
    }
}

.form-wrapper {
    margin-bottom: 40px;
    background-color: #111;
    padding: 20px;
    border: 2px solid $color-yellow;
    border-radius: 10px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

input,
textarea {
    background-color: $color-dark-gray;
    border: 2px solid $color-yellow;
    border-radius: 8px;
    padding: 10px 15px;
    font-family: $font-heading;
    font-size: 1rem;
    color: $color-white;

    &:focus {
        outline: none;
        background-color: #111;
        border-color: lighten($color-yellow, 10%);
        box-shadow: 0 0 8px rgba(255, 193, 100, 0.5);
    }
}

button[type='submit'],
button[type='button'] {
    font-family: $font-heading;
    font-size: 1.1rem;
    padding: 10px 18px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: 0.3s;
}

button[type='submit'] {
    background-color: $color-yellow;
    color: $color-black;

    &:hover {
        background-color: darken($color-yellow, 10%);
    }
}

button[type='button'] {
    background-color: transparent;
    color: $color-yellow;
    border: 2px solid $color-yellow;

    &:hover {
        background-color: $color-yellow;
        color: $color-black;
    }
}

.dish-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 30px;

    th,
    td {
        border: 1px solid #444;
        padding: 12px 16px;
        text-align: left;
    }

    th {
        background-color: #333;
        color: $color-yellow;
        font-size: 1.1rem;
    }

    td {
        font-size: 1rem;
        vertical-align: top;
    }

    button {
        margin-right: 10px;
        padding: 6px 12px;
        font-size: 0.95rem;
        border-radius: 6px;
        font-family: $font-heading;
        border: 2px solid $color-yellow;
        background-color: transparent;
        color: $color-yellow;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
            background-color: $color-yellow;
            color: $color-black;
        }

        &:last-of-type {
            border-color: #e55353;
            color: #e55353;

            &:hover {
                background-color: #e55353;
                color: $color-white;
            }
        }
    }
}
</style>