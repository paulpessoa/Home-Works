<template>
  <v-app>
    <AppHeader />
    <v-main style="background: #f0f0f0">
      <p class="text-center mt-10" v-if="!accessToken">{{$t('try_it_with_a')}}<a style="text-decoration:none"
          href="https://www.mohmal.com/pt/" target="_blank" rel="noopener noreferrer">{{$t('temporary_email')}}</a></p>
      <router-view />
    </v-main>
    <AppFooter />

  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";


export default Vue.extend({
  name: "App",
  data: () => ({
    //
    accessToken: sessionStorage.getItem("accessToken"),
  }),
  components: {
    AppHeader,
    AppFooter
  }
});
</script>
