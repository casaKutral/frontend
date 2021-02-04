<script>
import Layout from '@layouts/main.vue'
import FieldInput from '@/src/components/inputSearch.vue'
import Table from '@/src/components/tabla.vue'
import store from '@state/store'

export default {
  page() {
    return {
      title: this.user.name,
      meta: [
        {
          name: 'description',
          content: `The user profile for ${this.user.name}.`,
        },
      ],
    }
  },
  components: { Layout, FieldInput, Table },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    bookings: [],
    disabled: true,
    searchByCode: true,
    searchByMail: false,
    showTable: false,
    selectedBookings: [],
  }),
  created() {
    this.fetchBookings()
  },
  methods: {
    fetchBookings() {
      store.dispatch('bookings/fetchBookings').then((response) => {
        this.bookings = response
        this.showTable = true
        console.log(this.bookings)
      })
    },
    updateBookings(action) {
      if (!this.disabled) {
        this.showTable = false
        store
          .dispatch(`bookings/${action}`, this.selectedBookings)
          .then((response) => {
            setTimeout(() => {
              this.fetchBookings()
            }, 5000)
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    typeOfSearch(type) {
      if (type === 'mail') {
        this.searchByCode = false
        this.searchByMail = true
      } else {
        this.searchByCode = true
        this.searchByMail = false
      }
    },
    searchBooking(searchText) {
      this.bookings = this.bookings.filter((booking) => {
        if (this.searchByCode) {
          if (booking._id.includes(searchText)) {
            return booking
          }
        } else if (this.searchByMail) {
          if (booking.user_email.includes(searchText)) {
            return booking
          }
        }
      })
    },
    saveSelection(id) {
      if (id) {
        const index = this.selectedBookings.indexOf(id)
        if (index === -1) {
          this.selectedBookings.push(id)
        } else {
          this.selectedBookings.splice(index, 1)
        }
      }
      console.log(this.selectedBookings)
      if (this.selectedBookings.length > 0) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
  },
}
</script>

<template>
  <Layout>
    <div class="container">
      <div class="data">
        <div class="">
          <div class="row containerTabs">
            <button
              :class="
                searchByCode ? 'active btnTab title' : 'btnTab title disabled'
              "
              @click="typeOfSearch('code')"
              >Buscar por código</button
            >
            <button
              :class="
                searchByMail ? 'active btnTab title' : 'btnTab title disabled'
              "
              @click="typeOfSearch('mail')"
              >Buscar por correo</button
            >
          </div>
          <div class="row containerBtns">
            <FieldInput class="campo" @search="searchBooking" />
            <span class="btn-div">
              <button
                :class="disabled ? 'disabled-button' : 'primary'"
                @click="updateBookings('updateBookings')"
              >
                Validar RESERVA
              </button>
              <button
                :class="
                  disabled ? 'miniBtn disabled-button' : 'miniBtn trash-btn'
                "
                @click="updateBookings('deleteBookings')"
              >
                <font-awesome-icon :icon="['fas', 'trash-alt']" />
              </button>
            </span>
          </div>
          <div v-if="showTable">
            <Table :bookings="bookings" @select-booking="saveSelection" />
          </div>
          <div v-else>
            <md-progress-spinner
              :md-diameter="50"
              :md-stroke="5"
              md-mode="indeterminate"
              style=" margin-top: 20%; margin-bottom: 20%;margin-left: 43%"
            ></md-progress-spinner>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss">
@import '@design';

.container {
  display: flex;
  justify-content: center;
  width: 100vw;
  margin: auto;
  .data {
    width: 70%;
    padding: 3%;
    margin: 3%;
    background-color: #f2f5f9;
    .campo {
      width: 70%;
      margin-left: 3%;
    }
    .btn-div {
      display: flex;
      justify-content: space-between;
      width: 23%;
    }
    .miniBtn {
      width: 70px;
      height: 40px;
    }
    .trash-btn {
      @include main-button;

      width: 70px;
      background-color: $rosado-oscuro;
    }
    .containerTabs {
      justify-content: space-between;
      width: 50%;
      margin-left: 8.1%;
      .btnTab {
        padding: 1px 1px 5px 1px;
        cursor: pointer;
        background: transparent;
        border: none;
      }
    }
  }
}

.primary {
  @include main-button;

  width: fit-content;
  background-color: $verde-original;
}
.bloqueInfo {
  @include bloqueInfo;
}
.disabled-button {
  @include main-button;
  @include disabled-button;

  width: fit-content;
}
.row {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  &.containerBtns {
    justify-content: space-between;
  }
}
.title {
  @include title;

  font-size: 20px;
  color: $azul-original;
}
button,
svg {
  cursor: pointer;
  &.primary {
    @include main-button;

    width: fit-content;
    padding: 14px;
    background-color: $verde-original;
  }
}
.disabled {
  color: #ccc;
}
</style>
