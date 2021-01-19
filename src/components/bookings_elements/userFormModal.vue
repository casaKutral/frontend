<script>
export default {
  props: {
    cardHidden: {
      type: Boolean,
    },
    value: {
      type: Array,
      default: null,
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
    }
  },
  created() {
    console.log(this.value)
  },
  methods: {
    closeModal: function() {
      this.$emit('close-modal')
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
      <md-dialog-title class="pink modal-title"
        >Revisemos que esté todo correcto</md-dialog-title
      >
      <div class="cc-body">
        <div class="col-4">
          <label class="infoLabel">Taller</label>
          <label class="infoLabel">Profesor</label>
          <label class="infoLabel">Fecha</label>
          <label class="infoLabel">Precio</label>
        </div>
        <div class="col-6">
          <label class="infoData">{{ workshopName }}</label>
          <label class="infoData">{{ teacherName }}</label>
          <label class="infoData"
            >{{ value[0].date }} - {{ value[0].hour }}</label
          >
          <label class="infoData">CLP ${{ totalValue }}</label>
        </div>
      </div>
      <div class="check-row">
        <md-checkbox v-model="acceptTerms" class="md-primary"
          >Acepto los
          <a>términos y condiciones</a>
        </md-checkbox>
      </div>
      <md-dialog-actions>
        <md-button class="primary" @click="closeModal">Todo en orden</md-button>
        <md-button class="btn-cancel" @click="closeModal"
          >Quiero modificar</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<style lang="scss">
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
    display: block;
    padding-bottom: 11%;
    padding-left: 30%;
    font-family: 'Averta';
    font-size: 18px;
    font-style: italic;
    font-weight: 800;
    color: $azul-oscuro;
    text-align: left;
  }
  .infoData {
    display: block;
    padding-right: 25%;
    padding-bottom: 8%;
    font-family: 'Averta';
    font-size: 20px;
    font-style: italic;
    font-weight: 800;
    color: $azul-original;
    text-align: left;
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

  .btn-cancel {
    @include terciary-button;

    color: $rosado-oscuro !important;
    text-transform: none;
  }
}
</style>
