<template>
  <div>
    <v-card outlined class="mx-auto mt-10 px-8 py-2" max-width="460">
      <v-card-title class="justify-center mb-2">Confirme o seu e-mail</v-card-title>
      <v-form ref="form" @submit.prevent="emailVerify">       
        <v-text-field v-model="email" filled type="mail" label="E-mail" required persistent-hint outlined>
        </v-text-field>
       <v-otp-input
  length="6"
></v-otp-input>
Ainda não configuramos o OTP
        <v-btn block x-large type="submit" color="#012A4A" :loading="isLoading" depressed class="justify-center mb-6 white--text">Verify</v-btn>
      </v-form>
      
       <v-alert class="mt-7" v-if="emailConfirm" dismissible  type="success">
          {{ emailConfirm }}
      </v-alert>

    </v-card>
  </div>

</template>

<script>
import axios from "axios";
const url = "https://homeworks-api.vercel.app/account/confirm";

export default {
  name: 'EmailConfirmation',
  data: () => ({
    isLoading: false,
    email: sessionStorage.getItem("userEmail"),
    emailConfirm: null

  }),
   methods: {
    emailVerify() {
      this.isLoading = true
      axios.post(url, {
        email: this.email,
        password: this.password,
      }).then(response => {
        console.log("DEU CERTO", response);
          this.emailConfirm = response.data.message.description
        setTimeout(() => {
          this.emailConfirm = false
        }, 5000);

          clearTimeout(setTimeout)
        this.$router.push({ name: 'home' });

        this.response = JSON.stringify(response, null, 2)
      }).catch(error => {
        this.response = 'Error: ' + error.response.status
        console.log("DEU ERRADO", response); 
      })
    },
  },
}
</script>