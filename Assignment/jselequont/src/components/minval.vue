<template>
    <div v-if="result">
        <h1>Minimum from {{minlist}} is <u>{{statusMsg}}</u></h1>
    </div>    
</template>

<script>
export default {
    name : 'minval',
    props : ['displaymin'],
    data() {
        return {
            result : false,
            statusMsg : "",
            minlist : [2,3,4,5,0]
        }
    },
    watch : {
        displaymin(value,previousvalue) {
            this.result = false;
            if(value) {
                this.result = true;
                this.getMinimum();
            }
        }
    },
    methods : {
        getMinimum() {
            var firstValue =  this.minlist[0];
            for(let count = 1; count < this.minlist.length; count++) {
                if(firstValue >= this.minlist[count]) {
                    firstValue = this.minlist[count]
                }
            }
            this.statusMsg = firstValue;
        }
    }
}
</script>