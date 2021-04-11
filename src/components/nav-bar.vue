<script>
import { authComputed } from '@state/helpers'
import NavBarRoutes from './nav-bar-routes.vue'

export default {
  components: { NavBarRoutes },
  data() {
    return {
      persistentNavRoutes: [
        // {
        //   name: 'home',
        //   title: 'Home',
        // },
        // {
        //   name: 'Actividades',
        //   title: 'Actividades',
        // },
        // {
        //   name: 'Cocina',
        //   title: 'Cocina',
        // },
        // {
        //   name: 'Catalogo de productos',
        //   title: 'Catalogo de productos',
        // },
      ],
      loggedInNavRoutes: [
        {
          name: 'admin',
          title: 'admin',
        },
        {
          name: 'logout',
          title: 'cerrar sesión',
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
    <h1>CASA KUTRAL</h1>
    <span>
      <NavBarRoutes :routes="persistentNavRoutes" />
      <NavBarRoutes v-if="loggedIn" :routes="loggedInNavRoutes" />
      <NavBarRoutes v-else :routes="loggedOutNavRoutes" />
      <a
        class="whatsappBtn"
        target="blank"
        href="https://api.whatsapp.com/send?phone=+56949380469"
      >
        <font-awesome-icon class="whatsappIcon" :icon="['fab', 'whatsapp']" />
      </a>
    </span>
  </ul>
</template>

<style lang="scss" module>
@import '@design';

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0;
  padding-right: 10%;
  padding-left: 5%;
  margin: 0;
  list-style-type: none;
  background-color: $azul-original;

  h1 {
    @include logoTitle;

    color: white;
  }
  span {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    width: 60%;
  }

  li {
    display: block;
    margin-right: 6.3rem;
    a {
      font-family: 'CHILENA-REGULAR';
      font-size: 22px;
      color: white !important;
    }
  }
}
a.whatsappBtn .whatsappIcon {
  font-size: 40px !important;
  color: white;
}

@media (max-width: 600px) {
  .container {
    display: none;
  }
}
</style>
