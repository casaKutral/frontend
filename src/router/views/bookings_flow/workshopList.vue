<script>
import MobileNavbar from '@/src/components/mobile_navbar.vue'
import store from '@state/store'
import WorkshopDetail from './workshopDetail.vue'

export default {
  components: { WorkshopDetail, MobileNavbar },
  props: {
    workshopsList: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showList: {
        type: Boolean,
        default: true,
      },
      selectedWorkshop: {
        type: Object,
        default: null,
      },
      loading: false,
    }
  },
  created: function() {
    if (this.$route.query.workshopId) {
      this.loading = true
      store
        .dispatch('workshops/fetchWorkshops', this.$route.query.workshopId)
        .then((workshop) => {
          this.selectedWorkshop = workshop
          this.loading = false
          this.showList = false
        })
    }
  },
  methods: {
    activeDetail(workshop) {
      this.showList = false
      this.selectedWorkshop = workshop
    },
    backFromDetail() {
      if (this.$route.query.workshopId) {
        this.$router.push('/')
      } else {
        this.showList = true
      }
    },
  },
}
</script>

<template>
  <div>
    <md-progress-spinner
      v-if="loading"
      :md-diameter="50"
      :md-stroke="10"
      md-mode="indeterminate"
    ></md-progress-spinner>
    <div
      v-if="showList && workshopsList !== null && !loading"
      id="workshopList"
    >
      <MobileNavbar :show-back-button="true" @back="$emit('back')" />
      <div class="header">
        <div class="titleWrapperList">
          <h1 class="title">{{ workshopsList.plural }}</h1>
        </div>
      </div>

      <div
        v-for="workshop in workshopsList.workshops"
        :key="workshop.id"
        class="workshopRow"
        @click="activeDetail(workshop)"
      >
        <div class="workshopImgCol">
          <img class="workshopImg" :src="workshop.pictureMobile" />
        </div>
        <div class="workshopInfoWrapper">
          <p class="md-subheading w-cost">${{ workshop.cost }}</p>
          <p class="md-title w-name">{{ workshop.name }}</p>
        </div>
      </div>
    </div>
    <div v-else-if="!loading">
      <WorkshopDetail :workshop="selectedWorkshop" @back="backFromDetail" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';
#workshopList {
  .title {
    @include title;
  }
  .backButton {
    width: 100%;
  }
  .backButton .svg-inline--fa {
    font-size: 2em;
    color: gray;
  }

  p {
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  .header {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .backButtonWrapper {
    display: inline-flex;
    align-self: center;
    width: 10%;
    margin-left: 10%;
  }

  .titleWrapperList {
    @include titleWrapper;
  }

  .workshopRow {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 6%;
  }
  .workshopImgCol {
    display: flex;
    flex-direction: column;
    width: 48%;
  }
  .workshopImg {
    @include card-shadow;

    width: 85%;
    border-radius: 6px;
  }
  .w-name {
    @include title;

    font-size: 22px !important;
    color: $rosado-oscuro !important;
  }
  .w-cost {
    @include prices;

    // margin-bottom: 5%;
  }

  .workshopInfoWrapper {
    display: flex;
    flex-direction: column;
    width: 40%;
  }
  .mediaCover {
    @include mediaCover;

    background-image: url(../../../assets/images/category_example.png);
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
    .workshopRow {
      width: 50%;
      margin-top: 3%;
    }
    .workshopImgCol {
      width: 30%;
    }
    .workshopImg {
      width: 80%;
      height: 130px;
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
  #workshopList {
    min-height: 70vh;
  }
  #footer {
    display: block;
  }
}
</style>
