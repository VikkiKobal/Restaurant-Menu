<template>
    <div class="contact-page">
        <div class="contact-image">
            <img src="@/assets/contact-photo.png" alt="Contact" />
        </div>

        <div class="right-container">
            <div class="top-row">
                <div class="opening-hours">
                    <h2>OPENING HOURS</h2>
                    <p>Monday .................... 16:00 - 22:30</p>
                    <p>Tuesday ................... 16:00 - 22:30</p>
                    <p>Wednesday ................. 16:00 - 22:30</p>
                    <p>Thursday .................. 16:00 - 22:30</p>
                    <p>Friday .................... 16:00 - 22:30</p>
                    <p>Saturday & Sunday ......... 16:00 - 22:30</p>
                </div>

                <div class="insta-icons">
                    <a href="https://instagram.com" target="_blank" class="insta-icon">
                        <img src="@/assets/insta1.jpg" alt="Instagram 1" />
                    </a>
                    <a href="https://instagram.com" target="_blank" class="insta-icon">
                        <img src="@/assets/insta2.jpg" alt="Instagram 2" />
                    </a>
                    <a href="https://instagram.com" target="_blank" class="insta-icon">
                        <img src="@/assets/insta3.jpg" alt="Instagram 3" />
                    </a>
                    <a href="https://instagram.com" target="_blank" class="insta-icon">
                        <img src="@/assets/insta4.jpg" alt="Instagram 4" />
                    </a>
                </div>
            </div>

            <div class="bottom-row">
                <div class="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42200.02643169085!2d22.279637599999997!3d48.619381749999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473919b944b6e3d9%3A0xda6ae0130042a3c!2z0KPQttCz0L7RgNC-0LQsINCX0LDQutCw0YDQv9Cw0YLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjA!5e0!3m2!1sru!2sua!4v1748513556227!5m2!1sru!2sua"
                        width="400"
                        height="300"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                <div class="get-in-touch">
                    <h2>GET IN TOUCH</h2>
                    <form @submit.prevent="handleSubmit">
                        <input type="email" placeholder="Email" v-model="form.email" required autocomplete="email" />
                        <textarea placeholder="Message" v-model="form.message" required rows="4"></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <Footer />
</template>

<script setup>
import Footer from '@/components/FooterComponent.vue'
import { reactive } from 'vue'

const form = reactive({
    name: '',
    email: '',
    message: '',
})

function handleSubmit() {
    alert(`Thank you, ${form.name}! Your message has been sent.`)
    form.name = ''
    form.email = ''
    form.message = ''
}
</script>

<style scoped lang="scss">
.contact-page {
    display: flex;
    height: 100vh;
    background-color: #000;
    color: white;

    .contact-image {
        flex: 0, 9;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;

        img {
            width: 100%;
            max-width: 960px;
            max-height: 110%;
            object-fit: cover;
            border-radius: 15px;
        }
    }

    .right-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 25px 40px 40px 10px;
        gap: 20px;
        font-family: 'Satoshi', sans-serif;

        .top-row,
        .bottom-row {
            display: flex;
            gap: 30px;
            height: 350px;
            justify-content: center;
            align-items: stretch;
        }

        .top-row {
            .opening-hours,
            .insta-icons {
                width: 370px;
                height: 350px;
                background: #111;
                border-radius: 15px;
                border: 2px solid rgba(239, 231, 210, 0.15);
                box-sizing: border-box;
                padding: 20px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                color: #efe7d2;
            }

            .opening-hours {
                text-align: center;
                font-family: 'Forum', sans-serif;

                h2 {
                    margin-bottom: 20px;
                    font-size: 28px;
                }

                p {
                    margin-top: 20px;
                    margin: 8px;
                    font-size: 18px;
                }
            }

            .insta-icons {
                padding: 0px;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(2, 1fr);
                gap: 15px;

                .insta-icon {
                    border-radius: 15px;
                    overflow: hidden;
                    cursor: pointer;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        display: block;
                    }

                    &:hover img {
                        filter: brightness(0.8);
                    }
                }
            }
        }

        .bottom-row {
            .map,
            .get-in-touch {
                width: 370px;
                height: 320px; /* Зробили однакову висоту як у top-row */
                border-radius: 15px;
                border: 2px solid rgba(239, 231, 210, 0.15);
                box-sizing: border-box;
                overflow: hidden;
                background: #111;
                color: #efe7d2;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            }

            .get-in-touch {
                padding: 20px;
            }

            .map {
                padding: 0;
            }

            .map iframe {
                width: 100%;
                height: 100%;
                border: 0;
                border-radius: 15px;
            }

            .get-in-touch {
                h2 {
                    font-size: 28px;
                    margin-bottom: 25px;
                    color: #efe7d2;
                    font-family: 'Forum', serif;
                    align-self: center;
                }

                form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;

                    input,
                    textarea {
                        width: 90%;
                        padding: 8px 12px;
                        border-radius: 10px;
                        border: 1.5px solid rgba(239, 231, 210, 0.15);
                        background: #111;
                        color: #efe7d2;
                        font-family: 'Forum', serif;
                        font-size: 16px;
                        resize: vertical;

                        &::placeholder {
                            color: rgba(239, 231, 210, 0.6);
                        }

                        &:focus {
                            outline: none;
                            border-color: #ffc164;
                            background: #222;
                        }
                    }

                    textarea {
                        height: 50px;
                        min-height: 50px;
                    }

                    button {
                        padding: 12px 0;
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
        }
    }
}
</style>