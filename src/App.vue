<template>
    <HeaderComponent />
    <router-view />
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<style lang="scss">
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}
</style>