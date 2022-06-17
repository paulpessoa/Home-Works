<template>
  <div>
    <v-card outlined class="mx-auto mt-10 px-8 py-2" max-width="460">
      <v-card-title class="justify-center mb-2">Register</v-card-title>
      <v-form ref="form">
        <v-text-field filled type="text" label="Name" required persistent-hint outlined></v-text-field>
        <v-text-field filled type="mail" label="E-mail" required persistent-hint outlined>
        </v-text-field>
        <v-text-field filled :append-icon="showKey1 ? 'mdi-eye' : 'mdi-eye-off'" :type="showKey1 ? 'text' : 'password'"
          label="New Password" required outlined @click:append="showKey1 = !showKey1">
        </v-text-field>
        <v-text-field filled :append-icon="showKey2 ? 'mdi-eye' : 'mdi-eye-off'" :type="showKey2 ? 'text' : 'password'"
          label="Password Confirm" required persistent-hint outlined @click:append="showKey2 = !showKey2">
        </v-text-field>
        <v-btn block x-large type="submit" color="primary" depressed class="justify-center">Register</v-btn>
      </v-form>
      <v-card-actions class="text-xs-center py-4">
        <v-btn block x-large color="orange lighten-2" text href="/login"> login </v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script lang="ts">
export default {
  name: 'FormRegister',
  data: () => ({
    showKey1: false,
    showKey2: false,
  }),
}
</script>
