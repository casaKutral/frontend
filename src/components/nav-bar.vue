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
          title: 'Home',
        },
        {
          name: 'Actividades',
          title: 'Actividades',
        },
        {
          name: 'Cocina',
          title: 'Cocina',
        },
        // {
        //   name: 'Catalogo de productos',
        //   title: 'Catalogo de productos',
        // },
      ],
      loggedInNavRoutes: [
        {
          name: 'admin',
          title: () => 'Logged in as ' + this.currentUser.name,
        },
        {
          name: 'logout',
          title: 'Log out',
        },
      ],
      loggedOutNavRoutes: [
        // {
        //   name: 'loginAdmin',
        //   title: 'Admin',
        // },
      ],
    }
  },
  computed: {
    ...authComputed,
  },
}
</script>

<template>
  <ul :class="$style.container">
    <NavBarRoutes :routes="persistentNavRoutes" />
    <NavBarRoutes v-if="loggedIn" :routes="loggedInNavRoutes" />
    <NavBarRoutes v-else :routes="loggedOutNavRoutes" />
  </ul>
</template>

<style lang="scss" module>
@import '@design';

.container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 72px;
  padding: 0;
  padding-right: 10%;
  margin: 0;
  list-style-type: none;
  background-color: darkblue;

  > li {
    display: block;
    margin-right: 6.3rem;
    a {
      font-family: 'CHILENA-REGULAR';
      font-size: 22px;
      color: white !important;
    }
  }
}

@media (max-width: 600px) {
  .container {
    display: none;
  }
}
</style>
