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

            <p v-if="message" class="success-message">{{ message }}</p>

            <p v-if="error" class="error-message">{{ error }}</p>

            <form @submit.prevent="handleSubmit">
                <input type="email" v-model="email" placeholder="Email" required />
                <input type="password" v-model="password" placeholder="Password" required />

                <button type="submit">
                    {{ isLogin ? 'Login' : 'Register' }}
                </button>
            </form>

            <p class="switch-mode">
                {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
                <span @click="isLogin = !isLogin">
                    {{ isLogin ? 'Register' : 'Login' }}
                </span>
            </p>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import api from '@/api'

const email = ref('')
const password = ref('')
const isLogin = ref(true)
const message = ref('')
const error = ref('')

const userStore = useUserStore()
const { isAdmin } = storeToRefs(userStore)
const router = useRouter()

onMounted(() => {
    userStore.initializeFromStorage()
    if (userStore.isLoggedIn) {
        if (isAdmin.value) {
            router.push('/admin')
        } else {
            router.push('/')
        }
    }
})

const handleSubmit = async () => {
    message.value = ''
    error.value = ''
    try {
        if (isLogin.value) {
            const res = await api.post('/api/auth/login', {
                email: email.value,
                password: password.value,
            })
            const { token, user } = res.data
            userStore.setAuthData(token, user)
            message.value = 'Login successful!'
            if (isAdmin.value) {
                router.push('/admin')
            } else {
                router.push('/')
            }
        } else {
            const res = await api.post('/api/auth/register', {
                email: email.value,
                password: password.value,
            })
            message.value = res.data.message
            isLogin.value = true
        }
    } catch (err) {
        error.value = err.response?.data?.message || 'Something went wrong'
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

        form {
            display: flex;
            flex-direction: column;
            gap: 15px;
            align-items: center;

            input,
            button {
                width: 400px;
                box-sizing: border-box;
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
                border: 1.5px solid transparent;
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

    .success-message {
        color: #2e7d32;
        margin-bottom: 1rem;
    }

    .error-message {
        color: #c62828;
        margin-bottom: 1rem;
    }

    @media (max-width: 1024px) {
        flex-direction: column;
        height: 100vh;

        .login-image {
            order: -1;
            height: 150px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }
        }

        .login-form {
            height: calc(100vh - 150px);
            padding: 40px 20px;
            justify-content: center;

            .form-subtitle {
                font-size: 20px;
            }

            form {
                input,
                button {
                    width: 300px;
                    font-size: 18px;
                    padding: 14px;
                }
            }

            .switch-mode {
                font-size: 20px;
            }
        }
    }

    @media (max-width: 600px) {
        .login-page {
            flex-direction: column;
            height: auto;
        }

        .login-image {
            order: -1;
            height: 150px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }
        }

        .login-form {
            flex: none;
            height: auto;
            padding: 30px 15px;
            gap: 20px;
            justify-content: flex-start;

            .form-subtitle {
                font-size: 18px;
            }

            form {
                input,
                button {
                    width: 300px;
                    font-size: 18px;
                    padding: 12px;
                    max-width: 300px;
                }
            }

            .switch-mode {
                font-size: 18px;
            }
        }
    }
}
</style>