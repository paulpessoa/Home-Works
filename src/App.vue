<template>
  <v-app>
    <AppHeader />
    <v-main style="background: #f0f0f0">

      <a v-if="!accessToken" href="/" style="text-decoration: none; color: #012a4a">
        <h1 class="text-center mt-10" href="/" text> Home-Works </h1>
      </a>

      <p class="text-center" v-if="!accessToken">Experimente com um <a style="text-decoration:none"
          href="https://www.mohmal.com/pt/" target="_blank" rel="noopener noreferrer">e-mail temporário!</a></p>
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
