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
                    <option>H</option>
                    <option>I</option>
                    <option>J</option>
                    <option>K</option>
                    <option>L</option>
                    <option>M</option>
                    <option>N</option>
                    <option>O</option>
                    <option>P</option>
                    <option>Q</option>
                    <option>R</option>
                    <option>S</option>
                    <option>T</option>
                    <option>U</option>
                    <option>V</option>
                    <option>W</option>
                    <option>X</option>
                    <option>Y</option>
                    <option>Z</option>
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
        }
    }
}
</script>