<template>
  <v-app>
    <AppHeader />
    <v-main style="background: #f0f0f0">

      <div class="text-center mt-10" v-if="!accessToken">
        <a href="/" class="mr-4" style="text-decoration: none">
          <img class="ml-4" width="36px" src="./assets/logo.png" alt="Home Works Logo" />
        </a>
        <a href="/" style="text-decoration: none">
          <img width="250px" class="mt-1" src="./assets/homeworks-logo-text-bg.png" alt="Home Works Logo" />
        </a>
      </div>

      <router-view />
      <p class="text-center mt-10" v-if="!accessToken">{{ $t('try_it_with_a') }}<a style="text-decoration:none"
          href="https://www.mohmal.com/pt/" target="_blank" rel="noopener noreferrer">{{ $t('temporary_email') }}</a></p>
    </v-main>
    <AppFooter v-if="accessToken" />

  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    accessToken: sessionStorage.getItem("accessToken"),
  }),
  components: {
    AppHeader,
    AppFooter
  },
  created() {
      if (!this.accessToken) {
        this.$router.push("/login");
      } else {
        this.$router.push("/");
      }
    },
});
</script>
