<script>
import MobileNavbar from '@/src/components/mobile_navbar.vue'
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import Footer from '@components/footer.vue'
import { Carousel, Slide } from 'vue-carousel'
// import store from '@state/store'

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, Carousel, Slide, MobileNavbar, Footer },
  data() {
    return {
      workshops: [],
      showModal: false,
    }
  },
  created() {
    // store.dispatch('workshops/fetchWorkshops').then((data) => {
    //   this.workshops = data
    // })
  },
  methods: {
    showCartaModal() {
      this.showModal = true
    },
    closeCartaModal() {
      this.showModal = false
    },
  },
}
</script>

<template>
  <Layout>
    <MobileNavbar :show-back-button="false" />
    <div class="home">
      <div class="item-flex sectionCarrusel">
        <Carousel
          :per-page="1"
          :autoplay="true"
          :autoplay-timeout="3000"
          :speed="700"
          :loop="true"
          :pagination-size="0"
        >
          <Slide class="carruselSlide">
            <img
              class="desktop"
              src="../../assets/images/desktop/carrusel/carrusel_1.png"
            />
            <img
              class="mobile"
              src="../../assets/images/mobile/carrusel/carrusel_mobile_1.png"
            />
          </Slide>
          <Slide class="carruselSlide">
            <img
              class="desktop"
              src="../../assets/images/desktop/carrusel/carrusel_2.png"
            />
            <img
              class="mobile"
              src="../../assets/images/mobile/carrusel/carrusel_mobile_2.png"
            />
          </Slide>
          <Slide class="carruselSlide">
            <img
              class="desktop"
              src="../../assets/images/desktop/carrusel/carrusel_3.png"
            />
            <img
              class="mobile"
              src="../../assets/images/mobile/carrusel/carrusel_mobile_3.png"
            />
          </Slide>
          <Slide class="carruselSlide">
            <img
              class="desktop"
              src="../../assets/images/desktop/carrusel/carrusel_4.png"
            />
            <img
              class="mobile"
              src="../../assets/images/mobile/carrusel/carrusel_mobile_4.png"
            />
          </Slide>
        </Carousel>
      </div>
      <div class="titleWrapper">
        <h1 class="title desktop">Hola! somos Casa Kutral</h1>
      </div>
      <div class="bloqueInfo sectionAboutUs" style="margin-bottom: 15%;">
        <div class="about">
          <div class="item-flex desktop">
            <img
              src="../../assets/images/desktop/hola_somos_kutral_desktop.png"
            />
          </div>
          <div class="item-flex">
            <p class="italicText textAbout desktop">
              <span>Espacio que nace en manos de una mujer</span>
              <span>para aportar a la comunidad.</span>
              <span>Todos portamos un kutral,</span>
              <span><strong>nuestra energía creadora.</strong></span>
              <span>Gastronomía y comunidad.</span>
              <span>Eso y más es Casa Kutral.</span>
            </p>
            <h1 class="title mobile">Hola! somos Casa Kutral,</h1>
            <p class="italicText textAbout mobile">
              espacio que nace en manos de una mujer para aportar a la
              comunidad. Todos portamos un kutral, nuestra energía creadora.
              Gastronomía y comunidad. Eso y más es Casa Kutral
            </p>
          </div>
        </div>
      </div>
      <div class="bloqueInfo sectionBannerSeparador">
        <h2 class="title-shadow">
          <span>Todos portamos un kutral,</span><br />
          <span>nuestra energía creadora. </span>
        </h2>
      </div>
      <div class="como-pedir">
        <h1 class="title">¿Cómo pido?</h1>
        <p class="textAbout">
          Para hacer tu pedido revisa nuestra carta haciendo click en la imagen
          de abajo.
        </p>
        <p class="textAbout">
          Cúando te decidas puedes agendar tu pedido a nuestro whatsapp.
        </p>
      </div>
      <div class="cartaWrapper">
        <img
          class="cartaPreview"
          src="../../assets/images/carta/carta_0.png"
          @click="showCartaModal"
        />
      </div>
      <md-dialog
        :md-active="showModal"
        :md-fullscreen="true"
        class="cartaModal"
      >
        <md-dialog-actions>
          <md-button class="btn-cancel close-btn" @click="closeCartaModal"
            >X</md-button
          >
        </md-dialog-actions>
        <Carousel
          :per-page="1"
          :autoplay="false"
          :speed="700"
          :loop="false"
          :pagination-size="0"
          :navigation-enabled="true"
        >
          <Slide class="carruselSlide">
            <img class="" src="../../assets/images/carta/carta_1.png" />
          </Slide>
          <Slide class="carruselSlide">
            <img class="" src="../../assets/images/carta/carta_2.png" />
          </Slide>
          <Slide class="carruselSlide">
            <img class="" src="../../assets/images/carta/carta_3.png" />
          </Slide>
        </Carousel>
      </md-dialog>
      <!-- <div class="bloqueInfo sectionBannerEnergiaCreadora">
        <h2 class="title-shadow">
          <span>Todos portamos un kutral,</span><br />
          <span>nuestra energía creadora. </span>
        </h2>
      </div> -->
      <!-- <div class="bloqueInfo sectionCards">
        <div class="cardContainer">
          <div class="card actividades item-flex">
            <p class="italicText title">Actividades</p>
            <svg
              width="48"
              height="74"
              viewBox="0 0 48 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.2002 13.875C35.1752 13.875 38.4002 10.7676 38.4002 6.9375C38.4002 3.10742 35.1752 0 31.2002 0C27.2252 0 24.0002 3.10742 24.0002 6.9375C24.0002 10.7676 27.2252 13.875 31.2002 13.875ZM45.3751 35.4246L41.8802 33.7191L40.4252 29.4699C38.2201 23.0238 32.0702 18.5145 25.0952 18.5C19.6952 18.4855 16.7102 19.9598 11.1002 22.1422C7.86015 23.3996 5.20516 25.7844 3.64516 28.8195L2.64016 30.7852C1.47016 33.0687 2.41516 35.8438 4.77016 36.9855C7.11016 38.1273 9.96015 37.2023 11.1452 34.9188L12.1502 32.9531C12.6752 31.9414 13.5452 31.1465 14.6252 30.7273L18.6452 29.1664L16.3652 37.9395C15.5852 40.9457 16.4252 44.1398 18.6002 46.4379L27.5852 55.8902C28.6652 57.032 29.4302 58.4051 29.8202 59.8937L32.5652 70.4879C33.2102 72.9594 35.8202 74.477 38.3852 73.8555C40.9501 73.234 42.5252 70.7191 41.8802 68.2477L38.5502 55.3844C38.1602 53.8957 37.3952 52.5082 36.3152 51.3809L29.4902 44.1977L32.0702 34.2684L32.8952 36.6531C33.6902 38.9801 35.4002 40.9023 37.6502 42.0008L41.1451 43.7062C43.4851 44.848 46.3351 43.923 47.5201 41.6395C48.6751 39.3703 47.7301 36.5664 45.3751 35.4246ZM11.0402 55.7602C10.5602 56.9309 9.84015 57.9859 8.91016 58.8676L1.41016 66.1086C-0.464844 67.9152 -0.464844 70.8492 1.41016 72.6559C3.28516 74.4625 6.31515 74.4625 8.19015 72.6559L17.1002 64.0707C18.0152 63.1891 18.7352 62.134 19.2302 60.9633L21.2552 56.0781C12.9602 47.3629 15.4502 50.0367 14.1452 48.3168L11.0402 55.7602Z"
                fill="white"
              />
            </svg>
            <p class="italicText"
              >ActividadesLorem Ipsum is simply dummy text of the printing
              typesettinpmg industry.Lorem Ipsum has been theindustry's
              standard</p
            >
          </div>
          <div class="card cocina item-flex">
            <p class="italicText title">Cocina</p>
            <svg
              width="66"
              height="68"
              viewBox="0 0 66 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M65.8094 33.9774C56.7899 33.8645 49.5067 26.3155 49.5067 16.996C40.4613 16.996 33.1356 9.49344 33.0247 0.201878C29.5107 -0.347966 25.9181 0.241721 22.7483 1.90453L13.837 6.58219C10.6291 8.26656 8.02127 10.9543 6.38754 14.2601L1.86293 23.4082C0.22435 26.7223 -0.354132 30.4858 0.210357 34.1594L1.76754 44.289C2.33147 47.959 4.00825 51.3509 6.5577 53.979L13.6179 61.2518C16.1593 63.8711 19.4403 65.5941 22.9907 66.1738L32.8791 67.7875C36.4253 68.3666 40.0591 67.7729 43.2599 66.0928L52.1712 61.4165C55.3788 59.7317 57.9865 57.044 59.6207 53.7386L64.1453 44.5905C65.7643 41.318 66.338 37.6072 65.8094 33.9774ZM22.6877 48.8763C20.41 48.8763 18.5627 46.9731 18.5627 44.6263C18.5627 42.2795 20.41 40.3763 22.6877 40.3763C24.9655 40.3763 26.8127 42.2795 26.8127 44.6263C26.8127 46.9731 24.9655 48.8763 22.6877 48.8763ZM26.8127 27.6263C24.535 27.6263 22.6877 25.7231 22.6877 23.3763C22.6877 21.0295 24.535 19.1263 26.8127 19.1263C29.0905 19.1263 30.9377 21.0295 30.9377 23.3763C30.9377 25.7231 29.0905 27.6263 26.8127 27.6263ZM47.4377 44.6263C45.16 44.6263 43.3127 42.7231 43.3127 40.3763C43.3127 38.0295 45.16 36.1263 47.4377 36.1263C49.7155 36.1263 51.5627 38.0295 51.5627 40.3763C51.5627 42.7231 49.7155 44.6263 47.4377 44.6263Z"
                fill="white"
              />
            </svg>
            <p class="italicText"
              >Lorem Ipsum is simply dummy text of the printing typesettinpmg
              industry.Lorem Ipsum has been theindustry's standard</p
            >
          </div>
        </div>
      </div>
      <div class="bloqueInfo sectionRecomendaciones">
        <div class="container">
          <div class="titleWrapper">
            <h1 class="title">Esta semana te recomendamos</h1>
          </div>
          <div class="cardContainer">
            <div
              v-for="workshop in workshops"
              :key="workshop._id"
              class="card item-flex"
            >
              <router-link
                :to="{
                  path: '/actividades',
                  query: { workshopId: workshop._id },
                }"
                class="card-link"
              >
                <img :src="workshop.pictureMobile" alt="yoga" />
                <p class="normalText"
                  ><strong>{{ workshop.name }}</strong></p
                >
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="bloqueInfo sectionNovedades">
        <div class="container">
          <div class="titleWrapper">
            <h1 class="title">Últimas novedades</h1>
          </div>
          <div class="cardContainer">
            <div class="card">
              <div class="item-flex">
                <img
                  class="desktop"
                  src="../../assets/images/desktop/novedades_1-2-3_desktop.png"
                />
              </div>
              <div class="imgMobile">
                <img
                  class="mobile"
                  src="../../assets/images/mobile/novedades_1-2-3.png"
                />
              </div>
              <div class="item-flex">
                <p class="italicText">
                  <span><strong>Gypesettinpmg industry rem Ipsum</strong></span>
                  industry's standard Lorem Ipsum is simply dummy text of the
                  printing typesettinpmg industry. Lorem Ipsum has been the.
                </p>
              </div>
            </div>
            <div class="card">
              <div class="item-flex">
                <p class="italicText">
                  <span><strong>Gypesettinpmg industry rem Ipsum</strong></span>
                  industry's standard Lorem Ipsum is simply dummy text of the
                  printing typesettinpmg industry. Lorem Ipsum has been the.
                </p>
              </div>
              <div class="imgMobile">
                <img
                  class="mobile"
                  src="../../assets/images/mobile/novedades_1-2-3.png"
                />
              </div>
              <div class="item-flex">
                <img
                  class="desktop"
                  src="../../assets/images/desktop/novedades_1-2-3_desktop.png"
                />
              </div>
            </div>
            <div class="card">
              <div class="item-flex">
                <img
                  class="desktop"
                  src="../../assets/images/desktop/novedades_1-2-3_desktop.png"
                />
              </div>
              <div class="imgMobile">
                <img
                  class="mobile"
                  src="../../assets/images/mobile/novedades_1-2-3.png"
                />
              </div>
              <div class="item-flex">
                <p class="italicText">
                  <span><strong>Gypesettinpmg industry rem Ipsum</strong></span>
                  industry's standard Lorem Ipsum is simply dummy text of the
                  printing typesettinpmg industry. Lorem Ipsum has been the.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bloqueInfo sectionBannerSeparador">
        <h2 class="title-shadow">
          <span>Todos portamos un kutral,</span><br />
          <span>nuestra energía creadora. </span>
        </h2>
      </div>
      <div class="bloqueInfo sectionGustos">
        <div class="container">
          <div class="titleWrapper">
            <h1 class="title">Date un gustito</h1>
          </div>
          <div class="cardContainer">
            <div class="card">
              <img
                src="../../assets/images/desktop/date_un_gusto/comida_1.png"
                alt="loren ipsum"
              />
              <p class="normalText"><strong>Gypesettinpmg industry</strong> </p>
              <p class="normalText"
                >Text of the printing typesettinpmg industry lorem Ipsum has
                beenhho.</p
              >
            </div>
            <div class="card">
              <img
                src="../../assets/images/desktop/date_un_gusto/comida_2.png"
                alt="loren ipsum"
              />
              <p class="normalText"><strong>Gypesettinpmg industry</strong> </p>
              <p class="normalText"
                >Text of the printing typesettinpmg industry lorem Ipsum has
                beenhho.</p
              >
            </div>
            <div class="card">
              <img
                src="../../assets/images/desktop/date_un_gusto/comida_3.png"
                alt="loren ipsum"
              />
              <p class="normalText"><strong>Gypesettinpmg industry</strong> </p>
              <p class="normalText"
                >Text of the printing typesettinpmg industry lorem Ipsum has
                beenhho.</p
              >
            </div>
          </div>
          <div class="titleWrapper">
            <button class="primary">
              Ir a la Cocina
            </button>
          </div>
        </div>
      </div> -->
      <!-- <div class="bloqueInfo sectionMapa">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.6204938330316!2d-71.49539088486375!3d-32.72271078098849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689bf3b3cf3349f%3A0xc6af07c2b30e3de5!2sAv%20Central%2C%20Puchuncavi%2C%20Puchuncav%C3%AD%2C%20Valpara%C3%ADso!5e0!3m2!1ses!2scl!4v1611623559624!5m2!1ses!2scl"
          width="1440"
          height="360"
          frameborder="0"
          style="border:0;"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div> -->
    </div>
    <Footer />
  </Layout>
</template>

<style lang="scss" scoped>
@import '@design';

@media (max-width: 600px) {
  .home {
    width: 100%;
    height: 100%;
    .banner {
      width: 100%;
      margin-bottom: 2%;
    }
    .como-pedir {
      text-align: center;
      .textAbout {
        @include normalText;

        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 2rem;
        line-height: 28.8px;
      }
    }

    .sectionCarrusel {
      .carruselSlide {
        flex-basis: auto;
        img {
          width: 100vw;
          padding: 18px;
          border: 1px solid #fff;
          border-radius: 10px;
        }
      }
    }

    .bloqueInfo {
      @include bloqueInfo;

      &.sectionAboutUs {
        margin-top: -12%;
        .about {
          display: block;
          width: 90%;
          margin: 1rem;
          text-align: center;
          .title {
            margin: 0;
          }
          .textAbout {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0;
            line-height: 21.28px;
          }
        }
      }

      &.sectionBannerEnergiaCreadora {
        @include mediaCover;

        width: 100%;
        margin-top: 5%;
        background-image: url('../../assets/images/desktop/banner_energia_creadora_desktop.png');
        border-radius: 0;
        .title-shadow {
          @include title;

          color: white;
          text-shadow: 2px 3px 3px #00256a;
        }
      }

      &.sectionCards {
        .cardContainer {
          display: block;
          justify-content: space-between;
          width: 90%;
          .card {
            width: 100%;
            padding: 1% 3%;
            margin-top: 8%;
            text-align: center;
            border-radius: 6px;
            p {
              line-height: 19.2px;
              color: white !important;
            }
            svg {
              width: 10%;
            }
            &.actividades {
              background-color: $rosado-original;
              .title {
                font-size: 26px;
              }
            }
            &.cocina {
              background-color: $verde-original;
              .title {
                font-size: 26px;
              }
            }
          }
        }
      }
      &.sectionRecomendaciones {
        margin-top: 5%;
        .container {
          display: block;
          width: 100%;
          .cardContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            text-align: center;
            .card {
              width: 45%;
              text-align: center;
              border-left: 0.5rem solid #fff;
              img {
                border-radius: 6px;
              }
            }
          }
        }
      }
      &.sectionBannerSeparador {
        @include mediaCover;

        width: 100%;
        margin-bottom: 5%;
        background-image: url('../../assets/images/desktop/banner_separador_desktop.png');
        border-radius: 0;
        .title-shadow {
          color: transparent;
        }
      }
      &.sectionNovedades {
        margin-top: 5%;
        background-color: $verde-oscuro;
        .title {
          color: white !important;
        }
        .container {
          width: 80%;
          .cardContainer {
            padding-bottom: 8%;
            .card {
              display: inline-flex;
              justify-content: space-between;
              margin-top: 4%;
              p {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 5%;
                line-height: 19.2px;
                color: white;
              }
              img {
                border-radius: 6px;
                &.mobile {
                  height: fit-content;
                }
              }
              div {
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
              &:nth-child(even) {
                flex-direction: row-reverse;
              }
              .imgMobile {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 100%;
              }
            }
          }
        }
      }
      &.sectionGustos {
        .container {
          display: block;
          width: 90%;
          .cardContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            .card {
              display: block;
              width: 48%;
              margin-top: 2rem;
              text-align: center;
              img {
                margin-bottom: 15px;
              }
              p {
                margin: 5px;
                line-height: 19.2px;
                color: 000000;
                text-align: center;
              }
            }
          }
        }
      }
      &.sectionMapa {
        iframe {
          width: 100%;
          height: 360px;
        }
      }
    }
    .mobile {
      display: block !important;
    }
    .desktop {
      display: none !important;
    }
    .title {
      font-size: 22px;
    }
    .cartaWrapper {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 10%;
      margin-bottom: 20%;
      .cartaPreview {
        width: 70%;
      }
    }
    .cartaModal {
      .carruselSlide {
        display: flex;
        align-content: center;
        align-items: center;
        height: 85vh;
      }
    }
  }
}

@media (min-width: 600px) {
  .home {
    width: 100vw;
    height: 100%;
    .banner {
      width: 100%;
      margin-bottom: 2%;
    }
    .sectionCarrusel {
      .carruselSlide {
        flex-basis: auto;
        img {
          width: 100vw;
        }
      }
    }
    .como-pedir {
      .textAbout {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 2rem;
        line-height: 28.8px;
      }
    }

    .bloqueInfo {
      @include bloqueInfo;

      &.sectionAboutUs {
        margin-top: 0%;
        .about {
          display: inline-flex;
          justify-content: center;
          width: 90%;
          .textAbout {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 2rem;
            line-height: 28.8px;
          }
          img {
            border-radius: 6px;
          }
          .desktop {
            flex-direction: column;
            justify-content: center;
          }
        }
      }

      &.sectionBannerEnergiaCreadora {
        @include mediaCover;

        width: 100%;
        margin-top: 5%;
        background-image: url('../../assets/images/desktop/banner_energia_creadora_desktop.png');
        border-radius: 0;
        .title-shadow {
          @include title;

          color: white;
          text-shadow: 2px 3px 3px #00256a;
        }
      }

      &.sectionCards {
        .cardContainer {
          display: flex;
          justify-content: space-between;
          width: 90%;
          .card {
            width: 47%;
            padding: 1% 3%;
            margin-top: 8%;
            text-align: center;
            border-radius: 6px;
            p {
              line-height: 24px;
              color: white !important;
            }
            &.actividades {
              background-color: $rosado-original;
              .title {
                font-size: 20px;
              }
            }
            &.cocina {
              background-color: $verde-original;
              .title {
                font-size: 20px;
              }
            }
          }
        }
      }
      &.sectionRecomendaciones {
        margin-top: 5%;
        .container {
          display: block;
          width: 90%;
          .cardContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            text-align: center;
            .card {
              text-align: center;
              border-left: 0.5rem solid #fff;
              img {
                width: 250px;
                border-radius: 6px;
              }
            }
          }
        }
      }
      &.sectionBannerSeparador {
        @include mediaCover;

        width: 100%;
        margin-bottom: 5%;
        background-image: url('../../assets/images/desktop/banner_separador_desktop.png');
        border-radius: 0;
        .title-shadow {
          color: transparent;
        }
      }
      &.sectionNovedades {
        margin-top: 5%;
        background-color: $verde-oscuro;
        .title {
          color: white !important;
        }
        .container {
          width: 80%;
          .cardContainer {
            padding-bottom: 8%;
            .card {
              display: inline-flex;
              justify-content: space-between;
              margin-top: 4%;
              p {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 5%;
                line-height: 28.8px;
                color: white;
              }
              div {
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
              img {
                border-radius: 6px;
              }
              .imgMobile {
                display: none;
              }
              &:nth-child(even) {
                p {
                  margin-right: 5%;
                  margin-left: 0%;
                }
              }
            }
          }
        }
      }
      &.sectionGustos {
        margin-bottom: 3%;
        .container {
          display: block;
          width: 80%;
          .cardContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .card {
              display: block;
              width: 30%;
              text-align: center;
              img {
                margin-bottom: 15px;
              }
              p {
                margin: 10px;
                color: 000000;
                text-align: center;
              }
            }
          }
        }
      }
      &.sectionMapa {
        iframe {
          width: 100%;
          height: 360px;
        }
      }
    }
    .desktop {
      display: flex !important;
    }
    .mobile {
      display: none !important;
    }
  }
}

@media (min-width: 1200px) {
  .home {
    .como-pedir {
      text-align: center;
      .textAbout {
        @include normalText;

        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 2rem;
        line-height: 28.8px;
      }
    }
    .cartaWrapper {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 5%;
      .cartaPreview {
        width: 25%;
      }
    }
    .bloqueInfo {
      @include bloqueInfo;
      .about {
        width: 60%;
        img {
          border-radius: 6px;
        }
      }
      &.sectionCards {
        .cardContainer {
          width: 60%;
        }
      }
      &.sectionRecomendaciones {
        .container {
          width: 80%;
        }
      }
      &.sectionNovedades {
        .container {
          width: 60%;
        }
      }
    }
  }
}

.titleWrapper {
  @include titleWrapper;
}
.title {
  @include title;

  font-size: 48px;
  color: $rosado-oscuro !important;
}
.normalText {
  @include normalText;
}
.italicText {
  @include italicText;
}
.primary {
  @include main-button;

  margin: 5% 0;
  background-color: $verde-original;
}
</style>
