Vue.component('breadcrumb', {
    template : `<div>` +
                    `<span v-for="(subfolder, index) in directories">` + 
                        `<a :href="subfolder.path">{{ subfolder.name || 'Home' }} </a>` +
                        `<span v-if="index !== (directories.length - 1)"> >> </span>` + 
                    `</span>` +
                `</div>`,
    computed: {
        directories() {
            console.log("MEKU TEKU");
            console.log(this.activefolder);
            let output = [], 
                slug = '',
                dirpart = this.$store.state.path.split('/');
            for(let subfolder of dirpart) {
                slug += subfolder;
                output.push({
                    'name' : subfolder || 'home',   
                    'path' : '#' + slug
                });
                slug += '/';
            }     
            console.log(output);          
            return output; 
        }
    }
})



Vue.component('directory', {
    template: `<li><strong><a :href="\'#\' + content.path_lower">{{content.name}}</a></strong></li>`,
    props: {
        content: Object
    }
})

Vue.component('file', {
    template: `<li><strong>{{content.name}}</strong><span v-if="content.size"> - {{ performSizeUnit(content.size) }}</span><span v-if="urllink"> - <a :href="urllink">Download</a></span></li>`,
    props: {
        content: Object,
        dbox : Object
    },
    data() {
        return {
            sizeUnit : ['Bytes','KB','MB','GB','TB'],
            urllink : ''
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
    },
    created() {
        this.dbox.filesGetTemporaryLink({
            path: this.content.path_lower
        }).then( data => {
            this.urllink = data.link;
        })
    }
})

Vue.component('dropbox-viewer', {
    template: '#dropbox-viewer-template',
    data() {
        return {
            dropboxToken : 'whehBL42rpAAAAAAAAAAWr435257PB3ZHIwuAdR-xL17Ee5QyRAGiCDfoXSiNOcT',
            holder : {},
            isLoading: true
        }
    },
    computed: {
        solidpath() {
            return this.$store.state.path;
        },
        slug() {
            return this.solidpath.toLowerCase()
                    .replace(/^\/|\/$/g, '')
                    .replace(/ /g,'-')
                    .replace(/\//g,'-')
                    .replace(/[-]+/g, '-')
                    .replace(/[^\w-]+/g,'');        
        }
    },
    methods: {
        dropbox() {
            return new Dropbox.Dropbox({
                accessToken: this.dropboxToken
            });
        },
        createFolderStructure(response) {
            console.log("Testing KUKU");
            const structure = {
                folders: [],
                files: []
            }

            files = response.entries.filter(entry => {
                if(entry['.tag'] === 'file') {
                    return entry;
                }
            });
            structure.files = files;
            folder = response.entries.filter(entry => {
                if(entry['.tag'] === 'folder') {
                    return entry;
                }
            }); 
            structure.folder = folder;    
            this.holder = structure;
            this.isLoading = false;
        },
        createStructureAndSave(response) {
            this.createFolderStructure(response);
            this.$store.commit('structure', {
                path: this.slug,
                data : response
            });
        },
        getFolderStructure() {
            let data = this.$store.state.structure[this.slug];
            if(data) {
                this.createFolderStructure(data);
            }
            else {
                this.dropbox().filesListFolder({
                    path: this.solidpath,
                    include_media_info: true
                })
                .then(this.createStructureAndSave)
                .catch(error => {
                    this.isLoading = 'error';
                    console.log(error);
                });
            }
        },
        performSizeUnit(size) {
            let output = '0 Byte';
            if(size > 0) {
                let finalsize = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
                output = Math.round(size / Math.pow(1024, finalsize), 2) + ' ' + this.sizeUnit[finalsize];
            }
            return output;
        },
        refreshnewdirectory() {
            this.isLoading = true;
            this.getFolderStructure();
        }
    },
    created() {
        this.getFolderStructure();
    },
    watch : {
        solidpath() {
            this.getFolderStructure();
        }
    }
});    

const store = new Vuex.Store({
    state: {
        path : '',
        structure: {}
    },
    mutations: {
        updateHash() {
            let basicpath = window.location.hash.substring(1);
            this.state.path = (basicpath || '');
        },
        structure(state, payload) {
            state.structure[payload.path] = payload.data;
            console.log("Updating payload");
            console.log(state.structure);
        }
    }
});

const app = new Vue({
    el : '#app',
    store,
    created() {
        this.$store.commit('updateHash');
    },
    computed: {
        meku() {
            return this.$store.state.path;
        }
    }
})

window.onhashchange = () => {
    app.$store.commit('updateHash');
}