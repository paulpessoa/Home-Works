<template>
  <div>
    <v-card outlined class="mx-auto mt-10 px-8 py-2" max-width="460">
      <v-card-title class="justify-center mb-2">E-mail Confirmation</v-card-title>
      <v-form ref="form">       
        <v-text-field filled type="mail" label="E-mail" required persistent-hint outlined>
        </v-text-field>
       
        <v-btn block x-large type="submit" color="primary" depressed class="justify-center mb-6">Verify</v-btn>
      </v-form>
      
    </v-card>
  </div>

</template>

<script lang="ts">
export default {
  name: 'EmailConfirmation',
}
</script>