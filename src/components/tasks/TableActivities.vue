<template>
    <v-container>
        <v-card class="my-8" elevation="0">
            <v-card-title>
                <v-toolbar-title class="text-h5">{{ $t('new_task') }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <SubjectRegister />
            </v-card-title>
            <v-container>
                <v-form ref="form" @submit.prevent="createUser">
                    <v-row>
                        <v-col cols="12" sm="6" md="4" lg="4">
                            <v-text-field outlined dense hide-details clearable v-model="editedItem.name"
                                :label="$t('activity_title')">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="3">
                            <v-select outlined dense hide-details v-model="editedItem.subjects" clearable
                                :items="subjectList" item-text="name" :label="$t('select_subject')">

                                <template v-slot:no-data>
                                    <v-list-item>
                                        Cadastre uma disciplina
                                    </v-list-item>
                                </template>

                            </v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4" lg="3">
                            <v-text-field type="date" outlined dense clearable hide-details v-model="editedItem.date"
                                :label="$t('delivery_date')"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="2">
                            <v-btn color="#6557F5" class="py-5 white--text" block @click="save"
                                :disabled="!editedItem.name || !editedItem.subjects || !editedItem.date">
                                <v-icon small color="orange" class="mr-2">
                                    mdi-file-plus
                                </v-icon>
                                {{ $t('add') }}
                            </v-btn>
                        </v-col>

                    </v-row>
                </v-form>
            </v-container>

        </v-card>

        <v-data-table :headers="headers" :items="tasks" :items-per-page="itemsPerPage" sort-by="name"
            hide-default-footer class="rounded" :loading="isLoading" loading-text="Loading... Please wait">
            <!--
            <template v-slot:[`item.check`]="{ item }">
            
                <v-simple-checkbox v-model="item.check"></v-simple-checkbox>
            
            </template>
-->


            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title class="text-h5">Minhas Atividades</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="#6557F5" dark class="mb-2">
                        <v-icon small color="orange" class="mr-2">
                            mdi-file-chart
                        </v-icon>
                        Gerar Relatório
                    </v-btn>
                    <v-dialog v-model="dialog" max-width="80%">

                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4" lg="6">
                                            <v-text-field outlined dense hide-details v-model="editedItem.name"
                                                :label="$t('activity_title')"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4" lg="4">
                                            <v-select outlined dense hide-details v-model="editedItem.subjects"
                                                :items="subjectList" item-text="name" :label="$t('subjects')">
                                            </v-select>
                                        </v-col>

                                        <v-col cols="12" sm="6" md="4" lg="2">
                                            <v-text-field type="date" outlined dense hide-details
                                                v-model="editedItem.date" :label="$t('delivery_date')"></v-text-field>
                                        </v-col>

                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red" text @click="close">
                                    {{ $t('cancel') }}
                                </v-btn>
                                <v-btn color="#6557F5" dark @click="save">
                                    {{ $t('save') }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialogDelete" max-width="400px">
                        <v-card>
                            <v-card-title class="body-1 justify-center">Are you sure you want to delete this item?
                            </v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="darken-1" dark @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <v-row>
                    <v-icon small color="orange" class="mr-2" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small color="red" class="mr-2" @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </v-row>

            </template>

        </v-data-table>
    </v-container>
</template>






<script>
import axios from "axios";
const URL_TASKS = 'tasks'
const URL_SUBJECTS = 'subjects'

import SubjectRegister from "./SubjectRegister.vue";

export default {
    name: 'TableTask',
    data: () => ({
        items: "",
        date: new Date(),
        dialog: false,
        dialogDelete: false,
        isLoading: false,
        headers: [
            //  { text: '', align: 'center', value: 'check' },
            { text: 'Atividade', align: 'start', value: 'name' },
            { text: 'Disciplina', align: 'center', value: 'subjects' },
            { text: 'Situação', align: 'center', value: 'status' },
            { text: 'Data de Entrega', align: 'center', value: 'date' },
            { text: 'Ações', align: 'left', value: 'actions', sortable: false },
        ],
        tasks: [
            {
                "check": true,
                "name": "A Redação",
                "subjects": "Português",
                "status": "Planejado",
                "date": "2022-05-06"
            },
            {
                "check": false,
                "name": "B Redação",
                "subjects": "Português",
                "status": "Agendado",
                "date": "05-10-2022"
            },
            {
                "check": null,
                "name": "G Redação",
                "subjects": "Português",
                "status": "Atrasado",
                "date": "2022-05-06"
            }
        ],
        subjects: [
            {
                "name": "Matematica",
                "id": 1
            },
            {
                "name": "Português",
                "id": 2
            }],
        subjectList: [],
        status: ['Finalizado', 'Atrasado', 'Em andamento', 'Adiantado', 'Agendado'],
        itemsPerPage: 5,
        editedIndex: -1,
        editedItem: {
            name: '',
            subjects: null,
            status: null,
            date: null
        },
        defaultItem: {
            name: '',
            subjects: null,
            status: null,
            date: null
        },
    }),
    components: {
        SubjectRegister
    },
    computed: {
        currentStatus() {
            if (date <= 100) {
                this.date = "Finalizado"
            }
            else if (task.check = true) {
                this.date = "EM dia"
            }
            else {
                this.date = "Atrasado"
            }
        },
        formTitle() {
            return this.editedIndex === -1 ? 'Nova Atividade' : 'Editar Atividade'
        },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
    methods: {
        listSubjects() {
            this.isLoading = true
            axios.get(URL_SUBJECTS, {
            }).then(response => {
                this.subjectList = response.data
                //console.log("LISTOU", response);
            }).catch(error => {
                //                console.log("DEU ERRADO", error)
            }).finally(() => (this.isLoading = false))
        },
        // Função consumir (GET) lista de tarefas da API
        getListTasks() {
            this.isLoading = true
            axios.get(URL_TASKS, {
            }).then(response => {
                this.tasks = response.data
                //console.log("DEU CERTO", response);
                this.response = JSON.stringify(response, null, 2)
            }).catch(error => {
                console.log("DEU ERRADO", error)
            }).finally(() => (this.isLoading = false))
        },

        editItem(item) {
            this.editedIndex = this.tasks.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.tasks.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.tasks.splice(this.editedIndex, 1)
            this.closeDelete()
            this.close()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.tasks[this.editedIndex], this.editedItem)
            } else {
                this.tasks.push(this.editedItem)
            }
            this.close()
        },
    },
    created() {
        this.getListTasks()
        this.listSubjects()
    },
}
</script>