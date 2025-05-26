<template>
    <div class="home">
        <img src="@/assets/main-photo.jpg" alt="Main photo" class="main-photo" />
        <div class="bottom-fade"></div>
        <h1 class="main-heading">Taste the rich flavour of high quality meals</h1>
        <p class="sub-heading">
            We only use the five star quality for our menu, come and get the richness in every meals we serve.
        </p>
        <button clas s="go-to-menu-btn">Go to Menu</button>
    </div>
    <section class="todays-special">
        <img src="@/assets/Vector 2.png" alt="Left arrow" class="arrow arrow-left" />
        <h1 class="special-heading">Today's Special</h1>
        <p class="special-subheading">
            Special menu oftenly comes different everyday,<br />
            this is our special food for today.
        </p>
        <img src="@/assets/Vector 1.png" alt="Right arrow" class="arrow arrow-right" />
    </section>
</template>

<script setup>
</script>

<style lang="scss" scoped>
$color-yellow: #ffc164;
$color-white: white;
$font-heading: 'DM Serif Display', serif;
$font-subheading: 'DM Sans', sans-serif;
$font-button: 'Inter', sans-serif;

/* Міксини для заголовків */
@mixin heading-style($font-size, $color) {
    font-family: $font-heading;
    font-weight: 400;
    font-size: $font-size;
    color: $color;
    margin: 0;
    text-align: center;
}

/* Міксини для підзаголовків */
@mixin subheading-style($font-size, $color) {
    font-family: $font-subheading;
    font-weight: 400;
    font-size: $font-size;
    color: $color;
    max-width: 75%;
    text-align: center;
    margin: 0;
}

/* Основний блок з фото */
.home {
    position: relative;
    width: 100%;
    height: 100vh; // повна висота екрану
    overflow: hidden;
}
.main-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.6);
    display: block;
}

.main-heading {
    @include heading-style(50px, $color-yellow);
    position: absolute;
    top: 23%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
}

.sub-heading {
    @include subheading-style(30px, $color-white);
    position: absolute;
    top: 37%;
    left: 50%;
    transform: translateX(-50%);
    white-space: normal;
}

.go-to-menu-btn {
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translate(-50%, 0);
    font-family: $font-button;
    font-size: 32px;
    font-weight: 400;
    color: $color-white;
    background-color: rgba(255, 159, 15, 0.15);
    border: 2px solid #ff9f0f;
    padding: 12px 40px;
    border-radius: 6px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: #ff9f0f;
        color: $color-white;
    }
}

.bottom-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px; // висота градієнту — можеш змінити
    pointer-events: none;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
    z-index: 2; // щоб було поверх фото, але під текстом
}

.todays-special {
    position: relative;
    background-color: black;
    padding: 60px 60px 20px; // зверху більший паддінг, знизу менший
    text-align: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; // текст вгорі
    align-items: center;
    gap: 20px;

    margin-top: 0;
}

.arrow {
    position: absolute;
    top: 20%;
    width: 200px;
    height: auto;
    transform: translateY(-50%);
    cursor: pointer;
}

.arrow-left {
    left: 100px;
}

.arrow-right {
    right: 100px;
}

.special-heading {
    @include heading-style(50px, $color-yellow);
}

.special-subheading {
    @include subheading-style(30px, $color-white);
}
</style>
