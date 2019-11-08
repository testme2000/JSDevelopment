<template>
    <div>
        <div v-if="result">
            <label class="label label-default">Enter Number : </label>
            &nbsp;
            <input type="number" v-model="inputnum" :placeholder="defaulttext"/>
            &nbsp;
            <button class="btn btn-info"  @click="determineOddEven()">Perform Check</button> 
            <div>
                <h1>{{checkresult}}</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'evenodd',
    props : ['displayevenodd'],
    data() {
        return {
            result : false,
            inputnum : '',
            defaulttext : "Enter number",
            checkresult : '',
            numtocheck : 0
        }
    },
    watch: {
        displayevenodd(value,previousvalue) {
            this.result = false;
            if(value) {
                this.result = true;
            }
        }
    },
    methods : {
        performEvenOddCheck() {
            this.checkresult = "Still in process"
            if(this.numtocheck === 1) {
                this.checkresult = "Number is odd";
            }
            else if(this.numtocheck === 0) {
                this.checkresult = "Number is even";
            }
            else {
                this.numtocheck %= 2;
                this.performEvenOddCheck();
            }
        },
        determineOddEven() {
            if(this.inputnum != null) {
                this.numtocheck = Number(this.inputnum);
                if(this.numtocheck < 0) {
                    this.checkresult = "Please enter positive number";
                    this.inputnum = "";
                }
                else {
                    this.performEvenOddCheck();
                }
            }
        }
    }
}
</script>