<script>
import store from '@state/store'
import axios from 'axios'
import WorkshopBooking from './workshopBooking.vue'

export default {
  components: { WorkshopBooking },
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
      api: 'https://backend.casakutral.vercel.app/api/dates',
      allHours: [],
      workshopsHours: [],
    }
  },
  created: function() {
    if (this.workshop !== null) {
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
      this.showTeachersInfo = true
    },
    activeConfirm() {
      this.showDetail = false
    },
    backFromConfirm() {
      this.showDetail = true
    },
    fetchFirst: function() {
      axios
        .get(this.api)
        .then((response) => {
          this.allHours = response.data
          this.filterDates()
        })
        .catch((error) => {
          console.error(error)
        })
    },
    filterDates() {
      this.workshopsHours = this.allHours.filter((hour) => {
        if (hour.workshop_id === this.workshop._id) {
          return hour
        }
      })
    },
  },
}
</script>

<template>
  <div>
    <div v-if="showDetail && workshop !== null">
      <div class="header">
        <div class="backButtonWrapper">
          <a class="backButton" @click="$emit('back')">
            <font-awesome-icon :icon="['far', 'arrow-alt-circle-left']" />
          </a>
        </div>
        <div class="titleWrapperList">
          <h1>{{ workshop.name }}</h1>
        </div>
      </div>
      <!-- img del taller -->
      <div
        v-if="showTeachersInfo"
        class="detailImg"
        :style="{
          backgroundImage:
            'url(' + require('../../../assets/images/yoga_ejemplo.jpg') + ')',
        }"
      >
      </div>
      <!-- info del taller -->
      <div class="infoContainer">
        <p class="md-subheading w-type">{{ workshop.type }}</p>
        <div class="workshopTitle">
          <p class="md-title w-name">{{ workshop.name }}</p>
          <p class="md-subheading w-cost "
            >CLP <span class="costBold">${{ workshop.cost }}</span></p
          >
        </div>
        <p class="md-body-1 regularTxt">{{ workshop.description }}</p>
        <!-- info del profe -->
        <div
          v-if="showTeachersInfo === true"
          class="workshopTitle teacherWrapper"
        >
          <img
            src="../../../assets/images/teacher_example.jpg"
            alt="imagen noticia"
            class="teacherProfile"
          />
          <div>
            <p class="md-title teacherName">{{ teacherData.name }}</p>
            <p class="md-subheading teacherSub">{{ teacherData.subtitle }}</p>
          </div>
        </div>
        <div v-if="showTeachersInfo === true" class="teacherBio">
          <p class="md-body-1 regularTxt">{{ teacherData.biography }}</p>
        </div>
        <div class="buttonRow">
          <button class="primary" @click="activeConfirm">
            Reservar
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <WorkshopBooking
        :workshop="workshop"
        :hours="workshopsHours"
        @back="backFromConfirm"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import '@design';
.infoContainer {
  margin-right: 5%;
  margin-left: 5%;
}
.workshopTitle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2%;
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
.teacherName {
  @include title;

  color: $rosado-original;
}
.teacherSub {
  @include normalText;

  font-weight: bold;
  color: $rosado-original;
}

// .w-type {
//   @include title;

//   font-size: 16px !important;
//   color: $rosado-oscuro !important;
// }
// .costBold {
//   font-family: 'Chilena-ExtraBold';
// }
.regularTxt {
  @include normalText;
}
.buttonRow {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 5%;
}
.primary {
  @include main-button;
}
</style>
