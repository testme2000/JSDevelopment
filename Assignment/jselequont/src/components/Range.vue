<template>
    <div v-if="result">
    
    </div>
</template>

<script>
export default {
    name: "range",
    props : ["displayrange"],
    data() { 
        return {
            result : false
        }
    }
}
</script>