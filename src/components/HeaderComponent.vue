<template>
    <header class="header">
        <RouterLink to="/" class="logo-text">Cibo gustoso</RouterLink>

        <div class="login-desktop">
            <template v-if="isLoggedIn">
                <RouterLink v-if="isAdmin" to="/admin" class="add-dish-button">Add New Dish</RouterLink>
                <button class="sign-in-btn" @click="logout">Logout</button>
            </template>
            <template v-else>
                <RouterLink to="/login" class="sign-in-btn">Sign In</RouterLink>
            </template>
        </div>

        <button class="burger" @click="toggleMenu">
            <span :class="{ open: isOpen }"></span>
            <span :class="{ open: isOpen }"></span>
            <span :class="{ open: isOpen }"></span>
        </button>

        <nav :class="['nav-center', { open: isOpen }]">
            <ul class="nav-links">
                <li>
                    <RouterLink :to="{ path: '/', hash: '#menu' }" class="nav-link" @click="closeMenu">Menu</RouterLink>
                </li>
                <li>
                    <RouterLink to="/reserve" class="nav-link" @click="closeMenu">Reserve A Table</RouterLink>
                </li>
                <li>
                    <RouterLink to="/about" class="nav-link" @click="closeMenu">About Us</RouterLink>
                </li>
                <li>
                    <RouterLink to="/contact" class="nav-link" @click="closeMenu">Contact</RouterLink>
                </li>
                <li class="login-mobile">
                    <template v-if="isLoggedIn">
                        <button class="sign-in-btn" @click="logout">Logout</button>
                    </template>
                    <template v-else>
                        <RouterLink to="/login" @click="closeMenu" class="sign-in-btn">Sign In</RouterLink>
                    </template>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { isLoggedIn, isAdmin, user, token } = storeToRefs(userStore)

watchEffect(() => {
    console.log('User from store:', user.value)
    console.log('Token from store:', token.value)
    console.log('isLoggedIn:', isLoggedIn.value)
    console.log('isAdmin:', isAdmin.value)
})

const logout = () => {
    userStore.logout()
    closeMenu()
}

const isOpen = ref(false)

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}

const closeMenu = () => {
    isOpen.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Elsie:wght@900&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap');

.header {
    height: 90px;
    background-color: #272727;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 30;
}

.logo-text {
    font-family: 'Elsie', cursive;
    font-weight: 900;
    font-size: 28px;
    color: white;
    text-decoration: none;
    z-index: 30;
}

.nav-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 32px;
    margin: 0;
    padding: 0;
}

.nav-link {
    font-family: 'Forum', sans-serif;
    font-size: 24px;
    color: white;
    text-decoration: none;
    transition: opacity 0.3s ease;
}

.nav-link:hover {
    opacity: 0.8;
}

.sign-in-btn {
    background-color: #ff5c5c;
    text-decoration: none;
    color: white;
    font-family: 'Satoshi', sans-serif;
    font-size: 16px;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.sign-in-btn:hover {
    background-color: #e04a4a;
}

.add-dish-button {
    background-color: #4caf50;
    text-decoration: none;
    color: white;
    font-family: 'Satoshi', sans-serif;
    font-size: 16px;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-dish-button:hover {
    background-color: #3e8e41;
}

.burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 31;
}

.burger span {
    width: 30px;
    height: 3px;
    background: linear-gradient(to right, #d9a066, #a25c2a);
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
}

.burger span.open:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
}

.burger span.open:nth-child(2) {
    opacity: 0;
}

.burger span.open:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
}

.login-desktop {
    display: none;
}

@media (min-width: 1100px) {
    .login-desktop {
        display: flex;
        gap: 10px;
    }
    .login-mobile {
        display: none;
    }
}

@media (max-width: 1100px) {
    .nav-center {
        position: fixed;
        top: 90px;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        max-width: 100%;
        background-color: #272727;
        padding: 20px 0;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 25;
    }

    .nav-center.open {
        display: flex;
    }

    .nav-links {
        flex-direction: column;
        gap: 20px;
        width: 100%;
        margin: 0;
        padding: 0 20px;
        text-align: center;
        box-sizing: border-box;
    }

    .nav-link {
        font-size: 20px;
    }

    .burger {
        display: flex;
        margin-left: auto;
    }

    .login-mobile {
        display: block;
    }

    .login-desktop {
        display: none !important;
    }

    .logo-text {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>