<template>
    <v-footer padless color="#012A4A">
        {{ authors[1].icon1 }}
        <v-col class="text-center white--text" cols="12">


            <v-tooltip cols="12" sm="12" md="6" top v-for="i in authors" :key="i" class="mx-10 white--text">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text class="white--text" v-bind="attrs" :href="i.link" target="_blank" v-on="on">
                        <v-icon color="white" v-bind="attrs" v-on="on" class="mr-2">
                            {{ i.icon }}
                        </v-icon>{{ i.author }}
                    </v-btn>

                </template>

                <span>{{ i.function }}</span>

            </v-tooltip>

            <p class="mt-4">Copyright {{ new Date().getFullYear() }} - <strong>HomeWorks</strong></p>

            <p>Experimente com um <a class="white--text" href="https://www.mohmal.com/pt/" target="_blank"
                    rel="noopener noreferrer">e-mail temporário!</a></p>

        </v-col>


    </v-footer>
</template>

<script>
export default {
    data: () => ({
        authors: [
            {
                author: 'Paul Pessoa',
                link: 'https://github.com/paulpessoa/home-works',
                icon: 'mdi-github',
                function: 'Front Engineer'
            },
            {
                author: 'Jean de Paula',
                link: 'https://github.com/jeancarlospaula/homeworks',
                icon: 'mdi-github',
                function: 'Backend Developer'
            }
        ],
    }),
}
</script>