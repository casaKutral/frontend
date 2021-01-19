<script>
import appConfig from '@src/app.config'

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
}
</script>

<template>
  <div id="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Normalize default styles across browsers,
// https://necolas.github.io/normalize.css/
@import '~normalize.css/normalize.css';
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';

// Design variables and utilities from src/design.
@import '@design';

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background: white;
}
#app {
  @extend %typography-small;
}

// ===
// Base element styles
// ===

// a:visited {
//   color: $color-link-text;
// }

h1 {
  @extend %typography-xxlarge;
}

h2 {
  @extend %typography-xlarge;
}

h3 {
  @extend %typography-large;
}

h4 {
  @extend %typography-medium;
}

h5,
h6 {
  @extend %typography-small;
}

@font-face {
  font-family: 'Averta';
  src: local('Averta'),
    url(./assets/fonts/AvertaDemoPE-ExtraBold.otf) format('truetype');
}
@font-face {
  font-family: 'Chilena-Bold';
  src: local('Chilena-Bold'),
    url(./assets/fonts/Chilena-Bold.otf) format('truetype');
}
@font-face {
  font-family: 'Chilena-ExtraBold';
  src: local('Chilena-ExtraBold'),
    url(./assets/fonts/Chilena-ExtraBold.otf) format('truetype');
}
@font-face {
  font-family: 'Chilena-Light';
  src: local('Chilena-Light'),
    url(./assets/fonts/Chilena-Light.otf) format('truetype');
}
@font-face {
  font-family: 'Chilena-Regular';
  src: local('Chilena-Regular'),
    url(./assets/fonts/Chilena-Regular.otf) format('truetype');
}
@font-face {
  font-family: 'ChilenaItalic-Bold';
  src: local('ChilenaItalic-Bold'),
    url(./assets/fonts/ChilenaItalic-Bold.otf) format('truetype');
}
@font-face {
  font-family: 'ChilenaItalic-ExtraBold';
  src: local('ChilenaItalic-ExtraBold'),
    url(./assets/fonts/ChilenaItalic-ExtraBold.otf) format('truetype');
}
@font-face {
  font-family: 'ChilenaItalic-Light';
  src: local('ChilenaItalic-Light'),
    url(./assets/fonts/ChilenaItalic-Light.otf) format('truetype');
}
@font-face {
  font-family: 'ChilenaItalic-Regular';
  src: local('ChilenaItalic-Regular'),
    url(./assets/fonts/ChilenaItalic-Regular.otf) format('truetype');
}
@font-face {
  font-family: 'Industry';
  src: local('Industry'),
    url(./assets/fonts/Industry.Inc.Base.otf) format('truetype');
}

// ===
// Vendor
// ===

#nprogress .bar {
  background: $color-link-text;
}
</style>
