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
            width: 100%;
            max-width: 400px;
            gap: 15px;

            input {
                padding: 12px;
                border: none;
                font-size: 16px;
            }

            button {
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
        }

        .switch-mode {
            margin-top: 10px;
            font-size: 18px;

            span {
                margin-left: 5px;
                color: #efe7d2;
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
}
</style>
