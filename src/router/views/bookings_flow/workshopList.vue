<script>
import MobileNavbar from '@/src/components/mobile_navbar.vue'
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
    }
  },
  created: function() {},
  methods: {
    activeDetail(workshop) {
      this.showList = false
      this.selectedWorkshop = workshop
    },
    backFromDetail() {
      this.showList = true
    },
  },
}
</script>

<template>
  <div>
    <div v-if="showList && workshopsList !== null">
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
          <img class="workshopImg" :src="workshop.picture" />
        </div>
        <div class="workshopInfoWrapper">
          <p class="md-subheading w-cost">${{ workshop.cost }}</p>
          <p class="md-title w-name">{{ workshop.name }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <WorkshopDetail :workshop="selectedWorkshop" @back="backFromDetail" />
    </div>
  </div>
</template>

<style lang="scss">
@import '@design';
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

  width: 60% !important;
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
</style>
