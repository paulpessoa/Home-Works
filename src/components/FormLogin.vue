<template>
 <div class="pa-6">
    <v-card elevation="0" class="mx-auto px-8 py-2" max-width="460">
      <v-card-title class="justify-center my-4">{{$t('access')}}</v-card-title>
      <v-form @submit.prevent="userLogin">
        <v-text-field v-model="email" filled type="mail" :label="$t('email')" :rules="emailRules" required persistent-hint outlined>
        </v-text-field>
        <v-text-field v-model="password" filled :append-icon="showKey ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" 
          :type="showKey ? 'text' : 'password'" :label="$t('password')" required persistent-hint outlined
          @click:append="showKey = !showKey">
        </v-text-field>
        <v-btn block x-large type="submit" color="#6557F5"  depressed :disabled="!email || !password" class="justify-center white--text" :loading="loading">{{$t('login')}}
        </v-btn>
      </v-form>
      <v-alert class="mt-7" v-if="msg" dismissible type="success">
        {{ msg }}
      </v-alert>
      <v-card-actions class="row justify-center py-4">
        <v-btn class="ma-4" color="orange lighten-2" text to="/reset-password">{{$t('recover_account')}} </v-btn>
        <v-btn class="ma-4" color="orange lighten-2" text to="/register">{{$t('register')}} </v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>



<script>
import axios from "axios";

export default {
  name: "FormLogin",
  data: () => ({
    accessToken: sessionStorage.getItem("accessToken"),
    loading: false,
    showKey: false,
    password: null,
    email: sessionStorage.getItem("userEmail"),
    emailRules: [
        v => !!v ,
      ],
    passwordRules: [
        v => !!v,
      ],
    msg: null
  }),
  created() {
      if (this.accessToken) {
        this.$router.push('/');
      }
    },
  methods: {
    userLogin() {
      this.loading = true;
      axios.post('account/login', {
        email: this.email,
        password: this.password,
      }).then(response => {
        sessionStorage.setItem("userEmail", this.email)
        sessionStorage.setItem("accessToken", response.data.accessToken)
        this.msg = "You are authenticated!" 
      }).catch(error => {
        this.msg = error.response.data.error.message.description;
      })
      .finally(() => {
          location.reload()
          this.loading = false,
          this.msg = false
        });
    },
  },
}
</script>
