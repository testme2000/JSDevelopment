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
        <div>  
            
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
            sumResult : undefined
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
            if(this.startValue == this.endValue) 
            {
                this.rangeResult = [this.startValue]; 
            }
            else
            {
                for(let count = this.startValue;count < this.endValue;count++)
                {
                    this.rangeResult.push(count);
                }
            }
        }
    }
}
</script>