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
        {
          name: 'Blog de cocina',
          title: 'Blog',
          icon: 'blog_icon',
        },
        {
          name: 'Catalogo de productos',
          title: 'Cocina',
          icon: 'market_icon',
        },
        {
          name: 'Reservas Kutral',
          title: 'Reservar',
          icon: 'bookings_icon',
        },
      ],
    }
  },
  computed: {
    ...authComputed,
  },
}
</script>

<template>
  <ul :class="$style.bottomNav">
    <NavBarRoutes :routes="persistentNavRoutes" />
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
    display: flex;
    align-items: flex-end;
    width: 100%;
    padding-top: 5%;
    padding-right: 0;
    padding-left: 0;
    background-color: lightgray;
    border-top: 1px solid green;
    > li {
      display: inline-block;
      width: 25%;
      text-align: center;
    }
  }
}
</style>
