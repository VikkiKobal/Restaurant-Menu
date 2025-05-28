<template>
    <div class="contact-page">
        <div class="contact-image">
            <img src="@/assets/contact-photo.png" alt="Contact" />
        </div>
        <div class="contact-content">
            <h1>Contact Us</h1>
        </div>
    </div>
    <Footer />
</template>

<script setup>
import Footer from '@/components/FooterComponent.vue'
</script>

<style scoped lang="scss">
.contact-page {
    display: flex;
    height: 100vh;
    background-color: #000;
    color: white;

    .contact-image {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;

        img {
            width: 100%;
            max-width: 960px;
            max-height: 100%;
            object-fit: cover;
            border-radius: 15px;
        }
    }

    .contact-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 60px;
        font-family: 'Satoshi', sans-serif;

        h1 {
            font-size: 48px;
            margin-bottom: 30px;
        }
    }
}
</style>
