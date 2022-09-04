<template>
  <TableActivities />
</template>

<script>
  import TaskRegister from "@/components/tasks/TaskRegister.vue"
  import TaskRemove from "@/components/tasks/TaskRemove.vue"
  import TaskReport from "@/components/tasks/TaskReport.vue"
  import TaskDone from "@/components/tasks/TaskDone.vue"
  import SubjectRegister from "@/components/tasks/SubjectRegister.vue"
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
    }
}
</script>
