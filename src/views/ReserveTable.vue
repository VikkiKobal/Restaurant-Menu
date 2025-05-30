<template>
    <div class="reserve-page">
        <div class="left-image">
            <img src="@/assets/reserve a table.png" alt="Reservation Image" />
        </div>
        <div class="right-form">
            <div class="header-text">
                <h1>RESERVATION</h1>
                <p>
                    Secure your spot at Qitchen, where exceptional sushi and a <br />remarkable dining experience await.
                </p>
            </div>
            <form @submit.prevent="handleSubmit">
                <input type="text" placeholder="Name" v-model="form.name" required autocomplete="name" />
                <input type="tel" placeholder="Phone Number" v-model="form.phone" required autocomplete="tel" />
                <input type="email" placeholder="Email" v-model="form.email" required autocomplete="email" />

                <div class="row-inputs">
                    <input type="number" placeholder="Guests" v-model="form.guests" min="1" required />
                    <input type="date" v-model="form.date" required />
                    <input type="time" v-model="form.time" required />
                </div>

                <button type="submit">Reserve</button>
            </form>
        </div>
    </div>
    <Footer />
</template>

<script setup>
import { reactive } from 'vue'
import Footer from '@/components/FooterComponent.vue'

const form = reactive({
    name: '',
    phone: '',
    email: '',
    guests: 1,
    date: '',
    time: '',
})

function handleSubmit() {
    alert(`Thank you, ${form.name}! Your reservation is confirmed.`)
    form.name = ''
    form.phone = ''
    form.email = ''
    form.guests = 1
    form.date = ''
    form.time = ''
}
</script>

<style scoped lang="scss">
.reserve-page {
    display: flex;
    height: 100vh;
    background-color: #000;
    color: white;

    .left-image {
        flex: 0.9;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;
        margin-bottom: 20px;
        height: 670px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 15px;
        }
    }

    .right-form {
        flex: 1.2;
        background: #111;
        border: 2px solid rgba(239, 231, 210, 0.15);
        border-radius: 15px;
        padding: 40px 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        height: 606px;
        margin: 20px 40px 20px 10px;

        .header-text {
            text-align: center;
            margin-bottom: 30px;

            h1 {
                font-family: 'Forum', serif;
                font-size: 36px;
                margin-bottom: 8px;
            }

            p {
                font-size: 18px;
                line-height: 1.4;
                color: #efe7d2cc;
            }
        }

        form {
            max-width: 600px;
            width: 100%;
            margin: 0 auto 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;

            input {
                padding: 12px 15px;
                border-radius: 10px;
                border: 1.5px solid rgba(239, 231, 210, 0.15);
                background: #111;
                color: #efe7d2;
                font-size: 16px;
                font-family: 'Forum', serif;

                &::placeholder {
                    color: rgba(239, 231, 210, 0.6);
                }

                &:focus {
                    outline: none;
                    border-color: #ffc164;
                    background: #222;
                }
            }

            .row-inputs {
                display: flex;
                gap: 15px;

                input {
                    flex: 1;
                }
            }

            button {
                margin-top: 10px;
                padding: 14px 0;
                border-radius: 10px;
                border: none;
                background-color: #ffc164;
                color: black;
                font-size: 18px;
                font-family: 'Forum', serif;
                cursor: pointer;
                transition: background-color 0.3s ease, transform 0.2s ease;

                &:hover {
                    background-color: darken(#ffc164, 10%);
                    transform: scale(1.05);
                }
            }
        }
    }

    // ✅ Адаптація: мобільна версія
    @media (max-width: 1024px) {
        flex-direction: column;
        height: auto;

        .left-image {
            order: -1;
            padding: 0;
            margin: 0;

            img {
                width: 100%;
                height: 150px;
                object-fit: cover;
                border-radius: 0;
            }
        }

        .right-form {
            margin: 20px;
            border-radius: 10px;
            padding: 30px 20px;
            height: auto;
        }
    }

    @media (max-width: 600px) {
        .header-text h1 {
            font-size: 28px;
        }

        .header-text p {
            font-size: 16px;
        }

        .row-inputs {
            flex-direction: column;
        }

        form input,
        form button {
            font-size: 16px;
        }
    }
}
</style>
