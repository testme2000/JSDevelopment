<template>
    <div class="main">
        <div v-if="result">
            <div v-for="(record,index) in gridPattern" :key="index">
                <h3>{{record}}</h3>
            </div> 
        </div>
    </div>
</template>
<script>
export default {
    name : 'Flexgrid',
    props: ['displaygrid'],
    data() {
        return {
            result : false,
            size : 20,
            gridPattern : []
        }
    },
    watch : {
        displaygrid(value,previousvalue) {
            this.result = false;
            if(value) {
                this.result = true;
                this.prepareGrid();
            }
        }
    },
    methods : {
        prepareGrid()
        {
            if(this.gridPattern.length != 0) {
                // Clear the current pattern and generate new one
                this.gridPattern.splice(0,this.gridPattern.length);
            }
            // Add first patter
            var evenresult = "-#-#-#-#-";
            var oddresult = "#-#-#-#-";

            for(var count = 0;count < this.size;count++) {
                let result = oddresult;
                if(this.oddOrEven(count) == "even") {
                    result = evenresult;
                }
                this.gridPattern.push(result);
            } 
        },

        oddOrEven(value) 
        {
            var result = "odd";
            if(value %2 == 0) {
                result = "even";
            }
            return result;
        }
    }

}
</script>