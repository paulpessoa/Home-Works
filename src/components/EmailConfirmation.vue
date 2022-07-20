<template>
  <div>
    <v-card outlined class="mx-auto mt-10 px-8 py-2" max-width="460">
      <v-card-title class="justify-center my-4">VERIFICAÇÃO DE SEGURANÇA</v-card-title>
      <v-form ref="form" @submit.prevent="emailVerify">

        <v-otp-input type="number" required v-model="otp" label="E-mail" length="6">
        </v-otp-input>
        <v-btn block x-large :disabled="otp.length <= 5" type="submit" color="#012A4A" :loading="isLoading" depressed
          class="justify-center mb-6 white--text">Verify</v-btn>
      </v-form>
<v-btn text block href="mailto:" x-large color="orange lighten-2"  target="blank" class="mb-4">Abrir caixa de e-mail</v-btn>


      <v-alert class="mt-7" v-if="emailConfirm" dismissible type="success">
        {{ emailConfirm }}
      </v-alert>

    </v-card>
  </div>

</template>

<script>
import axios from "axios";
const urlConfirm = "https://homeworks-api.vercel.app/account/confirm";

export default {
  name: 'EmailConfirmation',
  data: () => ({
    isLoading: false,
    email: sessionStorage.getItem("userEmail"),
    emailConfirm: null,
    otp: [],

  }),
  methods: {
    emailVerify() {
      axios.post(urlConfirm, {
        email: this.email,
        password: this.password,
      }).then(response => {
        this.isLoading = true
        console.log("DEU CERTO", response);
        this.emailConfirm = response.data.message.description
        setTimeout(() => {
          this.emailConfirm = false
          this.$router.push({ name: 'home' });
        }, 3000);

        clearTimeout(setTimeout)

        this.response = JSON.stringify(response, null, 2)
      }).catch(error => {
        this.response = 'Error: ' + error.response.status
        console.log("DEU ERRADO", response);
      })
    },
  },
}
</script>