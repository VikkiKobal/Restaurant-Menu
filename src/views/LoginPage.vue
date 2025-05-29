<template>
    <div class="login-page">
        <div class="login-image">
            <img src="@/assets/login-photo.jpg" alt="Login" />
        </div>

        <div class="login-form">
            <p class="form-subtitle">
                Your gateway to gourmet best dishes. <br />
                {{ isLogin ? 'Please log in to continue.' : 'Create an account to join us.' }}
            </p>
            <form @submit.prevent="handleSubmit">
                <input type="email" v-model="email" placeholder="Email" required />
                <input type="password" v-model="password" placeholder="Password" required />

                <button type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
            </form>

            <p class="switch-mode">
                {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
                <span @click="isLogin = !isLogin">{{ isLogin ? 'Register' : 'Login' }}</span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const isLogin = ref(true)

const handleSubmit = () => {
    if (isLogin.value) {
        // логіка входу
        console.log('Login with', email.value, password.value)
    } else {
        // логіка реєстрації
        console.log('Register with', email.value, password.value)
    }
}
</script>

<style scoped lang="scss">
$color-yellow: #ffc164;

.login-page {
    display: flex;
    height: 100vh;
    font-family: 'Forum', sans-serif;
    overflow: hidden;

    .login-image {
        flex: 1;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .login-form {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #000;
        color: #efe7d2;
        padding: 40px;
        gap: 20px;

        .form-subtitle {
            font-size: 20px;
            text-align: center;
            max-width: 400px;
            line-height: 1.5;
            margin-bottom: 20px;
            color: #ccc;
        }

        h1 {
            font-size: 36px;
            margin-bottom: 20px;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 15px;
            align-items: center;

            input,
            button {
                width: 400px;
                box-sizing: border-box; // дуже важливо!
                padding: 12px;
                border-radius: 10px;
                font-size: 18px;
                font-family: 'Forum', serif;
            }

            input {
                border: 1.5px solid rgba(239, 231, 210, 0.15);
                background: #111;
                color: #efe7d2;

                &::placeholder {
                    color: rgba(239, 231, 210, 0.6);
                }

                &:focus {
                    outline: none;
                    border-color: $color-yellow;
                    background: #222;
                }
            }

            button {
                margin-top: 10px;
                margin-bottom: 25px;
                background-color: $color-yellow;
                color: black;
                border: 1.5px solid transparent; // додаємо border, щоб не змінювалася висота
                cursor: pointer;
                transition: background-color 0.3s ease, transform 0.2s ease;

                &:hover {
                    background-color: darken($color-yellow, 10%);
                    transform: scale(1.05);
                }
            }
        }
        .switch-mode {
            font-size: 16px;
            color: #ccc;
            text-align: center;

            span {
                color: $color-yellow;
                cursor: pointer;
                transition: color 0.3s ease;

                &:hover {
                    color: darken($color-yellow, 10%);
                }
            }
        }
    }
}
</style>
