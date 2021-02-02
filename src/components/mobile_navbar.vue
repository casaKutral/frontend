<script>
export default {
  props: {
    showBackButton: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    // console.log(this.showBackButton)
  },
  methods: {
    back() {
      this.$emit('back')
    },
  },
}
</script>

<template>
  <div class="mobileNavContainer">
    <font-awesome-icon
      v-if="showBackButton"
      class="chevron-left"
      :icon="['fa', 'chevron-left']"
      @click="back"
    />

    <h1 :class="showBackButton ? 'align' : 'alignExtra'">CASA KUTRAL</h1>

    <a
      class="whatsappBtn"
      target="blank"
      href="https://api.whatsapp.com/send?phone=+56948628194"
    >
      <font-awesome-icon class="whatsappIcon" :icon="['fab', 'whatsapp']" />
    </a>
  </div>
</template>

<style lang="scss">
@import '@design';
.mobileNavContainer {
  display: none;
}

@media (max-width: 600px) {
  .mobileNavContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 5%;
    padding-left: 5%;
    background-color: white;

    h1 {
      @include logoTitle;

      color: $azul-original;
      &.align {
        padding-left: 4%;
      }
      &.alignExtra {
        position: relative;
        left: 30%;
      }
    }

    .chevron-left {
      font-size: 26px;
      font-weight: 800;
      color: $rosado-oscuro;
    }
    .whatsappIcon {
      font-size: 40px;
      color: $verde-oscuro;
    }
  }
}
</style>
