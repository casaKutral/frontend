<script>
import MobileNavbar from '@/src/components/mobile_navbar.vue'
import UserFormModal from '@/src/components/bookings_elements/userFormModal.vue'
import CalendarCard from '@src/components/bookings_elements/calendarCard.vue'

export default {
  components: { UserFormModal, CalendarCard, MobileNavbar },
  props: {
    workshop: {
      type: Object,
      default: null,
    },
    teacher: {
      type: Object,
      default: null,
    },
    hours: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      cardHidden: false,
      calendarCards: [
        {
          index: 0,
        },
      ],
      bookings: [],
      updatedHours: [],
      totalValue: 0,
    }
  },
  created: function() {
    this.hours.map((hour) => {
      this.updatedHours.push(hour)
    })
  },
  methods: {
    backToHome(bookingData) {
      this.bookingData = bookingData
      // console.log('navigate home')
      this.$router.push({ path: '/' })
      // router navigate /home
    },
    showCard(show) {
      if (this.bookings.length > 0) {
        this.cardHidden = show
      }
    },
    addCard() {
      if (this.calendarCards.length >= 1 && this.bookings.length !== 0) {
        this.calendarCards.push({ index: this.calendarCards.length })
      }
    },
    retrieveCardInfo(booking) {
      if (this.bookings.length === 0) {
        this.bookings.push(booking)
        this.updateHoursLocal(booking, 'remove')
        this.updateTotalValue('add')
      } else {
        const find = this.bookings.find((element) => {
          if (element._id === booking._id) {
            return element
          }
        })
        const index = this.bookings.indexOf(find)
        if (index === -1) {
          this.bookings.push(booking)
          this.updateHoursLocal(booking, 'remove')
          this.updateTotalValue('add')
        } else {
          this.bookings.splice(index, 1)
          this.updateHoursLocal(booking, 'add')
          this.updateTotalValue('remove')
          if (this.calendarCards.length > 1) {
            this.calendarCards.splice(index, 1)
          }
        }
      }
    },
    updateHoursLocal(booking, action) {
      const findHour = this.hours.find((hour) => {
        if (hour._id === booking._id) {
          return hour
        }
      })
      const hourIndex = this.updatedHours.indexOf(findHour)
      if (action === 'remove') {
        this.updatedHours.splice(hourIndex, 1)
      } else if (action === 'add') {
        this.updatedHours.push(findHour)
      }
    },
    updateTotalValue(action) {
      if (action === 'add') {
        this.totalValue = this.totalValue + this.workshop.cost
      } else if (action === 'remove') {
        this.totalValue = this.totalValue - this.workshop.cost
      }
    },
  },
}
</script>

<template>
  <div>
    <MobileNavbar :show-back-button="true" @back="$emit('back')" />
    <div v-if="workshop !== null" id="workshopBooking">
      <div
        id="banner"
        class="detailImg"
        :style="{
          backgroundImage: `url(${workshop.pictureBanner})`,
        }"
      >
      </div>
      <div class="infoContainer">
        <p class="md-title pink">{{ workshop.name }}</p>
        <p class="md-subheading sm pink bBottom">{{ workshop.type }}</p>
        <div class="cardsWrapper">
          <p class="w-name">Reservas</p>
          <CalendarCard
            v-for="card of calendarCards"
            :key="card.index"
            :workshop="workshop"
            :hours="updatedHours"
            @save-booking="retrieveCardInfo"
          />
          <div class="buttonRow">
            <button ref="addCard" class="second" @click="addCard">
              <font-awesome-icon class="circle" :icon="['fa', 'plus-circle']" />
              Agregar otra hora
            </button>
          </div>
          <div class="buttonRow">
            <button class="primary" @click="showCard(true)">
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
    <UserFormModal
      v-if="bookings.length > 0"
      :card-hidden="cardHidden"
      :value="bookings"
      :workshop-name="workshop.name"
      :teacher-name="teacher.name"
      :total-value="totalValue"
      :workshop-id="workshop._id"
      @close-modal="showCard(false)"
    />
    <!-- <button @click="backToHome('endbooking')">volver al home</button> -->
  </div>
</template>

<style lang="scss" scoped>
@import '@design';

#workshopBooking {
  .sm {
    font-size: 16px !important;
  }
  .w-name {
    @include title;

    margin-bottom: 15px;
  }

  .pink {
    @include title;

    color: $rosado-oscuro !important;
  }
  .bBottom {
    padding-bottom: 2%;
    border-bottom: 1px solid $rosado-oscuro;
  }
  .cardsWrapper {
    max-height: 80vh;
    padding-bottom: 20%;
    margin-top: 10%;
    overflow-y: scroll;
  }
  .second {
    @include secondary-button;

    margin-top: 5%;
    margin-bottom: 5%;
  }
  .circle {
    margin-right: 8px;
    font-size: x-large;
  }
  @media (max-width: 700px) {
    #banner {
      display: none;
    }
  }

  @media (min-width: 990px) {
    .infoContainer {
      width: 30%;
      height: fit-content;
      min-height: 70vh;
      padding-bottom: 0;
      margin: auto;
      overflow-y: hidden;
    }
    #banner {
      display: block;
    }
    .detailImg {
      width: 100%;
      height: 250px;
      margin-bottom: 3%;
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: cover;
    }
    .cardsWrapper {
      height: auto;
      max-height: fit-content;
      margin-top: 0;
      overflow-y: hidden;
    }
    .md-title {
      margin-bottom: 5px;
    }
    .w-name {
      margin-bottom: 30px;
    }
    .primary {
      @include button-big;
    }
    .second {
      font-size: 22px;
    }
  }
}
</style>
