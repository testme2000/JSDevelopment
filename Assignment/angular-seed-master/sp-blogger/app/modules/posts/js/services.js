'use strict'

angular.module('spBlogger.posts.services',[]).factory('postService', function() {
    return {
        posts: [{
                    id: 1,
                    title: 'Next great thing',
                    content: 'What will be next phase',
                    permalink: 'next thing',
                    author: 'Dadaji',
                    datePublished: '2014-12-24'
            },
            {
                    id: 2,
                    title: 'What will happen',
                    content: 'Future worries',
                    permalink: 'future at work',
                    author: 'JB',
                    datePublished: '2015-12-12'
            },
            {
                    id: 3,
                    title: 'Kids will be alright',
                    content: 'Future worries',
                    permalink: 'future at work',
                    author: 'Bhaisaab',
                    datePublished: '2017-12-12'
            },
            {
                    id: 4,
                    title: 'Money will follow',
                    content: 'Future worries',
                    permalink: 'future at work',
                    author: 'Bhaisaab again',
                    datePublished: '2014-10-12'
            }],
            getAll: function() {
                return posts;
            },
            getPostById: function(id) {
                for(var icount in this.posts) {
                    if(this.posts[icount] === id) {
                        return this.posts[icount];          
                    }
                }
            },
    }
});