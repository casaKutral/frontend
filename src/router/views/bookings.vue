<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'

export default {
  page: {
    title: 'Bookings',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <h1>Bookings</h1>
    <img src="@assets/images/logo.png" alt="Logo" />
  </Layout>
</template>
