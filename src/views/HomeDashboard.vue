<template>
  <div>
  <div v-if="accessToken">
      <TableActivities/>      
    <div v-if="null">
      <p> cadastrar atividade </p>
      <TaskRegister/>
      <p> minhas atividades</p>
      <TaskRemove/>
      <TaskReport/>
      <TaskDone/>
      <SubjectRegister/>

    </div>      

  </div>
  
  <FormLogin v-else-if="!accessToken"/>
  

  </div>

</template>

<script lang="ts">
  
  
  import Vue from 'vue'
  import TaskRegister from "@/components/tasks/TaskRegister.vue"
  import TaskRemove from "@/components/tasks/TaskRemove.vue"
  import TaskReport from "@/components/tasks/TaskReport.vue"
  import TaskDone from "@/components/tasks/TaskDone.vue"
  import SubjectRegister from "@/components/tasks/SubjectRegister.vue"
  import FormLogin from "@/components/FormLogin.vue"
  import TableActivities from "@/components/tasks/TableActivities.vue"

  export default {
    name: 'HomeDashboard',
    data: () => ({
      accessToken: sessionStorage.getItem("accessToken"),
    }),
  
    components: {
      TableActivities,
      TaskRegister,
      TaskRemove,
      TaskReport,
      TaskDone,
      SubjectRegister,
      FormLogin
    },    
  }
</script>
