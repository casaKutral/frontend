<script>
import MobileNavbar from '@/src/components/mobile_navbar.vue'
import Footer from '@components/footer.vue'
import WorkshopList from './workshopList.vue'

export default {
  components: { WorkshopList, MobileNavbar, Footer },
  props: {
    workshopsCategorys: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      showCategory: {
        type: Boolean,
        default: true,
      },
      selectedCategory: {
        type: Array,
        default() {
          return []
        },
      },
      // categorysPictures: [

      // ],
    }
  },
  created: function() {
    if (this.$route.query.workshopId) {
      this.showCategory = false
    } else {
      this.showCategory = true
    }
  },
  methods: {
    activeList(list) {
      this.showCategory = false
      this.selectedCategory = list
    },
    backFromList() {
      if (this.$route.query.workshopId) {
        this.$router.push('/')
      } else {
        this.showCategory = true
      }
    },
    chargeImg(id) {
      switch (id) {
        case 0:
          return {
            'background-image':
              'url( https://backend.casakutral.vercel.app/images/yoga_ejemplo.jpg)',
          }
        case 1:
          return {
            'background-image':
              'url( https://backend.casakutral.vercel.app/images/masaje_ejemplo.jpg)',
          }
        // break;
        case 2:
          return {
            'background-image':
              'url( https://backend.casakutral.vercel.app/images/terapia_ejemplo.webp)',
          }
        // break;
        case 3:
          return {
            'background-image':
              'url( https://backend.casakutral.vercel.app/images/categoria_ejemplo.png)',
          }
      }
    },
  },
}
</script>

<template>
  <div>
    <div
      v-if="showCategory === true && workshopsCategorys.length > 0"
      id="categoryMobile"
    >
      <MobileNavbar
        :show-back-button="true"
        @back="$router.push({ path: '/' })"
      />
      <div class="titleWrapper">
        <h1 class="title">¿Qué te gustaría hacer?</h1>
      </div>
      <div class="cardContainer">
        <div
          v-for="category in workshopsCategorys"
          :key="category.id"
          class="cardClickWrapper"
          @click="category.workshops.length > 0 ? activeList(category) : null"
        >
          <md-card>
            <md-card-media-cover
              md-text-scrim
              class="mediaCover"
              :style="chargeImg(category.id)"
            >
              <md-card-area>
                <span
                  v-if="category.workshops.length > 0"
                  class="md-title category"
                >
                  {{ category.workshops[0].type }}
                </span>
                <span v-else class="md-title category">
                  Próximamente
                </span>
              </md-card-area>
            </md-card-media-cover>
          </md-card>
        </div>
      </div>
    </div>
    <div v-else>
      <WorkshopList :workshops-list="selectedCategory" @back="backFromList" />
    </div>
    <span id="footer">
      <Footer />
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

#categoryMobile {
  .cardContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-around;
    height: 75vh;
  }
  .titleWrapper {
    @include titleWrapper;
  }
  .title {
    @include title;
  }
  .cardClickWrapper {
    display: contents;
  }
  .md-card {
    display: inline-block;
    border-radius: 12px;
    @include card-shadow;
  }

  .category {
    @include title;

    color: white !important;
    text-shadow: 2px 2px 2px #000;
    text-transform: uppercase;
  }
  .mediaCover {
    @include mediaCover;

    // background-image: url(../../../assets/images/yoga_ejemplo.jpg);
  }
  .md-card-media {
    height: 100%;
    border-radius: 12px;
  }
  .md-card-media img {
    top: 25% !important;
  }
  .md-card-media-cover .md-card-area {
    align-content: center;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .md-card-media-cover.md-text-scrim .md-card-backdrop {
    top: 20%;
    height: 80%;
    background: rgba(255, 255, 255, 0);
    background: -moz-linear-gradient(
      top,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    background: -webkit-gradient(
      left top,
      left bottom,
      color-stop(0%, rgba(255, 255, 255, 0)),
      color-stop(100%, rgba(0, 0, 0, 0.6))
    );
    background: -webkit-linear-gradient(
      top,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    background: -o-linear-gradient(
      top,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    background: -ms-linear-gradient(
      top,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    border-radius: 12px;
  }
  @media (max-width: 700px) {
    .md-card {
      display: inline-block;
      width: 45% !important;
      height: 25%;
      margin-top: 10%;
    }
    .title {
      @include title;
    }
  }

  @media (min-width: 990px) {
    .cardContainer {
      height: 70vh;
    }
    .md-card {
      display: inline-block;
      width: 20% !important;
      height: 45%;
      margin-top: 4%;
    }
    .title {
      margin-top: 55px !important;
      font-family: 'Averta';
      font-size: 48px !important;
    }
  }
}
@media (max-width: 700px) {
  #footer {
    display: none !important;
  }
}

@media (min-width: 990px) {
  #footer {
    display: block;
  }
}
</style>
