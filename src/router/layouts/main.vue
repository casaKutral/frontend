<script>
import NavBar from '@components/nav-bar.vue'
import BottomNavbar from '@components/bottomNavbar.vue'
import Footer from '@components/footer.vue'

export default {
  components: { NavBar, BottomNavbar, Footer },
}
</script>

<template>
  <div>
    <NavBar />
    <BottomNavbar />
    <slot />
    <Footer />
  </div>
</template>

<style lang="scss" module>
@import '@design';

.container {
  min-width: $size-content-width-min;
  max-width: $size-content-width-max;
  margin: 0 auto;
}
</style>
