<template>
  <div class="pa-6">
    <v-card elevation="0" class="mx-auto px-8 py-2" max-width="460">
      <v-card-title class="justify-center my-4">{{ $t('new_register') }}</v-card-title>

      <v-form ref="form" @submit.prevent="createUser">
        <v-text-field v-model="firstName" :rules="nameRules" filled type="text" :label="$t('first_name')" required persistent-hint
          outlined>
        </v-text-field>
        <v-text-field v-model="lastName" filled type="text" :label="$t('last_name')" required persistent-hint outlined>
        </v-text-field>
        <v-text-field v-model="email" :rules="emailRules" filled type="mail" :label="$t('email')" required persistent-hint
          outlined>
        </v-text-field>

        <v-text-field v-model="password" filled :append-icon="showKey1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showKey1 ? 'text' : 'password'" :label="$t('password')" required outlined :rules="passwordRules"
          @click:append="showKey1 = !showKey1"></v-text-field>
        <v-btn block x-large type="submit" class="white--text" color="#6557F5" depressed :loading="loading" :disabled="!firstName || !password || !email">{{$t('register')}}</v-btn>
      </v-form>

      <v-alert class="mt-7" v-if="emailConfirm" dismissible type="success">
        {{ emailConfirm }}
      </v-alert>

     <v-card-actions class="row justify-center py-4">
        <v-btn class="ma-4" color="orange lighten-2" text href="/reset-password">
          {{$t('recover_account')}}
        </v-btn>
        <v-btn class="ma-4" color="orange lighten-2" text href="/login">
          {{$t('login')}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FormRegister",
  data: () => ({
    loading: null,
    showKey1: false,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    nameRules: [(v) => !!v || $t('fill_this_field')],
    emailRules: [(v) => /.+@.+\..+/.test(v) || $t('enter_a_valid_email')],
    passwordRules: [(v) => !!v || $t('enter_a_password')],
    confirmPasswordRules: [(v) => !!v || $t('enter_the_same_as_the_previous_field')],
    emailConfirm: null,
  }),
  methods: {
    createUser() {
      this.loading = true;
      axios
        .post('account/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // ------ ENVIA CONFIRMAÇÂO PARA O E-MAIL ------- //
          axios.post('account/confirm', {
            email: this.email,
          }).then(response => {
            sessionStorage.setItem("userEmail", this.email);
            sessionStorage.setItem("userName", response.data.message.user.firstName);
          }).catch(error => {
            this.response = error
          })
          // ------ ENVIA CONFIRMAÇÂO PARA O E-MAIL ------- //
          this.emailConfirm = response.data.message.description;
          this.emailConfirm = false;
          this.$router.push({
            name: "email-confirmation",
            email: sessionStorage.getItem("userEmail")
          });
        })
        .catch((error) => {
          this.emailConfirm = error.response.data.error.message;
        })
        .finally(() => {
          this.loading = false
        });
      },

  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword
          ? ""
          : "Os senhas estão divergentes";
    },
  },
};
</script>
