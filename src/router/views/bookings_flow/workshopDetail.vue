<script>
import store from '@state/store'
import MobileNavbar from '@/src/components/mobile_navbar.vue'
import WorkshopBooking from './workshopBooking.vue'

export default {
  components: { WorkshopBooking, MobileNavbar },
  props: {
    workshop: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showDetail: {
        type: Boolean,
        default: true,
      },
      showTeachersInfo: {
        type: Boolean,
        default: false,
      },
      showDatePicker: {
        type: Boolean,
        default: false,
      },
      showHourPicker: {
        type: Boolean,
        default: false,
      },
      teacherData: {
        type: Object,
        default: null,
      },
      allHours: [],
      workshopsHours: [],
    }
  },
  created: function() {
    if (this.workshop._id) {
      this.searchTeacher()
      this.fetchFirst()
    }
  },
  methods: {
    searchTeacher() {
      const allTeachers = store.state.workshops.teachers
      this.teacherData = allTeachers.find((teacher) => {
        if (teacher._id === this.workshop.teacher_id) {
          return teacher
        }
      })
      if (this.teacherData) {
        this.loading = false
        this.showTeachersInfo = true
      }
    },
    activeConfirm() {
      this.showDetail = false
    },
    backFromConfirm() {
      if (this.$route.query.workshopId) {
        this.$router.push('/')
      } else {
        this.showDetail = true
      }
    },
    fetchFirst: function() {
      store.dispatch('workshops/fetchHours').then((data) => {
        this.allHours = data
        this.filterDates()
      })
    },
    filterDates() {
      this.workshopsHours = this.allHours.filter((hour) => {
        if (
          hour.workshop_id === this.workshop._id &&
          hour.booked?.available > 0
        ) {
          return hour
        }
      })
    },
  },
}
</script>

<template>
  <div>
    <div v-if="showDetail && workshop !== null" id="workshopDetail">
      <MobileNavbar :show-back-button="true" @back="$emit('back')" />
      <!-- img del taller -->
      <div
        v-if="showTeachersInfo"
        id="bannerMobile"
        class="detailImg"
        :style="{
          backgroundImage: `url(${workshop.pictureBanner})`,
        }"
      >
      </div>
      <div
        v-if="showTeachersInfo"
        id="bannerDesktop"
        class="detailImg"
        :style="{
          backgroundImage: `url(${workshop.pictureBannerDesktop})`,
        }"
      >
      </div>
      <!-- info del taller -->
      <div id="infoMobile" class="infoContainer">
        <div class="workshopTitle">
          <p class="md-title w-name">{{ workshop.name }}</p>
          <div class="md-subheading w-type">
            <span class="type">{{ workshop.type }}</span>
            <p class="md-subheading w-cost "
              >CLP <span class="costBold">${{ workshop.cost }}</span></p
            >
          </div>
        </div>
        <div class="buttonRow">
          <button class="primary" @click="activeConfirm">
            Reservar
          </button>
        </div>
        <p class="md-body-1 regularTxt">{{ workshop.description }}</p>
        <!-- info del profe -->
        <div
          v-if="showTeachersInfo === true"
          class="workshopTitle teacherWrapper"
        >
          <img
            v-if="showTeachersInfo === true"
            :src="teacherData.profile_picture"
            alt="imagen noticia"
            class="teacherProfile"
          />
          <div v-if="showTeachersInfo === true" style="display: inline-grid;">
            <p class="md-title teacherName">{{ teacherData.name }}</p>
            <p class="md-subheading teacherSub">{{ teacherData.subtitle }}</p>
          </div>
        </div>
        <div v-if="showTeachersInfo === true" class="teacherBio">
          <p class="md-body-1 regularTxt">{{ teacherData.biography }}</p>
        </div>
      </div>
      <div id="infoDesktop">
        <div class="col-6 workshopInfo">
          <div class="workshopTitle">
            <p class="md-title w-name">{{ workshop.name }}</p>
            <div class="md-subheading w-type">
              <span class="type">{{ workshop.type }}</span>
            </div>
          </div>
          <p class="md-body-1 regularTxt">{{ workshop.description }}</p>
        </div>
        <div class="col-6">
          <div
            v-if="showTeachersInfo === true"
            class="workshopTitle teacherWrapper"
          >
            <img
              v-if="showTeachersInfo === true"
              :src="teacherData.profile_picture"
              alt="imagen noticia"
              class="teacherProfile"
            />
            <div v-if="showTeachersInfo === true" style="display: inline-grid;">
              <p class="md-title teacherName">{{ teacherData.name }}</p>
              <p class="md-subheading teacherSub">{{ teacherData.subtitle }}</p>
            </div>
          </div>
          <div v-if="showTeachersInfo === true" class="teacherBio">
            <p class="md-body-1 regularTxt">{{ teacherData.biography }}</p>
          </div>
        </div>
        <div class="buttonRow">
          <button class="primary" @click="activeConfirm">
            Reservar
          </button>
        </div>
      </div>
    </div>
    <div v-else-if="!showDetail">
      <WorkshopBooking
        :workshop="workshop"
        :hours="workshopsHours"
        :teacher="teacherData"
        @back="backFromConfirm"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

#workshopDetail {
  @media (max-width: 700px) {
    .title {
      @include title;
    }
    #infoMobile {
      display: block;
    }
    #infoDesktop {
      display: none;
    }
    #bannerMobile {
      display: block;
    }
    #bannerDesktop {
      display: none;
    }
  }

  @media (min-width: 990px) {
    .title {
      margin-top: 55px !important;
      font-family: 'Averta';
      font-size: 48px !important;
    }
    .infoContainer {
      display: flex;
      padding-bottom: 0;
      overflow-y: hidden;
    }
    .detailImg {
      height: 250px;
    }
    #infoMobile {
      display: none;
    }
    #infoDesktop {
      display: block;
      width: 100%;
      .col-6 {
        display: inline-block;
        width: 50%;
        padding-right: 5%;
        padding-left: 5%;
      }
      .teacherWrapper {
        margin-top: 0;
      }
      .teacherProfile {
        width: 11%;
      }
      .teacherName {
        font-size: 28px;
      }
      .teacherSub {
        font-size: 20px;
      }
      .workshopInfo {
        .workshopTitle {
          position: relative;
          top: -40px;
        }
        .w-name {
          font-size: 36px !important;
        }
        .type {
          font-size: 24px;
        }
      }
      .regularTxt {
        margin-top: 20px;
        font-size: 22px;
      }
    }
    .primary {
      @include button-big;
    }
    #bannerMobile {
      display: none;
    }
    #bannerDesktop {
      display: block;
      background-position: center;
    }
  }
}
.infoContainer {
  z-index: 0;
  height: 70vh;
  padding-bottom: 30vh;
  margin-right: 5%;
  margin-left: 5%;
  overflow-y: scroll;
}
.workshopTitle {
  @include title;

  display: block;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2%;
  color: $rosado-oscuro;
  .w-name {
    margin-bottom: 1%;
    font-size: 24px !important;
  }
  .md-subheading {
    display: flex;
  }
  .type {
    margin-right: 3%;
    font-family: 'Averta';
    font-size: 16px;
    font-style: italic;
    font-weight: 800;
    color: $rosado-oscuro;
  }
  .w-cost {
    margin-top: 0;
    font-family: 'Chilena-bold';
    font-style: normal;
    font-weight: 700;
    color: $verde-original;
  }
}
.detailImg {
  width: 100%;
  height: 150px;
  margin-bottom: 3%;
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
}
.teacherWrapper {
  align-items: center;
  justify-content: flex-start;
  margin-top: 10%;
}
.teacherProfile {
  width: 25%;
  margin-right: 5%;
  border: 5px solid $rosado-original;
  border-radius: 50px;
}
.teacherBio {
  margin-top: 5%;
}
.teacherName {
  @include title;

  margin-bottom: 0;
  color: $rosado-original;
}
.teacherSub {
  @include normalText;

  margin-top: 5px;
  font-weight: bold;
  color: $rosado-original;
}

.regularTxt {
  @include normalText;
}
.buttonRow {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 5%;
  margin-bottom: 5%;
}
.primary {
  @include main-button;
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
