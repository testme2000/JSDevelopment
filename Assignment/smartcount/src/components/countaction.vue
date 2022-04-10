<template>
    <div>
        <h2>Lets began</h2>
        <label>{{finalvalue}}</label>
    </div>
</template>

<script>
import { timer } from 'rxjs';
import { takeWhile,tap,mapTo,startWith,scan } from 'rxjs/operators'; //map, mapTo, takewhile,take


export default {
    name: 'CountAction',
    props: {
        entry : Number
    },
    data() {
        console.log("Passed value ",this.entry);
        return {
            progresscount : 0,
            startValue : this.entry,
            initialCount : 0
        }
    },
    computed: {
        finalcounter : function() {
            var finalValue = 1;
            if(this.startValue < 0)
            {
                finalValue = -1;
            }
            return finalValue;
        }
    },
    methods:
    {
        nextValue() {
            if(this.startValue > 0)
            {
                console.log("Meku",this.initialCount);
                return ++this.initialCount;
            }
            else {
                console.log("Teku",this.initialCount);
                return --this.initialCount;
            }
        },
        plusOrMinus()
        {
            var result = (this.startValue > this.initialCount) ? 1 : -1;
            console.log("Found the result ",result);
            return  result;
        },
        validateCondition() 
        {
            var result = this.startValue > this.initialCount
                    ? val => val <= this.startValue
                    : val => val >= this.startValue; 
            /*
            return this.startValue > this.initialCount
                    ? val => val <= this.startValue
                    : val => val >= this.startValue;
            */
            console.log("Validate condition : " + result);
            return result;
        }
    },
    subscriptions() {
        console.log("Subscription started"); 
        this.period$ = timer(0,1000);
        return {
            finalvalue : this.period$.pipe(
                    tap(console.log(this.startValue)),
                    mapTo(this.plusOrMinus()),
                    startWith(this.initialCount),
                    scan((acc, curr) => {
                        console.log("This is in scan " + acc + " with start value " + curr);
                        return acc + curr}),
                    takeWhile(this.validateCondition()),
                    tap(console.log)
                )
        }
    }

}
</script>