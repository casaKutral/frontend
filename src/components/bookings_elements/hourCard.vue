<script>
export default {
  components: {},
  props: {
    // eslint-disable-next-line vue/require-prop-types
    elements: {
      default: null,
    },
    // eslint-disable-next-line vue/require-prop-types
    cardHidden: { default: false },
  },
  data() {
    return {}
  },
  created: function() {
    console.log(this.elements)
  },
  methods: {
    closeModal() {
      // algo
    },
  },
}
</script>

<template>
  <md-dialog :md-active="cardHidden === true" :md-fullscreen="false">
    <md-dialog-title>Horas</md-dialog-title>
    <md-dialog-actions>
      <md-button class="md-primary" @click="closeModal">Close</md-button>
      <md-button class="md-primary" @click="closeModal">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<style lang="scss">
//
.md-dialog {
  max-width: 768px;
}
.md-dialog-container {
  max-width: 768px;
}
</style>
