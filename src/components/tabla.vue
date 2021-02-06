<script>
export default {
  props: {
    bookings: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      selects: [],
      showTable: false,
      loading: false,
      selectedBooking: {},
      showDetailModal: false,
    }
  },
  created() {
    this.loading = true
    // console.log(this.bookings)
    if (this.bookings.length > 0) {
      this.showTable = true
      this.loading = false
      this.bookings.map((booking) => {
        this.selects.push(false)
      })
    }
  },
  methods: {
    selectBooking(_id, index) {
      this.$emit('select-booking', _id)
    },
    showModal(booking) {
      this.selectedBooking = booking
      this.showDetailModal = true
    },
    closeModal() {
      this.showDetailModal = false
    },
  },
}
</script>

<template>
  <div class="table">
    <table class="table-primary">
      <thead>
        <tr>
          <th>check</th>
          <th class="title">Código</th>
          <th class="title">Correo electrónico</th>
          <th class="title">Estado</th>
          <th class="title">Detalles</th>
        </tr>
      </thead>
      <tbody v-if="showTable && bookings !== null">
        <!-- repetir -->
        <tr v-for="(booking, index) in bookings" :key="booking._id">
          <td>
            <md-checkbox
              v-model="selects[index]"
              class="md-primary"
              @change="selectBooking(booking._id, index)"
            >
            </md-checkbox>
          </td>
          <td :class="booking.status === 'Pendiente' ? 'gray' : 'green'">{{
            booking.shortID
          }}</td>
          <td>{{ booking.user_email }} </td>
          <td
            class="status"
            :style="
              booking.status === 'Pendiente'
                ? 'color:  #ccc;'
                : 'color:  $verde-original;'
            "
            >{{ booking.status }}</td
          >
          <td>
            <font-awesome-icon
              class="icon"
              :icon="['fas', 'file-alt']"
              @click="showModal(booking)"
            />
          </td>
        </tr>
        <!-- fin -->
      </tbody>
    </table>
    <md-dialog
      :md-active="showDetailModal"
      :md-fullscreen="false"
      class="cancel-modal"
    >
      <md-dialog-title>
        <h1 class="modal-title">Detalles de la reserva</h1>
        <p></p>
      </md-dialog-title>
      <div class="cc-body">
        <div class="row">
          <label class="infoLabel">Taller</label>
          <label class="infoData">{{ selectedBooking.workshop_name }}</label>
        </div>
        <div class="row">
          <label class="infoLabel">Profesor</label>
          <label class="infoData">{{ selectedBooking.teacher_name }}</label>
        </div>
        <div class="row">
          <label class="infoLabel">Fechas</label>
          <div class="datesBlock">
            <label
              v-for="date in selectedBooking.dates"
              :key="date.hour"
              class="infoData"
              >{{ date.date }} - {{ date.hour }}</label
            >
          </div>
        </div>
        <div class="row">
          <label class="infoLabel">Precio</label>
          <label class="infoData">CLP ${{ selectedBooking.cost }}</label>
        </div>
        <div class="row">
          <label class="infoLabel">ID</label>
          <label class="infoData">{{ selectedBooking.shortID }}</label>
        </div>
        <div class="row">
          <label class="infoLabel">Nombre del cliente</label>
          <label class="infoData">{{ selectedBooking.user_name }}</label>
        </div>
        <div class="row">
          <label class="infoLabel">Correo del cliente</label>
          <label class="infoData">{{ selectedBooking.user_email }}</label>
        </div>
        <div class="row">
          <label class="infoLabel">Teléfono del cliente</label>
          <label class="infoData">{{ selectedBooking.user_phone }}</label>
        </div>
      </div>
      <md-dialog-actions>
        <md-button class="primary" @click="closeModal">OK</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<style lang="scss">
@import '@design';

.table {
  width: 100%;
  .table-primary {
    width: 100%;
    margin-top: 5%;
    text-align: center;
    thead {
      &:first-child {
        color: #f2f5f9;
      }
      th {
        margin: 2px 0 5px 0;
      }
    }
    tbody {
      background-color: white;
      border: 2px solid #f2f5f9;
      @include normalText;

      tr {
        background-color: #f2f5f9;
        td {
          &:first-child {
            display: block;
            width: auto;
            background-color: #f2f5f9;
          }
          &:nth-child(2) {
            border-left: 5px solid #ccc;
          }
          &.gray {
            border-left: 5px solid #ccc;
          }
          &.green {
            border-left: 5px solid $verde-original;
          }
          &.status {
            font-family: 'Chilena-Bold';
            font-size: 20px;
            font-style: normal;
            font-weight: bold;
          }

          background-color: white;
          .md-checkbox {
            margin: 0;
            margin-top: 11px;
            background-color: white;
            border-radius: 4px;
            box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25);
            .md-checkbox-container {
              width: 30px;
              height: 30px;
              margin: 0;
              border-color: transparent;
            }
          }
        }
      }
      .md-checkbox .md-checkbox-container::after,
      .md-checkbox .md-checkbox-container::before {
        padding-top: 20px;
        padding-left: 5px;
        margin-left: 5px;
      }
    }
  }
  .icon {
    width: 30px;
    height: 25px;
    color: $azul-claro !important;
  }
  .title {
    @include title;

    font-size: 20px;
    color: $azul-original;
  }
}
.md-dialog-title {
  background-color: white;
}
.modal-title {
  @include title;

  width: 70%;
  margin: auto;
  margin-top: 5%;
  margin-bottom: 0%;
  font-size: 36px;
}

.md-dialog-container {
  width: 550px;
  height: 600px;
  padding-bottom: 20px;
  overflow-y: scroll;
}
.md-dialog-actions {
  display: flex;
  justify-content: space-around;
  width: 60%;
  margin: auto;
}
.md-dialog-actions .md-button + .md-button {
  margin-top: 6%;
  margin-bottom: 10%;
  margin-left: 0;
}
.cc-body {
  width: 100%;
}
.infoLabel {
  display: inline-flex;
  width: 35%;
  padding-bottom: 5%;
  padding-left: 15%;
  font-family: 'Averta';
  font-size: 18px;
  font-style: italic;
  font-weight: 800;
  color: $azul-oscuro;
  text-align: left;
}
.infoData {
  display: inline-flex;
  padding-right: 5%;
  padding-bottom: 5%;
  font-family: 'Chilena-regular';
  font-size: 20px;
  font-weight: 400;
  color: $azul-original;
  text-align: left;
}
.datesBlock {
  display: inline-flex;
  flex-wrap: wrap;
  width: 65%;
  margin-bottom: 5%;
}

.primary {
  @include button-big;
  @include main-button;

  color: white !important;
}
</style>
