import Vue from 'vue'
import router from '@router'
import store from '@state/store'
import {
  MdButton,
  MdContent,
  MdTabs,
  MdCard,
  MdDialog,
  MdDatepicker,
  MdCheckbox,
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowAltCircleLeft,
  faClock,
} from '@fortawesome/free-regular-svg-icons'
import { faPlusCircle, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import App from './app.vue'
// Globally register all `_base`-prefixed components
import '@components/_globals'

library.add(faArrowAltCircleLeft)
library.add(faClock)
library.add(faPlusCircle)
library.add(faChevronLeft)
library.add(faWhatsapp)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}

Vue.directive('click-outside', {
  bind: function(el, binding, vnode) {
    el.clickOutsideEvent = function(event) {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
})
// componentes de material design
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdCard)
Vue.use(MdDialog)
Vue.use(MdDatepicker)
Vue.use(MdCheckbox)

Vue.material.locale.dateFormat = 'dd/MM/yyyy'
Vue.material.locale.days = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
]
Vue.material.locale.firstDayOfAWeek = 1
Vue.material.locale.startYear = 2020
Vue.material.locale.endYear = 2021
Vue.material.locale.shortDays = [
  'Dom',
  'Lun',
  'Mar',
  'Mier',
  'Juev',
  'Vier',
  'Sa',
]
Vue.material.locale.shorterDays = ['D', 'L', 'M', 'MI', 'J', 'V', 'S']
Vue.material.locale.months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]
Vue.material.locale.cancel = 'Cancelar'
Vue.material.locale.confirm = 'Confirmar'
