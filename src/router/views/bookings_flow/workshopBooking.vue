<script>
import UserFormModal from '@/src/components/bookings_elements/userFormModal.vue'
import CalendarCard from '@src/components/bookings_elements/calendarCard.vue'

export default {
  components: { UserFormModal, CalendarCard },
  props: {
    workshop: {
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
    }
  },
  created: function() {},
  methods: {
    backToHome(bookingData) {
      this.bookingData = bookingData
      // console.log('navigate home')
      this.$router.push({ path: '/' })
      // router navigate /home
    },
    showCard(show) {
      this.cardHidden = show
    },
    saveBooking(booking) {
      // console.log(booking)
    },
  },
}
</script>

<template>
  <div>
    <a @click="$emit('back')">back</a>
    <div v-if="workshop !== null">
      <div class="infoContainer">
        <p class="md-subheading sm pink">{{ workshop.type }}</p>
        <p class="md-title pink bBottom">{{ workshop.name }}</p>
        <div class="cardsWrapper">
          <p class="w-name">Reservas</p>
          <CalendarCard
            :workshop="workshop"
            :hours="hours"
            @save-booking="saveBooking(booking)"
          />
        </div>
      </div>
    </div>
    <div class="buttonRow">
      <button class="primary" @click="showCard(true)">
        Reservar
      </button>
    </div>
    <UserFormModal :card-hidden="cardHidden" @close-modal="showCard(false)" />
    <!-- <button @click="backToHome('endbooking')">volver al home</button> -->
  </div>
</template>

<style lang="scss">
@import '@design';

.sm {
  font-size: 16px !important;
}

.pink {
  @include title;

  color: $rosado-original !important;
}
.bBottom {
  padding-bottom: 2%;
  border-bottom: 1px solid $rosado-oscuro;
}
.cardsWrapper {
  margin-top: 10%;
}
</style>
