<template>
  <div class="pa-6">
    <v-card elevation="0" class="mx-auto px-8 py-2" max-width="460">
      <v-card-title class="justify-center my-4">{{$t('recover_account')}}</v-card-title>
      <v-form ref="form" @submit.prevent="resetPassword">
        <v-text-field v-model="email" filled type="mail" :label="$t('email')" required persistent-hint outlined>
        </v-text-field>

        <v-btn block x-large type="submit" :loading="loading" color="#6557F5" depressed
          class="justify-center white--text">{{$t('recover')}}</v-btn>
      </v-form>

      <v-alert class="mt-7" v-if="emailConfirm" dismissible type="success">
        {{ emailConfirm }}
      </v-alert>

      <v-card-actions class="row justify-center py-4">
        <v-btn class="ma-4" color="orange lighten-2" text to="/register"> {{$t('register')}} </v-btn>
        <v-btn class="ma-4" color="orange lighten-2" text href="/login"> {{$t('login')}}</v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: 'ResetPassword',
  data: () => ({
    email: sessionStorage.getItem("userEmail"),
    emailConfirm: null,
    loading:null,
  }),
   methods: {
    resetPassword() {
      this.loading = true
      axios.post('reset/password', {
        email: this.email,
        password: this.password,
      }).then(response => {
        this.emailConfirm = response.data.message.description
        this.emailConfirm = false
        this.$router.push("/login");
      }).catch(error => {
        this.emailConfirm = error.response.data.error.message.description
      })
      .finally(() => {
        this.loading = false
      })
    },
  },
}
</script>
