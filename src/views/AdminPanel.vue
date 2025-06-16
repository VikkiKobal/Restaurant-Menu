<template>
    <div class="admin-panel">
        <button @click="showAddForm = true" class="add-button">+ Add New Dish</button>

        <div v-if="showAddForm || editDish" class="form-wrapper">
            <form @submit.prevent="submitForm" enctype="multipart/form-data">
                <input v-model="form.name" placeholder="Name" required />
                <input v-model.number="form.price" type="number" placeholder="Price" required />
                <input v-model.number="form.portion" type="number" placeholder="Portion (e.g., 250)" />
                <!-- Changed to number -->
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

        <div class="table-wrapper">
            <table class="dish-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price ($)</th>
                        <th>Portion</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="dish in dishes" :key="dish.id">
                        <td>{{ dish.name }}</td>
                        <td>{{ dish.description }}</td>
                        <td>{{ parseFloat(dish.price).toFixed(2) }}</td>
                        <td>{{ dish.portion || 'N/A' }}</td>
                        <td>
                            <button @click="startEdit(dish)">Edit</button>
                            <button @click="deleteDish(dish.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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

const dishes = ref([])
const form = ref({
    name: '',
    price: 0,
    description: '',
    is_available: true,
    category_id: null,
    is_special: false,
    portion: null, // Changed to null for number
})

const showAddForm = ref(false)
const editDish = ref(null)

const loadDishes = async () => {
    await menuStore.fetchMenu()
    dishes.value = menuStore.allDishes
}

onMounted(() => {
    userStore.initializeFromStorage()
    if (!isLoggedIn.value || !isAdmin.value) {
        router.push('/login')
    } else {
        loadDishes()
    }
})

watch([isLoggedIn, isAdmin], ([loggedIn, admin]) => {
    if (!loggedIn || !admin) {
        router.push('/login')
    }
})

const submitForm = async () => {
    try {
        // Validate portion
        if (form.value.portion && (isNaN(form.value.portion) || form.value.portion < 0)) {
            alert('Portion must be a positive number')
            return
        }

        const dishData = {
            name: form.value.name,
            price: form.value.price,
            description: form.value.description || null,
            is_available: form.value.is_available,
            category_id: form.value.category_id || null,
            is_special: form.value.is_special ? 1 : 0,
            portion: form.value.portion || null,
        }
        console.log('Submitting data:', dishData)

        if (editDish.value) {
            if (selectedFile.value) {
                const formData = new FormData()
                formData.append('name', dishData.name)
                formData.append('price', dishData.price)
                formData.append('description', dishData.description || '')
                formData.append('is_available', dishData.is_available)
                formData.append('category_id', dishData.category_id || '')
                formData.append('is_special', dishData.is_special)
                formData.append('portion_size', dishData.portion || '') // Map to portion_size
                formData.append('image', selectedFile.value)
                console.log('Submitting formData:', Object.fromEntries(formData))
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
                formData.append('is_special', dishData.is_special)
                formData.append('portion_size', dishData.portion || '') // Map to portion_size
                formData.append('image', selectedFile.value)
                console.log('Submitting formData:', Object.fromEntries(formData))
                await menuStore.addDishWithFile(formData)
            } else {
                await menuStore.addDish(dishData)
            }
        }
        await loadDishes()
        resetForm()
    } catch (err) {
        console.error('Error submitting form:', err.response?.data || err.message)
        alert('Error: ' + (err.response?.data?.message || err.message))
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
        portion: dish.portion || null, // Number or null
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
        alert('Error: ' + (err.response?.data?.message || err.message))
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
        portion: null,
    }
}

const handleFileUpload = (event) => {
    selectedFile.value = event.target.files[0]
    console.log('HandleFileUpload triggered. Selected file:', selectedFile.value)
}
</script>


<style lang="scss" scoped>
$color-yellow: #ffc164;
$color-white: #fff;
$color-black: #000;
$color-dark-gray: #222;
$font-heading: 'Forum', serif;

.admin-panel {
    width: 100vw;
    min-height: 100vh;
    padding: 20px;
    background-color: $color-black;
    color: $color-white;
    font-family: $font-heading;
    box-sizing: border-box;
    overflow-x: hidden;
}

.add-button {
    background-color: transparent;
    border: 2px solid $color-yellow;
    color: $color-yellow;
    font-size: 1.2rem;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 20px;
    display: block;

    &:hover {
        background-color: $color-yellow;
        color: $color-black;
    }
}

.form-wrapper {
    margin-bottom: 20px;
    background-color: #111;
    padding: 15px;
    border: 2px solid $color-yellow;
    border-radius: 10px;
    max-width: 100%;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input,
textarea {
    background-color: $color-dark-gray;
    border: 2px solid $color-yellow;
    border-radius: 8px;
    padding: 8px 12px;
    font-family: $font-heading;
    font-size: 0.95rem;
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
    font-size: 1rem;
    padding: 8px 16px;
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

.table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin-top: 20px;
}

.dish-table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;

    th,
    td {
        border: 1px solid #444;
        padding: 8px 12px;
        text-align: left;
        font-size: 1.2rem;
    }

    th {
        background-color: #333;
        color: $color-yellow;
        font-size: 1.2rem;
    }

    td {
        vertical-align: top;
    }

    button {
        margin-right: 8px;
        padding: 4px 8px;
        font-size: 1.2rem;
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

@media (max-width: 768px) {
    .admin-panel {
        padding: 15px;
    }

    .add-button {
        font-size: 1rem;
        padding: 8px 16px;
    }

    .form-wrapper {
        padding: 10px;
    }

    input,
    textarea {
        font-size: 0.9rem;
        padding: 6px 10px;
    }

    button[type='submit'],
    button[type='button'] {
        font-size: 0.9rem;
        padding: 6px 12px;
    }
}
</style>