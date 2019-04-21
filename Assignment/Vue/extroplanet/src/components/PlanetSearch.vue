<template>
    <div>
        <h1 v-show=status>Searching for planet like earth</h1>
        <h2>{{searchresult}}</h2>
    </div>    
</template>

<script>
import { setTimeout } from 'timers';
import { resolve } from 'dns';
import { Promise } from 'q';

    export default {
        name : 'ExtraPlanet',
        data : function() {
            return {
                status : true,
                searchresult : ''
            }
        },
        mounted : function() {
            setTimeout(function() {
                this.startSearch();
            }.bind(this),2000);
        },
        methods : {
            startSearch : function() {
                this.status = false;
                this.searchresult = 'Trying to find something, please wait..................';
                /*
                // Search the planet now
                getplanet('http://udacity.github.io/exoplanet-explorer/site/app/data/earth-like-results.json')
                .then(function(response) {
                    this.searchresult = response.statusText;
                })
                .catch(function(reject) {
                    this.searchresult = response.statusText;
                });
                */
            },
            getplanet : function(url) {
                /*
                return new Promise(function(resolve,reject) {
                    var request = new XMLHttpRequest();

                    request.open('GET',url);
                    request.onload = function() {
                        if(request.status === 200) {
                            resolve(request.response);
                        }
                        else {
                            reject(Error(request.statusText));
                        }
                    };
                    request.onerror = function() {
                        reject("Network Error");
                    }
                    request.send();
                });
                */
               var tst = url;
            }
        } 
    }


</script>