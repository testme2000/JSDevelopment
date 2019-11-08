<template>
    <div>
        <div v-if="result">
            <form id="stringsearchid" v-on:submit.prevent="performSearch">
                <label>Enter the string : </label>
                &nbsp;<input type="text" v-model="inputstr" required>
                <br>
                <label>Enter the character to search in string : </label>
                &nbsp;<select v-model="charselect">
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                    <option>G</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                    <option>A</option>
                </select>
                <button>Seach Character</button>
            </form>
            <h1>{{statusResult}}</h1>
        </div>
    </div>   
</template>

<script>
export default {
    name : 'beancount',
    props: ['displaybeancount'],
    data() {
        return {
            result : false,
            statusResult : 'Bean Counting not started'
        }
    },
    watch: {
        displaybeancount(value,previousvalue) {
            console.log("Result arrived");
            this.result = false;
            if(value) {
                this.result = true;
            }
        }
    },
    methods : {
        performSearch() {
            let finalInput = this.inputstr.toUpperCase(); 
            let result = finalInput.split("").filter(value => value == this.charselect);
            this.statusResult = "Found the " + this.charselect + " " + result.length + " times";
            console.log(this.statusResult);
        }
    }
}
</script>