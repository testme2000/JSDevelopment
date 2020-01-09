<template>
    <div v-if="result">
        <form id="rangeform" v-on:submit.prevent="performRange">
            <label>Enter Start Value : </label>
            &nbsp;
            <input type="number" v-model="startValue" placeholder="Start Value" required />
            <br>
            <label>Enter End Value : </label>
            &nbsp;
            <input type="number" v-model="endValue" placeholder="End Value" required />
            <br>
            <label>Step Value : </label>
            <input type="number" v-model="stepValue"/>
            <br>
            <button>Calculate</button>
        </form>  
        <div v-if="error">
            <h1>Please enter valid value</h1>
        </div>
        <div v-if="rangeResult">  
            <h4>Range created for value</h4>
            <b>{{rangeResult}}</b>
        </div>
        <div v-if="sumResult">
            <h4>Sum of Range</h4>
            <b>{{sumResult}}</b>
        </div>
    </div>
</template>

<script>
export default {
    name: "range",
    props : ["displayrange"],
    data() { 
        return {
            result : false,
            startValue : undefined,
            endValue : undefined,
            stepValue : 1,
            rangeResult: undefined,
            sumResult : undefined,
            error : false,
            errorMsg : ''
        }
    },
    watch: {
        displayrange(value,previousValue)
        {
            this.result = false;
            if(value) 
            {
                this.result = true;
            }
        }
    },
    methods: {
        performRange() 
        {
            this.rangeResult = undefined;
            this.sumResult = undefined;
            let rangebuffer = [];
            let first = Number(this.startValue);
            let last = Number(this.endValue);
            let stepValue = Number(this.stepValue);

            this.error = false;
            this.errorMsg = '';
            if(first == last) 
            {
                rangebuffer = [this.startValue]; 
            }
            else
            {
                // Perform validation
                if(first > last && stepValue >= 0)
                {
                    this.error = true;
                    return;
                } 
                else if(first < last && stepValue <= 0)
                {
                    this.error = true;
                    return; 
                }

                if(first > last) {
                    // We need to do other way round
                    for(var count = first;count > last;count += stepValue)
                    {
                        rangebuffer.push(count);
                    }
                }
                else 
                {
                    for(var count = first;count < last;count += stepValue)
                    {
                        rangebuffer.push(count);
                    }
                }

            }
            this.rangeResult = rangebuffer;
            this.sumResult = this.rangeResult.reduce((a,b) => a + b,0);
        }
    }
}
</script>