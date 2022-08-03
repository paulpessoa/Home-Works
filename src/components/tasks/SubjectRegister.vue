<template>
  <v-dialog v-model="dialogSubject" max-width="350px">

    <template v-slot:activator="{ on, attrs }">
      <v-btn color="#6557F5" outlined class="mb-2" v-bind="attrs" v-on="on">
        <v-icon small color="orange" class="mr-2">
          mdi-card-plus
        </v-icon>
        {{$t('subjects')}}
      </v-btn>
    </template>

    <v-card class="py-4">
    <v-card-title>{{$t('manage_subjects')}}</v-card-title>
      <v-card-text class="pa-4">
        <v-row>
          <v-col cols="12" sm="12" md="12" lg="12">
            <v-alert class="mb-4 white--text text-center" color="green">{{msg}}</v-alert>
            <v-text-field outlined v-model="subjects" dense hide-details :label="$t('new_subject')"></v-text-field>
          </v-col>
        </v-row>

      </v-card-text>

      <v-card-actions>
        <v-btn icon color="red" :loading="isLoading">
              <v-icon>mdi-delete-empty</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="dialogSubject = false">
          {{$t('cancel')}}
        </v-btn>
        <v-btn color="#6557F5" dark @click="subjectCreate" :loading="isLoading">
          {{$t('save')}}
        </v-btn>
      </v-card-actions>

      <ul id="example-1">
  <li v-for="subject in abacaxi" :key="subject._id">
    {{ subject.name }}
  </li>
</ul>

    </v-card>
  </v-dialog>


</template>

<script>
import axios from "axios";
const URL_SUBJECT_CREATE = 'https://homeworks-api.vercel.app/subject/create'

export default {
  name: 'SubjectRegister',
  data() {
    return {
      msg: '',
      dialogSubject: false,
      subjects: [],
      subjectList: null,
      abacaxi: [],
      isLoading: false
    }
  },
  watch: {
    dialogSubject(val) {
      val || this.close()
    },
  },

  methods: {

    // Função adicionar nova disciplina
    subjectCreate() {
      this.isLoading = true
      axios.post(URL_SUBJECT_CREATE, {
        name: this.subjects
      }).then(response => {
        this.subjects = response
        console.log(response)
        this.msg = response.data.message
        
        setInterval(() => {
          this.dialogSubject = false
        }, 1500);
        this.subjects = null
       window.location.reload()
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.isLoading = false
        console.log("finally call")
      }) 
    }

  }
}
</script>