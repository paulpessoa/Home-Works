<template>
    <v-container>

        <v-card class="my-8" elevation="0">
            <v-card-title>
                <v-toolbar-title class="text-h5">{{ $t("new_task") }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-snackbar color="green" v-model="snackbar">
                    {{ msg }}
                    <template v-slot:action="{ attrs }">
                        <v-btn color="white" href="/" loading text v-bind="attrs" @click="snackbar = false">
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>

                <SubjectRegister />
            </v-card-title>
            <v-container>
                <v-form ref="form" @submit.prevent="createUser">
                    <v-row>
                        <!------------------------------------------------------------------------------------------>
                        <v-col cols="12" sm="6" md="4" lg="5">
                            <v-text-field outlined dense hide-details clearable v-model="editedItem.name"
                                :label="$t('activity_title')">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="3">
                            <v-select outlined dense hide-details v-model="editedItem.subjects" clearable
                                :items="subjectList" item-text="name" item-value="_id" :label="$t('select_subject')">
                                <template v-slot:no-data>
                                    <v-list-item> Cadastre uma disciplina </v-list-item>
                                </template>
                            </v-select>
                        </v-col>



                        <v-col cols="12" sm="6" md="4" lg="2">
                            <v-text-field type="date" outlined dense hide-details v-model="editedItem.date" 
                                :label="$t('delivery_date')"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="2">
                            <v-btn color="#6557F5" class="py-5 white--text" block @click="taskCreate" :disabled="
                                !editedItem.name || !editedItem.subjects || !editedItem.date
                            ">
                                <v-icon small color="orange" class="mr-2">
                                    mdi-file-plus
                                </v-icon>
                                {{ $t("add") }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>

        <v-data-table scrollable :headers="headers" :items="tasks" hide-default-footer :loading="isLoading">


            <template v-slot:[`item.finished`]="{ item }">
                <span class="justify-center">
                    {{ item.finished = false ? "Concluída" : item.finalDate > currentDate ? 'Em dias' : 'Atrasado' }}
                </span>
            </template>

            <template v-slot:[`item.finalDate`]="{ item }">
                <span class="justify-center">
                    {{ new Date(item.finalDate).toISOString().slice(0, 10) }}
                </span>
            </template>



            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title class="text-h5">{{
                            $t("my_tasks")
                    }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="#6557F5" dark class="mb-2">
                        <v-icon small color="orange" class="mr-2"> mdi-file-chart </v-icon>
                        {{ $t("reports") }}
                    </v-btn>
                    <v-dialog v-model="dialog" max-width="80%">
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ $t("edit_task") }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <!------------------------------------------------------------------------------------------>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4" lg="4">
                                            <v-text-field outlined dense hide-details v-model="editedItem.name"
                                                :label="$t('activity_title')"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4" lg="4">
                                            <v-select outlined dense hide-details v-model="editedItem.subject"
                                                :items="subjectList" value="_id" item-text="name"
                                                :label="$t('subjects')">
                                            </v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4" lg="2">
                                            <v-text-field outlined dense hide-details v-model="editedItem.finished" disabled
                                                :label="$t('status')">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4" lg="2">
                                            <v-text-field type="date" outlined dense hide-details
                                                v-model="editedItem.finalDate" :label="$t('delivery_date')">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>


                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red" text @click="close">
                                    {{ $t("cancel") }}
                                </v-btn>
                                <v-btn color="#6557F5" dark @click="save">
                                    {{ $t("save") }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialogDelete" max-width="450px">
                        <v-card>
                            <v-card-title class="body-1 justify-center">
                                {{ $t("msg_delete_task") }}
                            </v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red" text @click="closeDelete">{{
                                        $t("cancel")
                                }}</v-btn>
                                <v-btn color="darken-1" dark @click="deleteItemConfirm">{{
                                        $t("confirm")
                                }}</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <v-row class="justify-center">
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
const URL_TASKS_LIST = "https://homeworks-api.vercel.app/task/list";
const URL_SUBJECT_LIST = "https://homeworks-api.vercel.app/subject/list";
const URL_TASK_CREATE = "https://homeworks-api.vercel.app/task/create";

import SubjectRegister from "./SubjectRegister.vue";

export default {
    name: "TableTask",
    data: () => ({
        msg: null,
        snackbar: null,
        _id: null,
        items: 2,
        statusTask: null,
        currentDate: new Date().toISOString().slice(0, 10),
        dialog: false,
        dialogDelete: false,
        isLoading: false,
        id: null,
        tasks: [],
        subjects: null,
        subjectList: null,
        status: null,
        itemsPerPage: 5,
        editedIndex: -1,
        editedItem: {
            name: "",
            subjects: null,
            status: null,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        },
        defaultItem: {
            name: "",
            subjects: null,
            status: null,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        },
    }),
    components: {
        SubjectRegister,
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    methods: {
        // Lista as disciplinas
        listSubjects() {
            this.isLoading = true;
            axios
                .get(URL_SUBJECT_LIST, {})
                .then((response) => {
                    this.subjectList = response.data;
                })
                .catch((error) => {
                })
                .finally(() => (this.isLoading = false));
        },
        // lista de tarefas da API
        listTasks() {
            this.isLoading = true;
            axios
                .get(URL_TASKS_LIST, {})
                .then((response) => {
                    this.tasks = response.data;
                    console.log('taregasss1', response)
                    this.response = JSON.stringify(response, null, 2);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => (this.isLoading = false));
        },

        // Função adicionar nova disciplina
        taskCreate() {
            axios
                .post(URL_TASK_CREATE, {
                    name: this.editedItem.name,
                    subject: this.editedItem.subjects,
                    finalDate: this.editedItem.date
                })
                .then((response) => {
                    this.msg = response.data.message
                    this.snackbar = true
                    this.subjects = response;
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    this.editedItem.name = ''
                    this.editedItem.subjects = ''
                    this.editedItem.date = ''
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000);
                });
        },
        editItem(item) {
            this.editedIndex = this.tasks.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            this.editedIndex = this.tasks.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.tasks.splice(this.editedIndex, 1);
            this.closeDelete();
            this.close();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.tasks[this.editedIndex], this.editedItem);
            } else {
                this.tasks.push(this.editedItem);
            }
            this.close();
        },
    },
    created() {
        this.listTasks();
        this.listSubjects();
    },

    computed: {
        //HEADERS TRanslated
        headers() {
            return [
                {
                    text: this.$t("activity_title"),
                    align: "start",
                    value: "name",
                },
                {
                    text: this.$t("subjects"),
                    align: "center",
                    value: "subject.name",
                },
                {
                    text: this.$t("status"),
                    align: "center",
                    value: "finished",
                },
                {
                    text: this.$t("delivery_date"),
                    align: "center",
                    value: "finalDate",
                },
                {
                    text: this.$t("actions"),
                    align: "center",
                    value: "actions",
                    sortable: false,
                },
            ];
        },
    },
};
</script>