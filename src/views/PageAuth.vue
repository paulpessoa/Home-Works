<template>
  <div class="pageauth">
    <h1>This is an Auth page</h1>
    <router-view />
  </div>
</template>


<script lang="ts">
import FormLogin from "@/components/FormLogin.vue"
import FormRegister from "@/components/FormRegister.vue"
import EmailConfirmation from '@/components/EmailConfirmation.vue'
import RecoveryPassword from "@/components/RecoveryPassword.vue"
import NewPassword from '@/components/NewPassword.vue'


  export default {
    name: 'PageAuth',
      data: () => ({
      userTocken: null,
    }),
    components: {
      FormLogin,
      FormRegister,
      EmailConfirmation,
      RecoveryPassword,
      NewPassword
    },
  }

</script>
