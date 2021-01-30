<script>
// Allows stubbing BaseLink in unit tests
const BaseLink = 'BaseLink'

export default {
  // Functional components are stateless, meaning they can't
  // have data, computed properties, etc and they have no
  // `this` context.
  functional: true,
  props: {
    routes: {
      type: Array,
      required: true,
    },
    currentRoute: {
      type: String,
      default: '',
    },
  },
  // Render functions are an alternative to templates
  render(h, { props, $style = {} }) {
    function getRouteTitle(route) {
      return typeof route.title === 'function' ? route.title() : route.title
    }

    function getIcon(route) {
      const current = props.currentRoute
      const routeName = route.title
      switch (current) {
        case '/actividades':
          if (routeName === 'Actividades') {
            return require(`../assets/images/${route.icon}_active.png`)
          } else {
            return require(`../assets/images/${route.icon}.png`)
          }
        case '/cocina':
          if (routeName === 'Cocina') {
            return require(`../assets/images/${route.icon}_active.png`)
          } else {
            return require(`../assets/images/${route.icon}.png`)
          }
        case '/blog':
          if (routeName === 'Blog') {
            return require(`../assets/images/${route.icon}_active.png`)
          } else {
            return require(`../assets/images/${route.icon}.png`)
          }
        case '/':
          if (routeName === 'Inicio') {
            return require(`../assets/images/${route.icon}_active.png`)
          } else {
            return require(`../assets/images/${route.icon}.png`)
          }
      }
    }
    // Functional components are the only components allowed
    // to return an array of children, rather than a single
    // root node.
    return props.routes.map((route) => (
      <BaseLink
        tag='li'
        key={route.name}
        to={route}
        exact-active-class={$style.active}
      >
        <a class={route.icon ? $style.bottomNavA : ''}>
          {route.icon && (
            <img
              src={getIcon(route)}
              alt='icono'
              class={$style.icon}
              exact-active-class={$style.iconActive}
            />
          )}
          {getRouteTitle(route)}
        </a>
      </BaseLink>
    ))
  },
}
</script>

<style lang="scss" module>
@import '@design';

.bottomNavA {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: white;
  text-decoration: none;
}

.icon {
  width: 35%;
}

.active a {
  font-weight: 600;
  color: white !important;
  text-decoration: none;
  cursor: default;
}
</style>
