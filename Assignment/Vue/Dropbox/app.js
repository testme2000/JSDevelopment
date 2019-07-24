Vue.component('breadcrumb', {
    template : `<div>` +
                    `<span v-for="(subfolder, index) in directories">` + 
                        `<a :href="subfolder.path">{{ subfolder.name || 'Home' }} </a>` +
                        `<span v-if="index !== (directories.length - 1)"> >> </span>` + 
                    `</span>` +
                `</div>`,
    computed: {
        directories() {
            console.log("MEKU TEKU inside breadcrumb");
            console.log(this.$store.state.breadcrumb);
            return this.$store.state.breadcrumb;
        }
    }
})



Vue.component('directory', {
    template: `<li><strong><a :href="\'#\' + content.path_lower">{{content.name}}</a></strong></li>`,
    props: {
        content: Object,
        bufferfn: Function
    },
    created() {
        this.bufferfn(this.content.path_lower);
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
        getFolderStructure(path) {
            let finalfolder;
            const slug = this.generateSlug(path),
               data = this.$store.state.structure[slug];
            console.log(`Query arrived for ${path}`)


            if(data) {
                finalfolder = Promise.resolve(data);
            }
            else {
                finalfolder = this.dropbox().filesListFolder({
                    path: path,
                    include_media_info: true
                })
                .then(response => {
                    let entries = response.entries;
                    this.$store.commit('structure', {
                        path : slug,
                        data : entries 
                    });
                    console.log(`Response for query  ${entries}`)
                    return entries;
                })
                .catch(error => {
                    this.isLoading = 'error';
                    console.log('Meku failed');
                });
            }

            return finalfolder;
        },
        generateSlug(path) {
            return path.toLowerCase()
                .replace(/^\/|\/$/g, '')
                .replace(/ /g,'-')
                .replace(/\//g,'-')
                .replace(/[-]+/g, '-')
                .replace(/[^\w-]+/g,'');        
        },
        displayFolderStructure() {
            this.isLoading = true;

            const structure = {
                folders: [],
                files: []
            }
            this.getFolderStructure(this.solidpath).then(data => {
                    for ( let entry of data) {
                        if(entry['.tag'] == 'folder') {
                            structure.folders.push(entry);
                            console.log('Folder added');
                        }
                        else {
                            structure.files.push(entry);
                        }
                    }
                    this.holder = structure;
                    this.isLoading = false;
            });
        },
        cacheParentFolders() {
            let parents = this.$store.state.breadcrumb;
            parents.reverse().shift();
    
            for(let grandparent of parents) {
                console.log("Inside Dropbox");
                console.log(grandparent.path);
                this.getFolderStructure(grandparent.path);
            }
        }
    },
    created() {
        this.displayFolderStructure();
        this.cacheParentFolders();
    },
    watch: {
        solidpath() {
            this.displayFolderStructure();
        }
    }    
});    

const store = new Vuex.Store({
    state: {
        path : '',
        structure: {},
        breadcrumb: []
    },
    mutations: {
        updateHash() {
            let basicpath = (window.location.hash.substring(1) || '');
            breadcrumb = [], 
            slug = '',
            dirpart = basicpath.split('/');
            for(let subfolder of dirpart) {
                slug += subfolder;
                breadcrumb.push({'name' : subfolder || 'home','path' : slug});
                slug += '/';
            }     
            console.log("Inside Vue Store");
            console.log(breadcrumb);          
            this.state.breadcrumb = breadcrumb;
            this.state.path = basicpath; 
        },
        structure(state, payload) {
            state.structure[payload.path] = payload.data;
        }
    }
});

const app = new Vue({
    el : '#app',
    store,
    mounted() {
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