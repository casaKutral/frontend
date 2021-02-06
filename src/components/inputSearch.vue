<script>
export default {
  props: {},
  data() {
    return {
      searchValue: '',
    }
  },
  methods: {
    emitSearch() {
      this.$emit('search', this.searchValue)
    },
  },
}
</script>

<template>
  <div class="campo">
    <input
      v-model="searchValue"
      class="input"
      @keyup.enter="emitSearch"
      @keyup.delete="emitSearch"
    />
    <button type="button" @click="emitSearch">
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M37.4805 32.8566L30.0809 25.457C29.7469 25.123 29.2941 24.9375 28.8191 24.9375H27.6094C29.6578 22.3176 30.875 19.0223 30.875 15.4375C30.875 6.90977 23.9652 0 15.4375 0C6.90977 0 0 6.90977 0 15.4375C0 23.9652 6.90977 30.875 15.4375 30.875C19.0223 30.875 22.3176 29.6578 24.9375 27.6094V28.8191C24.9375 29.2941 25.123 29.7469 25.457 30.0809L32.8566 37.4805C33.5543 38.1781 34.6824 38.1781 35.3727 37.4805L37.473 35.3801C38.1707 34.6824 38.1707 33.5543 37.4805 32.8566ZM15.4375 24.9375C10.1902 24.9375 5.9375 20.6922 5.9375 15.4375C5.9375 10.1902 10.1828 5.9375 15.4375 5.9375C20.6848 5.9375 24.9375 10.1828 24.9375 15.4375C24.9375 20.6848 20.6922 24.9375 15.4375 24.9375Z"
          fill="#CCCCCC"
        />
      </svg>
    </button>
  </div>
</template>

<style lang="scss">
@import '@design';

@media (min-width: 600px) {
  .campo {
    position: relative;
    width: fit-content;
    height: 42px;
    background-color: white;
    border-radius: 8px;
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.25);
    input {
      width: 100%;
      height: 100%;
      padding: 0 15px;
      background-color: transparent;
      border: none;
      border-radius: 4px;
      &:focus {
        outline: none;
      }
    }
    button {
      position: absolute;
      top: 3px;
      right: -3px;
      width: 12%;
      cursor: pointer;
      background: transparent;
      border: none;
      svg {
        width: 50%;
      }
    }
  }
}
</style>
