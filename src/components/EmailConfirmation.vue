<template>
  <div class="pa-6">
    <v-card elevation="0" class="mx-auto px-8 py-2" max-width="460">
      <v-card-title class="justify-center my-4">{{$t('security_verification')}}</v-card-title>
      <v-form ref="form" @submit.prevent="emailVerify">
        <v-otp-input type="number" required v-model="otp" length="6">
        </v-otp-input>
      </v-form>
      <v-alert class="mt-7" v-if="emailConfirm" dismissible type="success">
        {{ emailConfirm }}
      </v-alert>
      <v-progress-linear class="my-4" color="#6557F5" v-if="loading" indeterminate rounded height="6">
      </v-progress-linear>
      <p class="text-center">{{$t('code_sent_to_email')}}</p>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EmailConfirmation",
  data: () => ({
    loading: false,
    emailConfirm: null,
    otp: 0,
  }),
  watch:{
    otp: function(val){
      if(val.length >= 6){
        this.emailVerify();
      }
    }
  },
  methods: {
    emailVerify() {
      this.loading = true
      axios.patch('account/confirm', {
        email: sessionStorage.getItem("userEmail"),
        confirmationToken: this.otp,
      }).then(response => {
        this.emailConfirm = response.data.message
        console.log(this.emailConfirm)
        setTimeout(() => {
          this.$router.push('/')
          this.loading = false
          this.emailConfirm = null
        }, 2000)
      }).catch(error => {
        this.loading = false
        this.emailConfirm = error.response.data.error.message;
        this.emailConfirm === 'Account already confirmed.' ? this.$router.push('/') : null
      });
    },
  },
};
</script>
