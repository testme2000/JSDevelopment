<template>
    <div>
        <h1 v-show=status>Searching for planet like earth</h1>
        <h2>{{searchresult}}</h2>
    </div>    
</template>

<script>
import { setTimeout } from 'timers';
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
            }
        } 
    }


</script>