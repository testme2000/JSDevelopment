<template>
    <div v-if="result">
        <p>
            <span v-for="n in 100" :key="n">
                <b> {{calculate(n)}} </b>
                <i>{{specialbuzz(n)}}</i>
                <p v-if="addBreak(n)">
                    <br>
                </p>
            </span>
        </p>
    </div>
</template>

<script>
export default {
    name : 'Fizbuzz',
    props : ['displayfizbuz'],
    data : function() {
        return {
            result : false,
            statusmsg : ""
        }
    },
    methods: {
        calculate(value) {
            var result = value;
            let divbythree = value % 3;
            let divbyfive = value % 5;

            // Determine the result
            if(divbythree === 0 && divbyfive !== 0) {
                result = "Fizz";
            }
            else if(divbythree !== 0 && divbyfive === 0) {
                result = "Buzz"
            }
            return result;
        },
        addBreak(value) {
            let result = false;
            if((value % 10) === 0) {
                result = true;
            }
            return result;
        },
        specialbuzz(value) {
            var result = "";
            let divbythree = value % 3;
            let divbyfive = value % 5;

            if((divbythree === 0) && (divbyfive === 0)) {
                result = "FizBuzz";
            }
            return result;
        }
    },
    watch: {
        displayfizbuz(value,previousvalue) {
            this.result = false;
            if(value) {
                this.result = true;
                this.statusmsg = "Start FizBuzz";
                console.log("Fizbuzz start");
            }
        }
    }
}
</script>