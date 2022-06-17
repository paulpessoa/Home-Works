<template>
  <div>
  <PageAuth />
  </div>

</template>

<script lang="ts">
  import Vue from 'vue'
  import PageAuth from './PageAuth.vue'

  export default Vue.extend({
    name: 'HomeDashboard',
    data: () => ({
      userTocken: null,
    }),
    components: {
      PageAuth,
    },
    
  })
</script>
