const CategoryPage = {
    name: 'CategoryPage',
    template: `<div>
                    <div v-if="specialgroup">
                    </div>
                    <page-not-found v-if="specialgroupNotFound"></page-not-found>
                </div>`,
    components: {
        PageNotFound
    },
    props: {
        slug: String
    },
    data() {
        return {
            specialgroupNotFound : false,
        }
    },
    computed: {
        specialgroup() {

        }
    }
};