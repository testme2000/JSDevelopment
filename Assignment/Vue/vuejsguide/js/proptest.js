
Vue.component('blog',{
    props: ['postrecord'],
    template: `<div><h3>{{postrecord.title}}</h3>
                  <div v-html="postrecord.content"></div>
                 </div>`
})


new Vue({
    el : '#propApp',
    data : {
        bloglist : [
           {id : 1, title: 'Finance Blog', content : '<h1>Finance Blog will give you finance knowledge</h1>'},
           {id : 2, title: 'Travel Blog', content : '<h1>Travel Blog will give you travel knowledge</h1>'},
           {id : 3, title: 'Fashion Blog', content : '<h1>Fashion Blog will give you fashion knowledge</h1>'}
        ]
    }
})