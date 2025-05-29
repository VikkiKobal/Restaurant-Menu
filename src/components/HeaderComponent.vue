<template>
    <header class="header">
        <RouterLink to="/" class="logo-text">Cibo gustoso</RouterLink>

        <nav class="nav-center">
            <ul class="nav-links">
                <router-link :to="{ path: '/', hash: '#menu' }" class="nav-link">Menu</router-link>
                <router-link to="/reserve">Reserve A Table</router-link>
                <router-link to="/about" class="nav-link">About Us</router-link>
                <li><RouterLink to="/contact">Contact</RouterLink></li>
            </ul>
        </nav>
        <router-link to="/login"> <button class="sign-in-btn">Sign In</button> </router-link>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
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
    padding: 0 40px;
    position: relative;
}

.logo-text {
    font-family: 'Elsie', cursive;
    font-weight: 900;
    font-size: 28px;
    color: white;
    z-index: 2;
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
    font-weight: 400;
    font-size: 24px;
    color: white;
    text-decoration: none;
    line-height: 90px;
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
</style>
