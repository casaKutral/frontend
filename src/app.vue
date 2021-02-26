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
.md-field.md-clearable input.md-input {
  font-family: 'Averta';
  font-size: 18px;
  font-weight: 800;
  color: $azul-claro;
  border-bottom: 2px solid $azul-original;
  -webkit-text-fill-color: $azul-original;
}
.md-icon.md-theme-default.md-icon-image svg {
  fill: $azul-claro;
}
.md-field.md-theme-default::after {
  display: none !important;
}
.md-field.md-theme-default > .md-icon::after {
  display: none !important;
}
.bookingCardFilled {
  .md-field {
    padding-top: 0;
    margin-bottom: 0;
  }
  .md-field.md-theme-default label {
    font-family: 'Averta';
    font-size: 18px;
    font-weight: 800;
    color: white !important;
  }
  .md-field.md-clearable .md-input {
    font-family: 'Averta';
    font-size: 18px;
    font-weight: 800;
    color: white !important;
    border-bottom: 2px solid white;
    -webkit-text-fill-color: white;
  }
  .md-button-content {
    display: none;
  }
  .md-icon.md-theme-default.md-icon-image svg {
    fill: white;
  }
}
#customerModal {
  .md-dialog-container {
    width: 100%;
    overflow-y: scroll;
  }
  .md-dialog-actions {
    display: block;
    margin: auto;
  }
  .md-dialog-actions .md-button + .md-button {
    margin-top: 6%;
    margin-bottom: 10%;
    margin-left: 0;
  }
  .md-checkbox-label {
    width: 90%;
    font-family: 'Averta';
    font-size: 16px;
    font-style: italic;
    font-weight: 800;
    color: $azul-oscuro;
    a {
      color: $azul-claro;
    }
  }
  .check-row-1 {
    padding-left: 11%;
    label {
      width: 100% !important;
    }
  }
}
@media (min-width: 990px) {
  #customerModal {
    .md-dialog {
      top: 15%;
      left: 30%;
      width: 60%;
    }
    .md-dialog-container {
      width: 30%;
      overflow-y: scroll;
    }
    .check-row-1 {
      padding-left: 0%;
      label {
        width: 100% !important;
      }
    }
    #terms {
      .chevron-left {
        position: relative;
        left: -22%;
      }
    }
  }
  a.whatsappBtn .whatsappIcon {
    font-size: 40px !important;
    color: white;
  }
}

// ===
// Vendor
// ===

#nprogress .bar {
  background: $color-link-text;
}
</style>
