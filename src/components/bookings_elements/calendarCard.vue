<script>
import moment from 'moment'
// import HourCard from '@src/components/bookings_elements/hourCard.vue'

export default {
  // components: { HourCard },
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
      cardStatus: {
        type: String,
        default: 'empty',
      },
      showHourPicker: {
        type: Boolean,
        default: false,
      },
      showAddButton: {
        type: Boolean,
        default: false,
      },
      pickedDate: null,
      pickedHour: {
        type: String,
        default: '',
      },
      booking: {
        type: Object,
        default: null,
      },
      disabled: {
        type: Array,
        default() {
          return []
        },
      },
      hoursAvailable: {
        type: Array,
        default: null,
      },
      disabledDates2: (date) => {
        const momentDate = moment(date).format('L')
        // block next month
        const split = momentDate.split('/').map((el) => {
          return Number(el)
        })
        if (split[0] === 3) {
          return true
        }
        // block past days
        const todayDate = moment().format('L')
        const splitToday = todayDate.split('/').map((el) => {
          return Number(el)
        })
        if (splitToday[1] >= split[1]) {
          return true
        }
        // block days without hours
        let dateWithFormat = ''
        if (split[0] < 10) {
          dateWithFormat = [split[1], `0${split[0]}`, split[2]].join('/')
        } else {
          dateWithFormat = [split[1], split[0], split[2]].join('/')
        }
        const posibleHour = this.hours.filter((hour) => {
          if (hour.date === dateWithFormat) {
            return hour
          }
        })
        // console.log(dateWithFormat, this.hours)
        if (posibleHour.length === 0) {
          return true
        }
        // block disables days
        const day = date.getDay()
        const index = this.disabled.indexOf(day)
        if (index >= 0) {
          return true
        } else {
          return false
        }
      },
    }
  },
  created: function() {
    this.disabledDates()
  },
  methods: {
    disabledDates() {
      const allDays = this.$material.locale.days
      // const disabledArray = []
      if (this.workshop !== null) {
        const workshopDays = this.workshop.capacity.map((day) => {
          return day.date
        })
        const disabledDays = allDays.filter((day) => {
          const index = workshopDays.indexOf(day)
          if (index === -1) {
            return day
          }
        })
        const indexDays = disabledDays.map((day) => {
          const index = allDays.indexOf(day)
          return index
        })
        this.disabled = indexDays
        return indexDays
      }
    },
    pickDate(date) {
      debugger
      console.log('ej 1')
      // if (date) {
      //   this.pickedDate = moment(date).format('L')
      // const posibleHour = this.hours.filter((hour) => {
      //   if (hour.date === this.pickedDate) {
      //     return hour
      //   }
      // })
      // this.showHourPicker = true
      // this.hoursAvailable = posibleHour
      // }
    },
    retrieveBooking() {
      this.booking = {
        date: this.pickedDate,
        hour: this.pickedHour,
      }
      this.$emit.saveBooking(this.booking)
    },
  },
  watchers: {
    pickedDate() {
      console.log(this.pickedDate)
    },
  },
}
</script>

<template>
  <div v-if="workshop !== null">
    <div :class="cardStatus === 'empty' ? 'bookingCardFilled' : 'bookingCard'">
      <md-datepicker
        v-model="pickedDate"
        :md-disabled-dates="disabledDates2"
        :md-closed="pickDate(pickedDate)"
      />
    </div>
    <!-- :md-closed="pickDate(pickedDate)" -->
    <!--  -->
    <!-- <HourCard :card-hidden="showHourPicker" :elements="hoursAvailable" /> -->
  </div>
</template>

<style lang="scss">
@import '@design';
.bookingCard {
  color: $azul-oscuro;
  background-color: white;
  border: 1px solid $azul-original;
}
.bookingCardFilled {
  color: white;
  background-color: $verde-original;
  border: none;
}
</style>
