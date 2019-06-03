Vue.component('directory', {
    template: `<li><strong><a @click.prevent="navigate()" :href="content.path_lower">{{content.name}}</a></strong></li>`,
    props: {
        content: Object
    },
    methods: {
        navigate() {
            this.$emit('userclickfolder', this.content.path_lower)
        }
    }
})

Vue.component('file', {
    template: `<li><strong>{{content.name}}</strong><span v-if="content.size"> - {{ performSizeUnit(content.size) }}</span></li>`,
    props: {
        content: Object
    },
    data() {
        return {
            sizeUnit : ['Bytes','KB','MB','GB','TB']
        }
    },
    methods : {
        performSizeUnit(size) {
            let output = '0 Byte';
            if(size > 0) {
                let finalsize = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
                output = Math.round(size / Math.pow(1024, finalsize), 2) + ' ' + this.sizeUnit[finalsize];
            }
            return output;
        },

 
    }
})

Vue.component('dropbox-viewer', {
    template: '#dropbox-viewer-template',
    data() {
        return {
            dropboxToken : 'whehBL42rpAAAAAAAAAAWr435257PB3ZHIwuAdR-xL17Ee5QyRAGiCDfoXSiNOcT',
            holder : {
                files: [],
                folder: []
            },
            //holder: [],
            sizeUnit : ['Bytes','KB','MB','GB','TB'],
            isLoading: true
        }
    },
    methods: {
        dropbox() {
            return new Dropbox.Dropbox({
                accessToken: this.dropboxToken
            });
        },
        getFolderStructure(path) {
            this.dropbox().filesListFolder({
                    path: path,
                    include_media_info: true
                })
                .then(response => {
                    files = response.entries.filter(entry => {
                        if(entry['.tag'] === 'file') {
                            return entry;
                        }
                    });
                    folder = response.entries.filter(entry => {
                        if(entry['.tag'] === 'folder') {
                            return entry;
                        }
                    }); 
                    this.holder.files = files;
                    this.holder.folder = folder;
                    this.isLoading = false;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        performSizeUnit(size) {
            let output = '0 Byte';
            if(size > 0) {
                let finalsize = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
                output = Math.round(size / Math.pow(1024, finalsize), 2) + ' ' + this.sizeUnit[finalsize];
            }
            return output;
        },
        refreshnewdirectory(path) {
            this.getFolderStructure(path);
        }
    },
    created() {
        this.getFolderStructure('');
    }
});    

new Vue({
    el : '#app'
})