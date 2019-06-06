Vue.component('breadcrumb', {
    template : `<div>` +
                    `<span v-for="(subfolder, index) in directories">` + 
                        `<a @click.prevent="navigate(subfolder)" :href="subfolder.path">{{ subfolder.name || 'Home' }} </a>` +
                        `<span v-if="index !== (directories.length - 1)"> >> </span>` + 
                    `</span>` +
                `</div>`,
    props : {
        activefolder : String
    },
    computed: {
        directories() {
            console.log("Inside directories");
            console.log(this.activefolder);
            let output = [], 
                slug = '',
                dirpart = this.activefolder.split('/');
            for(let subfolder of dirpart) {
                slug += subfolder;
                output.push({
                    'name' : subfolder, 
                    'path' : slug
                });
                slug += '/';
            }     
            console.log(output);          
            return output; 
        }
    },
    methods: {
        navigate(folder) {
            this.$emit('userclickfolder', folder.path);
        }
    }
})



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
            isLoading: true,
            path : ''
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
                    const holder = {
                        files : [],
                        folder : []
                    }
                    files = response.entries.filter(entry => {
                        if(entry['.tag'] === 'file') {
                            return entry;
                        }
                    });
                    holder.files = files;
                    folder = response.entries.filter(entry => {
                        if(entry['.tag'] === 'folder') {
                            return entry;
                        }
                    }); 
                    holder.folder = folder;    
                    this.holder = holder;
                    this.isLoading = false;
                    this.path = path;
                    console.log("test" + this.path);
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