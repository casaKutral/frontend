<script>
import { authComputed } from '@state/helpers'
import NavBarRoutes from './nav-bar-routes.vue'

export default {
  components: { NavBarRoutes },
  data() {
    return {
      persistentNavRoutes: [
        {
          name: 'home',
          title: 'Inicio',
          icon: 'home_icon',
        },
        // {
        //   name: 'Blog de cocina',
        //   title: 'Blog',
        //   icon: 'blog_icon',
        // },
        {
          name: 'Cocina',
          title: 'Cocina',
          icon: 'market_icon',
        },
        {
          name: 'Actividades',
          title: 'Actividades',
          icon: 'bookings_icon',
        },
      ],
      route: this.$router.currentRoute.path,
    }
  },
  computed: {
    ...authComputed,
  },
  // created() {
  //   console.log(this.route)
  // },
}
</script>

<template>
  <ul :class="$style.bottomNav">
    <NavBarRoutes :routes="persistentNavRoutes" :current-route="route" />
  </ul>
</template>

<style lang="scss" module>
@import '@design';

.bottomNav {
  display: none;
}

@media (max-width: 600px) {
  .bottomNav {
    position: absolute;
    bottom: 0;
    z-index: 3;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    padding-top: 3%;
    padding-right: 0;
    padding-bottom: 3%;
    padding-left: 0;
    margin-bottom: 0;
    background-color: $azul-original;
    > li {
      display: inline-block;
      width: 25%;
      text-align: center;
    }
  }
}
</style>
