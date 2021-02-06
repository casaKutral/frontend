<script>
import store from '@state/store'

export default {
  props: {
    cardHidden: {
      type: Boolean,
    },
    value: {
      type: Array,
      default: null,
    },
    workshopId: {
      type: String,
      default: '',
    },
    workshopName: {
      type: String,
      default: '',
    },
    teacherName: {
      type: String,
      default: '',
    },
    totalValue: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      acceptTerms: false,
      showConfirmData: true,
      showTermsDetail: false,
      showUserDataForm: false,
      showMailWarning: false,
      validForm: false,
      showSuccess: false,
      showError: false,
      rememberMe: false,
      showMailConfirm: false,
      failCode: '',
      name: '',
      email: '',
      phone: '',
      savedUser: {},
      loading: false,
    }
  },
  created() {
    const savedUser = JSON.parse(localStorage.getItem('user'))
    if (savedUser) {
      this.name = savedUser.name
      this.email = savedUser.email
      this.phone = savedUser.phone
      this.rememberMe = true
      this.validForm = true
    }
  },
  methods: {
    closeModal: function() {
      this.$emit('close-modal')
    },
    confirm() {
      if (this.acceptTerms === true) {
        this.showConfirmData = false
        this.showUserDataForm = true
        setTimeout(() => {
          const nameInput = document.getElementById('userFormName')
          const emailInput = document.getElementById('userFormEmail')
          const phoneInput = document.getElementById('userFormPhone')
          phoneInput.addEventListener('keyup', () => {
            if (
              nameInput.value !== '' &&
              phoneInput.value !== '' &&
              this.ValidateEmail(emailInput.value) === true
            ) {
              this.validForm = true
            } else if (this.ValidateEmail(emailInput.value) === false) {
              this.showMailWarning = true
              this.validForm = false
              emailInput.addEventListener('keyup', () => {
                if (this.ValidateEmail(emailInput.value) === true) {
                  this.showMailWarning = false
                }
              })
            } else {
              this.validForm = false
            }
            if (
              phoneInput.value !== '' &&
              this.ValidateEmail(emailInput.value) === true
            ) {
              this.validForm = true
            }
          })
        }, 2000)
      }
    },
    ValidateEmail(inputText) {
      var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (inputText.match(mailformat)) {
        return true
      } else {
        return false
      }
    },
    backFromUserForm() {
      this.showConfirmData = true
      this.showUserDataForm = false
    },
    showTerms() {
      this.showConfirmData = false
      this.showTermsDetail = true
    },
    backFromTerms() {
      this.showConfirmData = true
      this.showTermsDetail = false
    },
    goToConfirmMail() {
      if (this.validForm === true) {
        this.showUserDataForm = false
        this.showMailConfirm = true
      }
    },
    backFromConfirmMail() {
      this.showUserDataForm = true
      this.showMailConfirm = false
    },
    starBookingProcess() {
      if (this.validForm === true) {
        const newUser = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          // workshopsBooked_ids: Array
        }
        const booking = {
          shortID: '',
          dates: this.value,
          cost: this.totalValue,
          status: 'Pendiente',
          workshop_id: this.workshopId,
          workshop_name: this.workshopName,
          teacher_name: this.teacherName,
          user_id: '',
          user_name: this.name,
          user_email: this.email,
          user_phone: this.phone,
        }
        if (this.rememberMe === true) {
          this.getUsers(booking, newUser)
        } else {
          this.sendBooking(booking, 'noAddUser', newUser)
        }
      }
    },
    getUsers(booking, newUser) {
      store.dispatch('users/fetchUsers').then((response) => {
        this.savedUser = store.state.users.user
        if (this.savedUser?.name !== undefined) {
          booking.user_id = this.savedUser._id
          this.sendBooking(booking, 'updateUser', newUser)
        } else {
          localStorage.setItem('user', JSON.stringify(newUser))
          this.sendBooking(booking, 'addUser', newUser)
        }
      })
    },
    sendBooking(booking, action, newUser) {
      this.loading = true
      store.dispatch('workshops/postBooking', booking).then((response) => {
        this.showMailConfirm = false
        if (response.status >= 200 && response.status <= 300) {
          this.showSuccess = true
          this.showUserDataForm = false
          store.dispatch('workshops/updateHours', booking)
          if (action === 'updateUser') {
            const bookingId = [
              ...this.savedUser.bookings_ids,
              response.data._id,
            ]
            store.dispatch('users/updateUser', bookingId)
          } else if (action === 'addUser') {
            newUser.bookings_ids = [response.data._id]
            store.dispatch('users/createUser', newUser)
          } else if (action === 'noAddUser') {
            // no hacer nada con el usuario
          }
          this.loading = false
        } else {
          this.showError = true
          this.failCode = response.status
        }
      })
    },
    backToHome() {
      this.$emit('close-modal')
      this.$router.push({ path: '/' })
      // navegar al home
    },
  },
}
</script>

<template>
  <div>
    <md-dialog
      id="customerModal"
      :md-active="cardHidden === true"
      :md-fullscreen="false"
    >
      <div v-if="showConfirmData === true" style="display: contents;">
        <md-dialog-title class="pink modal-title"
          >Revisemos que esté todo correcto</md-dialog-title
        >
        <div class="cc-body">
          <div class="row">
            <label class="infoLabel">Taller</label>
            <label class="infoData">{{ workshopName }}</label>
          </div>
          <div class="row">
            <label class="infoLabel">Profesor</label>
            <label class="infoData">{{ teacherName }}</label>
          </div>
          <div class="row">
            <label class="infoLabel">Fecha</label>
            <div class="datesBlock">
              <label v-for="date in value" :key="date._id" class="infoData"
                >{{ date.date }} - {{ date.hour }}</label
              >
            </div>
          </div>
          <div class="row">
            <label class="infoLabel">Precio</label>
            <label class="infoData">CLP ${{ totalValue }}</label>
          </div>
        </div>
        <div class="check-row">
          <md-checkbox v-model="acceptTerms" class="md-primary"
            >Acepto los
            <a @click="showTerms">términos y condiciones</a>
          </md-checkbox>
        </div>
        <md-dialog-actions>
          <md-button
            :class="
              acceptTerms === true ? 'primary' : 'primary primary-disabled'
            "
            @click="confirm"
            >Todo en orden</md-button
          >
          <md-button class="btn-cancel" @click="closeModal"
            >Quiero modificar</md-button
          >
        </md-dialog-actions>
      </div>
      <div
        v-if="showTermsDetail === true"
        id="terms"
        style="display: contents;"
      >
        <md-dialog-title class="pink modal-title">
          <font-awesome-icon
            class="chevron-left"
            :icon="['fa', 'chevron-left']"
            @click="backFromTerms"
          />
          Términos y condiciones
        </md-dialog-title>
        <div class="cc-body">
          <p class="terms-text">
            <span class="bold">Realizar pago</span><br /><br />
            La reserva se considera completa al momento que la persona que la
            solicita haga el pago mediante transferencia a la cuenta enviada a
            su correo electrónico. Al momento de realizar esta transferencia
            debe especficar en el Asunto de la misma el
            <span class="bold">código de reserva</span> que será enviado a su
            correo electrónico.<br />Tiene un plazo de 24 horas, a contar de que
            se envía el mail, para hacer dicho pago o su solicitud de reserva
            será anulado y esta podría ser tomada por otra persona.<br /><br /><br />
            <span class="bold">Reserva Intransferible</span>
            La reserva es intransferible y solo podrá ser ocupada el día y la
            hora solicirada, y por la persona que figura en la información
            entregada al momento de realizar la solicitud y posterior pago.<br /><br /><br />
            <span class="bold">Opciones de cancelación de Reserva</span>
            Para dejar anulada la reserva puede no realizar el pago de esta y
            luego de 24 horas está volverá a estar disponible y no deberá pagar
            nada. Si usted ya realizó el pago y desea cancelar la reserva, debe
            solicitarla mediante un correo electrónico a
            <span class="bold">reservas@casakutral.cl</span> y en el asunto de
            este correo escribir “CANCELAR RESERVA”, además en la información
            del correo debe entregar el código de reserva que le habrá llegado a
            la bandeja de entrada de su correo electrónico.<br /><br /><br />
            Esta solicitud debe realizarse con un mínimo de
            <span class="bold">48 horas</span> antes del inicio de la actividad,
            de lo contrario no podrá ser cancelada la reserva ni devuelto el
            dinero. Cancelar una reserva que ha sido pagada tiene un costo de
            CL$500 que se descontarán al momento de la devolución del dinero.
          </p>
        </div>
      </div>
      <div
        v-if="showUserDataForm === true"
        id="userForm"
        style="display: contents;"
      >
        <md-dialog-title class="pink modal-title">
          <font-awesome-icon
            class="chevron-left"
            :icon="['fa', 'chevron-left']"
            @click="backFromUserForm"
          />
        </md-dialog-title>
        <div class="cc-body">
          <label class="infoLabel">Nombre y Apellido</label>
          <BaseInputText
            id="userFormName"
            v-model="name"
            name="name"
            type="text"
            placeholder="Lupita de las nieves"
          />
          <label class="infoLabel">Correo electrónico</label>
          <div class="row-warning">
            <BaseInputText
              id="userFormEmail"
              v-model="email"
              name="email"
              type="text"
              placeholder="lupi.nevada@gmail.com"
              :class="showMailWarning ? 'warning' : ''"
            />
            <img
              v-if="showMailWarning"
              class="warning-icon"
              src="@assets/images/warning-icon.png"
            />
          </div>
          <p v-if="showMailWarning" class="warning-message"
            >Parece que este no es un correo válido</p
          >
          <label class="infoLabel">Teléfono de contacto</label>
          <BaseInputText
            id="userFormPhone"
            v-model="phone"
            name="phone"
            type="text"
            placeholder="+56948628199"
          />
        </div>
        <div class="check-row">
          <md-checkbox v-model="rememberMe" class="md-primary"
            >Recuerda mis datos para la próxima vez
          </md-checkbox>
        </div>
        <md-dialog-actions>
          <md-button
            :class="validForm === true ? 'primary' : 'primary primary-disabled'"
            @click="goToConfirmMail"
            >Reservar</md-button
          >
        </md-dialog-actions>
      </div>
      <div
        v-if="showMailConfirm === true"
        id="confirmMail"
        style="display: contents;"
      >
        <md-dialog-title class="pink modal-title">
          <font-awesome-icon
            class="chevron-left"
            :icon="['fa', 'chevron-left']"
            @click="backFromConfirmMail"
          />
          ¿Confirmas que tu correo está bien escrito?
        </md-dialog-title>
        <div class="cc-body">
          <p class="mail">{{ email }}</p>
          <p class="terms-text">
            Recuerda que a esta dirección llegarán todos los datos de la reserva
            y con el podrás validarla.
          </p>
        </div>
        <span v-if="loading">
          <md-progress-spinner
            :md-diameter="50"
            :md-stroke="5"
            md-mode="indeterminate"
            style=" margin-bottom: 20%;margin-left: 43%;"
          ></md-progress-spinner>
        </span>
        <md-dialog-actions v-if="!loading">
          <!-- md-mode="indeterminate" -->
          <md-button class="primary" @click="starBookingProcess"
            >Sí, confirmo</md-button
          >
          <md-button class="btn-cancel" @click="backFromConfirmMail"
            >No, quiero modificar</md-button
          >
        </md-dialog-actions>
      </div>
      <div v-if="showSuccess === true" id="success" style="display: contents;">
        <md-dialog-title class="pink modal-title"
          >Reserva exitosa!</md-dialog-title
        >
        <div class="cc-body">
          <img src="@assets/images/ok_img.png" class="success-img" />
          <p class="success-text">
            Recuerda que bla bla bla confirmar esta reserva debes hacer el
            depósito de bla bla bla a los datos del mail bla bla bla con plazo
            bla bla bla.
          </p>
        </div>
        <md-dialog-actions>
          <md-button class="btn-cancel" @click="backToHome"
            >Volver al inicio</md-button
          >
        </md-dialog-actions>
      </div>
      <div v-if="showError === true" id="success" style="display: contents;">
        <md-dialog-title class="pink modal-title"
          >Oh no, algo salió mal!</md-dialog-title
        >
        <div class="cc-body">
          <img src="@assets/images/error_img.png" class="success-img" />
          <p class="success-text">
            Lamentablemente algo pasó y no se logró guardar tu reserva. Intenta
            una vez más, seguramente ahora sí se podrá sin problema! Si el
            problema persiste porfavor contactanos al mail adminti@casakutral
            con el siguiente código de error: {{ failCode }}
          </p>
        </div>
        <md-dialog-actions>
          <md-button class="primary" @click="starBookingProcess"
            >Intentar otra vez!</md-button
          >
        </md-dialog-actions>
      </div>
    </md-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import '@design';
//
.md-dialog {
  max-width: 768px;
}
#customerModal {
  .cc-body {
    width: 100%;
  }
  .md-dialog-title {
    background-color: white;
  }
  .modal-title {
    width: 75%;
    margin: auto;
    margin-top: 5%;
    margin-bottom: 20%;
  }
  .col-4 {
    display: inline-block;
    width: 40%;
  }
  .col-6 {
    display: inline-block;
    width: 60%;
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
  .md-dialog-container {
    max-width: 768px;
  }
  .md-dialog-actions {
    display: block;
    margin: auto;
  }
  .md-dialog-actions .md-button + .md-button {
    margin-top: 6%;
    margin-bottom: 10%;
    margin-left: 0;
  }
  .primary-disabled {
    background-color: $gris;
  }
  .primary {
    color: white !important;
    text-transform: none;
  }
  .check-row {
    display: flex;
    justify-content: center;
    margin-top: 6%;
    margin-bottom: 3%;
  }
  .md-checkbox-label {
    font-family: 'Averta';
    font-size: 16px;
    font-style: italic;
    font-weight: 800;
    color: $azul-oscuro;
    a {
      color: $azul-claro;
    }
  }
  #terms {
    .modal-title {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: auto;
      margin-top: 5%;
      margin-bottom: 2%;
    }
    .terms-text {
      max-height: 350px;
      padding: 5%;
      overflow-y: scroll;
      font-family: 'Chilena-Regular';
      font-size: 18px;
      font-style: normal;
      .bold {
        font-weight: bold;
      }
    }
  }
  .chevron-left {
    position: relative;
    left: -11%;
  }
  #userForm {
    .modal-title {
      display: flex;
      justify-content: flex-start;
      width: 85%;
      margin: auto;
      margin-top: 0%;
      margin-bottom: 0%;
    }
    .cc-body {
      justify-content: flex-start;
      width: 100%;
      padding-right: 8%;
      padding-left: 10%;
    }
    .infoLabel {
      width: 100%;
      padding-bottom: 5%;
      padding-left: 0%;
    }
    .check-row {
      padding-left: 5%;
      margin-top: 0;
      margin-bottom: 0;
    }
    ._base-input-text_input_cKPEQ {
      width: 90%;
    }
    ._base-input-text_input_cKPEQ.warning {
      margin-bottom: 0;
      border: 2px solid $rosado-oscuro;
    }
    .md-dialog-actions {
      margin-bottom: 10%;
    }
    .row-warning {
      display: flex;
    }
    .warning-icon {
      width: 10%;
      height: 10%;
      padding-top: 3%;
      padding-left: 2%;
    }
    .warning-message {
      margin-bottom: 5%;
      font-family: 'Chilena-regular';
      font-size: small;
      font-style: italic;
      color: $rosado-oscuro;
    }
  }
  #success {
    .modal-title {
      margin-bottom: 5%;
    }
    .success-img {
      display: block;
      width: 35%;
      margin: auto;
      margin-bottom: 6%;
    }
    .success-text {
      display: inline-flex;
      padding-right: 6%;
      padding-bottom: 5%;
      padding-left: 5%;
      font-family: 'Chilena-bold';
      font-size: 18px;
      font-weight: 700;
      color: $azul-original;
      text-align: center;
    }
  }
  #confirmMail {
    .modal-title {
      width: 100%;
    }
    .cc-body {
      width: 90%;
      margin: auto;
      margin-bottom: 8%;
      font-family: 'Chilena-Regular';
      font-size: 16px;
      color: $azul-oscuro;
      text-align: center;
      .mail {
        margin-bottom: 10%;
        font-family: 'Chilena-Bold';
        font-size: 26px;
        color: $azul-original;
      }
    }
    .btn-cancel {
      font-size: 15px;
    }
  }

  .btn-cancel {
    @include terciary-button;

    color: $rosado-oscuro !important;
    text-transform: none;
  }
  .modal-title {
    font-size: 24px;
    color: $rosado-original;
  }
}
@media (min-width: 990px) {
  #customerModal {
    .md-dialog {
      top: 15%;
      left: 30%;
      max-width: 40%;
    }
    .md-dialog-container {
      overflow-y: scroll;
    }
    .infoLabel {
      padding-left: 20%;
      margin-right: 6%;
      font-size: 26px;
    }
    .infoData {
      font-size: 26px;
    }
    .datesBlock {
      width: 50%;
    }
    .modal-title {
      margin-bottom: 10%;
      font-size: 30px;
      color: $rosado-original;
    }
    .check-row {
      margin-top: 0;
    }
    .md-checkbox-label {
      font-size: 20px;
    }
    .primary {
      width: 200px;
      height: 56px;
      font-family: 'Averta';
      font-size: 26px;
    }
    .btn-cancel {
      margin-top: 10% !important;
      margin-bottom: 20% !important;
      margin-left: 16px !important;
      font-size: 22px;
    }
    #confirmMail {
      .modal-title {
        width: 90%;
      }
      .cc-body {
        width: 80%;
        margin-bottom: 2%;
        font-size: 26px;
        line-height: normal;
      }
      .btn-cancel {
        margin-top: 10% !important;
        margin-bottom: 20% !important;
        margin-left: 0 !important;
        font-size: 22px;
      }
    }
    #userForm {
      .cc-body {
        padding-left: 20%;
      }
    }
    #terms {
      .terms-text {
        padding-left: 12%;
      }
    }
  }
}
</style>
