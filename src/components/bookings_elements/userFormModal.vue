<template>
  <div>
    <md-dialog :md-active="cardHidden === true" :md-fullscreen="false">
      <md-dialog-title>Datos del usuario</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeModal">Close</md-button>
        <md-button class="md-primary" @click="closeModal">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  props: {
    cardHidden: {
      type: Boolean,
    },
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },
  methods: {
    closeModal: function() {
      this.$emit('close-modal')
    },
  },
}
</script>

<style lang="scss">
//
.md-dialog {
  max-width: 768px;
}
.md-dialog-container {
  max-width: 768px;
}
</style>
