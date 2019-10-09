
const ListCategories = {
    name : 'ListCategories',
    template: `<div v-if="groupitem">
                    <ul>
                        <li v-for="record in groupitem">
                            <router-link :to="{name: 'Category', params: {slug: record.handle}}">{{record.heading}} ({{record.warehouseinventory.length}})</router-link>
                        </li>
                    </ul>
              </div>`,

    computed: {
        groupitem() {
            return this.$store.state.group;
        }
    }
}
