<script>
import appConfig from '@src/app.config'
import store from '@state/store'
import Layout from '@layouts/main.vue'
import { WorkshopsComputed } from '@state/helpers'
import Category from './bookings_flow/category.vue'

export default {
  page: {
    title: 'Bookings',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    Layout,
    Category,
  },
  data() {
    return {
      workshopsCategorys: {
        type: Array,
        default() {
          return []
        },
      },
      loading: false,
      comeFromHome: false,
    }
  },
  computed: {
    ...WorkshopsComputed,
    dateFormat: {
      get() {
        return this.$material.locale.dateFormat
      },
      set(val) {
        this.$material.locale.dateFormat = val
      },
    },
  },
  created: function() {
    this.loading = true
    if (this.$route.query.workshopId) {
      this.workshopsCategorys = []
    } else {
      store.dispatch('workshops/fetchWorkshops', null).then((data) => {
        this.extractCategorys(data)
        this.loading = false
      })
    }
    store.dispatch('workshops/fetchTeachers').then((data) => {
      this.loading = false
    })
  },
  methods: {
    extractCategorys: function(workshops) {
      const workshopsCat1 = []
      const workshopsCat2 = []
      const workshopsCat3 = []
      const workshopsCat4 = []
      workshops.map((workshop) => {
        switch (workshop.type) {
          case 'Taller':
            workshopsCat1.push(workshop)
            break
          case 'Terapia':
            workshopsCat2.push(workshop)
            break
          case 'Masaje':
            workshopsCat3.push(workshop)
            break
          case 'Cat4':
            workshopsCat4.push(workshop)
            break
          default:
            return null
        }
      })
      this.workshopsCategorys = [
        {
          workshops: workshopsCat1,
          id: 0,
          plural: 'Talleres',
        },
        {
          workshops: workshopsCat2,
          id: 1,
          plural: 'Terapias',
        },
        {
          workshops: workshopsCat3,
          id: 2,
          plural: 'Masajes',
        },
        {
          workshops: workshopsCat4,
          id: 3,
          plural: '',
        },
      ]
      this.showCategory = true
      // console.log(this.workshopsCategorys)
    },
  },
}
</script>

<template>
  <Layout>
    <div v-if="loading" class="loadingMobile">
      <md-progress-spinner
        :md-diameter="50"
        :md-stroke="10"
        md-mode="indeterminate"
      ></md-progress-spinner>
    </div>
    <div v-else>
      <Category :workshops-categorys="workshopsCategorys" />
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
@import '@design';
.loadingMobile {
  display: flex;
  justify-content: center;
  height: 40vh;
  padding-top: 80%;
  margin: auto;

  .md-progress-spinner-draw {
    display: flex;
    align-self: center;
    width: 250px;
    height: 250px;
  }
}
</style>
