<script>
import moment from 'moment'
export default {
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
      pickedHour: null,
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
      hoursAvailable: [],
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
        // block days without hours
        let dateWithFormat = ''
        if (split[0] < 10) {
          dateWithFormat = [split[1], `0${split[0]}`, split[2]].join('/')
          if (split[1] < 10) {
            dateWithFormat = [`0${split[1]}`, `0${split[0]}`, split[2]].join(
              '/'
            )
          }
        } else {
          dateWithFormat = [split[1], split[0], split[2]].join('/')
        }
        const posibleHour = this.hours.filter((hour) => {
          if (hour.date === dateWithFormat) {
            return hour
          }
        })
        // console.log(dateWithFormat)
        if (posibleHour.length === 0) {
          return true
        }
        // debugger
        // block past days but not to the next month
        if (split[0] > splitToday[0]) {
        } else {
          if (splitToday[1] >= split[1]) {
            return true
          }
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
    this.cardStatus = 'empty'
    this.disabledDates()
  },
  methods: {
    disabledDates() {
      const allDays = this.$material.locale.days
      // const disabledArray = []
      if (this.workshop !== null) {
        const workshopDays = this.workshop.days.map((day) => {
          return day
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
    pickDate() {},
    showHourCard() {
      if (this.pickedDate !== null) {
        const formatDate = moment(this.pickedDate, 'dd/MM/yyyy').format('L')
        const split = formatDate.split('/')
        const dateWithFormat = [split[1], split[0], split[2]].join('/')
        const posibleHour = this.hours.filter((hour) => {
          if (hour.date === dateWithFormat) {
            return hour
          }
        })
        this.hoursAvailable = posibleHour
        if (this.hoursAvailable.length > 0) {
          this.showHourPicker = true
        }
      }
    },
    pickHour(hour) {
      this.pickedHour = hour
    },
    closeModal() {
      if (this.pickedHour !== null) {
        this.showHourPicker = false
        this.cardStatus = 'filled'
        this.retrieveBooking()
      }
    },
    closeModalCancel() {
      this.showHourPicker = false
    },
    resetCard() {
      confirm('Estas seguro que quieres eliminar esta reserva?')
      this.$emit('save-booking', this.pickedHour)
      this.pickedDate = null
      this.pickedHour = null
      this.cardStatus = 'empty'
    },
    retrieveBooking() {
      this.$emit('save-booking', this.pickedHour)
    },
  },
}
</script>

<template>
  <div v-if="workshop !== null">
    <div :class="cardStatus === 'empty' ? 'bookingCard' : 'bookingCardFilled'">
      <div class="close-btn-row">
        <button
          :class="cardStatus === 'empty' ? 'hide crossBtn' : 'show crossBtn'"
          @click="resetCard"
          >X</button
        >
      </div>
      <md-datepicker
        v-model="pickedDate"
        :md-disabled-dates="disabledDates2"
        :md-closed="pickDate()"
      >
        <label
          v-if="pickedDate === null"
          :class="pickedDate === null ? 'label' : ''"
          >Elige la fecha</label
        >
      </md-datepicker>
      <div class="clockRow">
        <font-awesome-icon class="clock" :icon="['far', 'clock']" />
        <button
          :class="pickedHour === null ? 'hourBtn label' : 'hourBtn'"
          @click="showHourCard"
        >
          <span v-if="pickedHour === null">Elige la hora</span>
          <span v-else>{{ pickedHour.hour }}</span>
        </button>
      </div>
    </div>
    <md-dialog
      :md-active="showHourPicker === true"
      :md-fullscreen="false"
      class="hourCard"
    >
      <md-dialog-title>
        <span v-if="pickedHour === null"></span>
        <span v-else>{{ pickedHour.hour }}</span>
      </md-dialog-title>
      <div class="hourCardBody">
        <div
          v-for="hour in hoursAvailable"
          :key="hour.hour"
          :class="
            pickedHour !== null && pickedHour.hour === hour.hour
              ? 'hour active'
              : 'hour'
          "
          @click="pickHour(hour)"
        >
          <p>{{ hour.hour }}</p>
        </div>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary label" @click="closeModalCancel"
          >Cancelar</md-button
        >
        <md-button class="md-primary label" @click="closeModal"
          >Confirmar</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';
.bookingCard {
  padding: 3%;
  padding-bottom: 8%;
  margin-bottom: 15px;
  font-weight: 800;
  color: $azul-original;
  background-color: white;
  border: 1px solid $azul-claro;
  border-radius: 10px;
  .md-field.md-clearable .md-input {
    font-family: 'Averta';
    font-size: 18px;
    font-weight: 800;
    color: $azul-claro;
    border-bottom: 2px solid $azul-original;
    -webkit-text-fill-color: $azul-original !important;
  }
  .md-icon.md-theme-default.md-icon-image svg {
    fill: $azul-claro;
  }
  .label {
    top: 20px;
    font-family: 'Chilena-Regular' !important;
    font-weight: 400 !important;
    color: $gris !important;
  }
  label {
    font-family: 'Averta';
    font-size: 18px;
    font-weight: 800;
    color: $azul-original !important;
  }
  .hourBtn {
    font-family: 'Averta';
    font-size: 18px;
    font-weight: 800;
    color: $azul-original;
  }
}
.md-field.md-theme-default::after {
  display: none !important;
}
.md-field.md-theme-default > .md-icon::after {
  display: none !important;
}
.bookingCardFilled {
  padding: 3%;
  padding-bottom: 8%;
  margin-bottom: 15px;
  color: white;
  background-color: $verde-original;
  border: none;
  border-radius: 10px;
  .md-field {
    padding-top: 0;
    margin-bottom: 0;
  }
  .md-field.md-theme-default label {
    font-family: 'Averta';
    font-size: 18px;
    font-weight: 800;
    color: white !important;
  }
  .md-field.md-clearable .md-input {
    font-family: 'Averta';
    font-size: 18px;
    font-weight: 800;
    color: white !important;
    border-bottom: 2px solid white;
    -webkit-text-fill-color: white;
  }
  .md-icon.md-theme-default.md-icon-image svg {
    fill: white;
  }
  .hourBtn {
    font-family: 'Averta';
    font-size: 18px;
    font-weight: 800;
    color: white;
    border-bottom: 2px solid white;
  }
}
.clock {
  margin-right: 10px;
  font-size: large;
}
.clockRow {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.hourBtn {
  width: 90%;
  height: 30px;
  text-align: left;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid $azul-original;
}
.show {
  display: inline-flex;
}
.hide {
  display: none;
}
.crossBtn {
  font-family: cursive;
  font-size: larger;
  font-weight: 800;
  color: white;
  background-color: transparent;
  border: none;
}
.close-btn-row {
  position: relative;
  top: -2px;
  display: flex;
  justify-content: flex-end;
  // height: 0;
}
.md-dialog {
  max-width: 768px;
}
.md-dialog-container {
  position: relative;
  top: -45px;
  width: 90%;
  max-width: 768px;
  // min-height: 30%;
}
.md-dialog-title {
  height: 70px;
  margin-bottom: 10px;
  font-family: 'Averta';
  font-size: xx-large;
  font-weight: 800;
  color: white;
  text-align: center;
  background-color: $azul-claro;
}
.hourCard {
  .md-dialog-actions {
    padding-right: 8%;
    .md-button {
      font-family: 'Chilena-Regular';
      font-size: 16px;
      font-weight: 700;
      color: $azul-claro;
      text-transform: none;
    }
  }
}
.hourCardBody {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-right: 5%;
  margin-left: 5%;
}
.hour {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 50px;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 3px;
  font-size: large;
  font-weight: 400;
  color: white;
  text-align: center;
  background-color: $rosado-claro;
  border-radius: 5px;
}
.active {
  background-color: $rosado-original !important;
}
.md-clear {
  display: none;
}
@media (min-width: 990px) {
  .md-dialog {
    left: 35%;
    max-width: 30%;
  }
}
</style>
