<template>
  <div class="pa-6">
    <v-card elevation="0" class="mx-auto px-8 py-2" max-width="460">
      <v-card-title class="justify-center my-4">VERIFICAÇÃO DE SEGURANÇA</v-card-title>
      <v-form ref="form" @submit.prevent="emailVerify">
        <v-otp-input type="number" required v-model="otp" length="6">
        </v-otp-input>
        <v-btn block x-large :disabled="otp.length <= 5" type="submit" color="#6557F5" :loading="loading" 
          class="justify-center mb-6 white--text">Verify</v-btn>
      </v-form>
      <v-alert class="mt-7" v-if="emailConfirm" dismissible type="success">
        {{ emailConfirm }}
      </v-alert>
    <p class="text-center">Código enviado para o e-mail cadastrado.</p>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EmailConfirmation",
  data: () => ({
    loading: null,
    emailConfirm: null,
    email: sessionStorage.getItem("userEmail"),
    otp: 0,
  }),
  methods: {
    emailVerify() {
      this.loading = true
      axios.patch('account/confirm', {
        email: this.email,
        confirmationToken: this.otp,
      }).then(response => {
        this.emailConfirm = response.data.message.description
        this.emailConfirm = false;
        this.$router.push({ name: "login", email: sessionStorage.getItem("userEmail")});
      }).catch(error => {
        this.emailConfirm = error.response.data.error.message.description;
        this.loading = false
      });
    },
  },
};
</script>
