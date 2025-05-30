<template>
    <header class="header">
        <RouterLink to="/" class="logo-text">Cibo gustoso</RouterLink>

        <div class="login-desktop">
            <RouterLink to="/login">
                <button class="sign-in-btn">Sign In</button>
            </RouterLink>
        </div>

        <button class="burger" @click="toggleMenu">
            <span :class="{ open: isOpen }"></span>
            <span :class="{ open: isOpen }"></span>
            <span :class="{ open: isOpen }"></span>
        </button>

        <nav :class="['nav-center', { open: isOpen }]">
            <ul class="nav-links">
                <router-link :to="{ path: '/', hash: '#menu' }" class="nav-link" @click="closeMenu">Menu</router-link>
                <router-link to="/reserve" class="nav-link" @click="closeMenu">Reserve A Table</router-link>
                <router-link to="/about" class="nav-link" @click="closeMenu">About Us</router-link>
                <li><RouterLink to="/contact" class="nav-link" @click="closeMenu">Contact</RouterLink></li>
                <li class="login-mobile">
                    <RouterLink to="/login" @click="closeMenu">
                        <button class="sign-in-btn">Sign In</button>
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>



<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}

const closeMenu = () => {
    isOpen.value = false
}

const handleClickOutside = (event) => {
    const menu = document.querySelector('.nav-center')
    const burger = document.querySelector('.burger')
    if (isOpen.value && !menu.contains(event.target) && !burger.contains(event.target)) {
        closeMenu()
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
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

.nav-links a {
    font-family: 'Forum', sans-serif;
    font-size: 24px;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 100%;
    transition: opacity 0.3s ease;
}

.nav-links a:hover {
    opacity: 0.8;
}

.sign-in-btn {
    background-color: #ff5c5c;
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

.burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 15;
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

@media (min-width: 769px) {
    .login-desktop {
        display: block;
    }
    .login-mobile {
        display: none;
    }
}

@media (max-width: 768px) {
    .nav-center {
        position: fixed;
        top: 90px;
        left: 0;
        width: 100%;
        background-color: #272727;
        transform: none;
        flex-direction: column;
        display: none;
        z-index: 25;
        padding: 20px 0;
        margin: 0;
    }

    .nav-center.open {
        display: flex;
    }

    .nav-links {
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 20px 0;
    }

    .nav-links a {
        font-size: 20px;
        line-height: normal;
    }

    .burger {
        display: flex;
    }

    .login-desktop {
        display: none;
    }
}

@media (max-width: 1024px) {
    .nav-center {
        position: fixed !important;
        top: 90px;
        left: 0 !important;
        width: 100% !important;
        transform: none !important;
        padding: 20px;
        display: none;
        flex-direction: column;
        background-color: #272727;
        z-index: 20;
    }

    .nav-center.open {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 90px;
        left: 0;
        width: 100%;
        background-color: #272727;
        padding: 20px;
    }

    .nav-links {
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    .burger {
        position: absolute;
        right: 20px;
        top: 30px;
        display: flex;
    }

    .login-desktop {
        display: none;
    }
    .login-mobile {
        display: block;
    }

    .logo-text {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 30px;
    }
}
</style>
