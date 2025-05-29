<template>
    <div class="about-page">
        <div class="about-image">
            <img src="@/assets/about us-photo.png" alt="About Us" />
        </div>

        <div class="right-container">
            <div class="top-row">
                <div class="intro-text">
                    <h2>Sushi Artistry Redefined</h2>
                    <p>
                        Where culinary craftsmanship meets modern elegance. Indulge in the finest sushi, expertly
                        curated to elevate your dining experience.
                    </p>
                </div>

                <div class="intro-photo">
                    <img src="@/assets/about1.png" alt="Intro Sushi" />
                </div>
            </div>

            <div class="bottom-row">
                <div class="awards">
                    <div class="award" v-for="(text, index) in awards" :key="index">
                        <div class="stars">
                            <img v-for="i in 5" :key="i" src="@/assets/star.png" alt="Star" />
                        </div>
                        {{ text }}
                    </div>
                </div>

                <div class="our-story">
                    <img src="@/assets/about2.png" alt="Restaurant Interior" />
                    <div class="story-text">
                        <h2>Our Story</h2>
                        <p>
                            Founded with a passion for culinary excellence, Qitchen's journey began in the heart of
                            Prague. Over years, it evolved into a haven for sushi enthusiasts, celebrated for its artful
                            mastery and devotion to redefining gastronomy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Footer />
</template>

<script setup>
import Footer from '@/components/FooterComponent.vue'
const awards = ['TRIP ADVISOR', 'MICHELIN GUIDE', 'STAR DINING']
</script>

<style scoped lang="scss">
.about-page {
    display: flex;
    height: 100vh;
    background-color: #000;
    color: #efe7d2;
    font-family: 'Forum', sans-serif;
    overflow-x: hidden;

    .about-image {
        flex: 0 0 45%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;
        margin-bottom: 20px;
        margin-top: 20px;

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
        padding: 25px 40px 40px 0px;
        gap: 20px;

        .top-row {
            display: flex;
            gap: 35px;
            height: 255px;

            .intro-text,
            .intro-photo {
                width: 350px;
                height: 255px;
                background: #111;
                border-radius: 15px;
                border: 2px solid rgba(239, 231, 210, 0.15);
                padding: 20px;
                box-sizing: border-box;
            }

            .intro-text {
                h2 {
                    font-family: 'Forum', serif;
                    font-size: 28px;
                    margin-bottom: 15px;
                    text-align: left;
                }

                p {
                    font-size: 16px;
                    line-height: 1.6;
                }
            }

            .intro-photo {
                padding: 0;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 15px;
                }
            }
        }

        .bottom-row {
            display: flex;
            flex-direction: column;
            gap: 20px;

            .awards {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;

                .award {
                    background: #111;
                    border-radius: 15px;
                    padding: 20px;
                    border: 2px solid rgba(239, 231, 210, 0.15);
                    text-align: center;
                    font-family: 'Forum', serif;
                    font-size: 16px;
                }
            }

            .our-story {
                display: flex;
                gap: 20px;

                img {
                    width: 50%;
                    border-radius: 15px;
                    object-fit: cover;
                }

                .story-text {
                    flex: 1;
                    background: #111;
                    border-radius: 15px;
                    padding: 20px;
                    border: 2px solid rgba(239, 231, 210, 0.15);

                    h2 {
                        font-family: 'Forum', serif;
                        font-size: 24px;
                        margin-bottom: 15px;
                    }

                    p {
                        font-size: 16px;
                        line-height: 1.6;
                    }
                }
            }
        }
    }
}
</style>
