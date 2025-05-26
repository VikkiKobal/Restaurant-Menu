<template>
    <HeaderComponent />
    <router-view />
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'

export default {
    name: 'App',
    components: {
        HeaderComponent,
    },
}
</script>

<style lang="scss">
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}
</style>
