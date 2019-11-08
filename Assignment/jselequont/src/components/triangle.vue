<template>
    <div class="main">
        <div v-if="result">
            <div v-for="index in status.length" :key="index">
                <h3 alight=left>{{status.substring(0,index)}}</h3>
            </div> 
        </div>
    </div>
</template>

<script>
export default {
    name: 'triangle',
    props : ['displaytri'],
    data : function() {
        return {
            result : true,
            status : ""
        }
    },
    watch : {
        displaytri(value,previousvalue) {
            this.status = "";
            this.result = false;
            if(value) {
                // Its time to display trianle
                this.status = "#######";
                this.result = true;
            }
        }
    }
}
</script>

<style scoped>
    .main {
        margin : 43px 0 0;
    }
</style>