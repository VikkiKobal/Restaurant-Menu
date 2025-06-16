<template>
    <div class="page-wrapper">
        <div class="about-page">
            <div class="about-container">
                <div class="about-image">
                    <img src="@/assets/about us-photo.png" alt="About Us" />
                </div>

                <div class="content">
                    <div class="intro-section">
                        <div class="intro-text">
                            <h2>Cibo Gustoso - Pure Taste</h2>
                            <p>
                                Experience a perfect blend of authentic flavors and warm hospitality in a stylish and
                                inviting atmosphere. At Cibo Gustoso, every dish is crafted with passion and the finest
                                ingredients to delight your senses.
                            </p>
                        </div>
                        <div class="intro-photo">
                            <img src="@/assets/about1.png" alt="Intro Dish" />
                        </div>
                    </div>

                    <div class="awards">
                        <div class="award" v-for="(text, index) in awards" :key="index">
                            <div class="stars">
                                <img v-for="i in 5" :key="i" src="@/assets/star.png" alt="Star" />
                            </div>
                            {{ text }}
                        </div>
                    </div>

                    <div class="story">
                        <img src="@/assets/about2.png" alt="Restaurant Interior" />
                        <div class="story-text">
                            <h2>Our Story</h2>
                            <p>
                                Born from a love for exceptional cuisine and memorable experiences, Cibo Gustoso has
                                grown into a cherished destination for food lovers seeking both innovation and
                                tradition. We pride ourselves on delivering impeccable service, unforgettable flavors,
                                and a welcoming ambiance that feels like home.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    </div>
</template>


<script setup>
import Footer from '@/components/FooterComponent.vue'
const awards = ['TRIP ADVISOR', 'MICHELIN GUIDE', 'STAR DINING']
</script>

<style scoped lang="scss">
.page-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.about-page {
    flex: 1 0 auto;
    background-color: #000;
    color: #efe7d2;
    font-family: 'Forum', sans-serif;

    .about-container {
        display: flex;
        padding: 10px 0;
        gap: 20px;

        .about-image {
            width: 40%;
            padding: 10px;

            img {
                width: 100%;
                height: 96%;
                margin-left: 20px;
                margin-top: 20px;
                object-fit: cover;
                border-radius: 15px;
            }
        }

        .content {
            width: 60%;
            padding: 30px;
            display: flex;
            flex-direction: column;
            gap: 30px;
        }
    }

    .intro-section {
        display: flex;
        gap: 20px;

        .intro-text,
        .intro-photo {
            flex: 1;
            background: #111;
            border-radius: 15px;
            border: 2px solid rgba(239, 231, 210, 0.15);
            padding: 20px;
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

        .intro-text h2 {
            font-size: 28px;
            margin-bottom: 10px;
        }

        .intro-text p {
            font-size: 16px;
            line-height: 1.6;
        }
    }

    .awards {
        display: flex;
        gap: 20px;
        justify-content: space-between;

        .award {
            flex: 1;
            background: #111;
            border-radius: 15px;
            border: 2px solid rgba(239, 231, 210, 0.15);
            padding: 20px;
            text-align: center;
            font-size: 16px;

            .stars {
                margin-bottom: 10px;

                img {
                    width: 20px;
                    margin-right: 2px;
                }
            }
        }
    }

    .story {
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
                font-size: 24px;
                margin-bottom: 15px;
            }

            p {
                font-size: 16px;
                line-height: 1.6;
            }
        }
    }

    @media (max-width: 768px) {
        .about-container {
            flex-direction: column;
            padding: 10px;

            .about-image,
            .content {
                width: 100%;
                min-width: auto;
                padding: 0;
            }

            .about-image {
                height: 150px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    margin: 0;
                }
            }

            .content {
                padding: 20px 0;
            }
        }

        .intro-section,
        .story {
            flex-direction: column;
            gap: 20px;
        }

        .awards {
            flex-direction: column;
            gap: 10px;

            .award {
                font-size: 14px;
                flex-basis: auto;
            }
        }

        .story img {
            width: 100%;
            height: auto;
            min-width: auto;
        }
    }
}
</style>
