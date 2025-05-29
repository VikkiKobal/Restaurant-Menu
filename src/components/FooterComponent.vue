<template>
    <footer class="footer">
        <div class="overlay">
            <h2 class="footer-text">
                We are always ready to surprise<br />
                you with new flavours
            </h2>

            <div class="contact-row">
                <div class="contact-item">
                    <img src="@/assets/location.png" alt="Address" class="icon" />
                    <span>Uzhhorod, 14 Universytetska Street</span>
                </div>
                <div class="contact-item">
                    <img src="@/assets/call.png" alt="Phone" class="icon" />
                    <span>+380 67 123 45 67</span>
                </div>
            </div>

            <router-link to="/reserve" class="reserve-button">Reserve A Table</router-link>

            <div class="socials">
                <a href="https://instagram.com" target="_blank" class="social-item">
                    <span class="social-text">Instagram</span>
                    <span class="line"></span>
                </a>
                <a href="https://twitter.com" target="_blank" class="social-item">
                    <span class="social-text">Twitter</span>
                    <span class="line"></span>
                </a>
                <a href="https://facebook.com" target="_blank" class="social-item">
                    <span class="social-text">Facebook</span>
                    <span class="line"></span>
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup>
</script>

<style scoped lang="scss">
$color-yellow: #ffc164;

.footer {
    position: relative;
    height: 450px;
    background: url(~@/assets/footer-photo.png) center center/cover no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    box-sizing: border-box;
    color: white;
}

.footer-text {
    font-family: 'Forum', serif;
    font-weight: 400;
    font-size: 45px;
    line-height: 1.2;
    text-align: center;
    white-space: pre-line;
    color: white;
    max-width: 700px;
    margin-bottom: 40px;
}

.contact-row {
    display: flex;
    gap: 50px;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    flex-wrap: wrap;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'Forum', serif;
    font-size: 20px;
    color: white;
}

.icon {
    width: 30px;
    height: 40px;
    filter: $color-yellow;
}

.socials {
    display: flex;
    gap: 50px;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    flex-wrap: wrap;
}

.social-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;

    &:hover .social-text {
        color: $color-yellow;
    }
}

.social-text {
    font-size: 24px;
    color: white;
    margin-bottom: 6px;
    font-family: 'Forum', serif;
    font-weight: 500;
    letter-spacing: 1px;
    transition: color 0.3s ease;
}

.line {
    height: 3px;
    background-color: $color-yellow;
    width: 100%;
}

.reserve-button {
    margin-top: 10px;
    text-decoration: none;
    margin-bottom: 25px;
    padding: 12px 30px;
    background-color: $color-yellow;
    color: black;
    border: none;

    font-size: 18px;
    font-family: 'Forum', serif;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: darken($color-yellow, 10%);
        transform: scale(1.05);
    }
}
</style>
