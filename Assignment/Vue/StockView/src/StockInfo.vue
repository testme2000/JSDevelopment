
<template>
    <div>
        <h4>Result :</h4> 
        <table>
            <tr>
                <td>Symbol:</td>
                <td>{{stockObject.Symbol}}</td>
            </tr>
            <tr>
                <td>Last Updated:</td>
                <td>{{stockObject.LastUpdated}}</td>
            </tr>
            <tr>
                <td>Open:</td>
                <td>{{stockObject.Open}}</td>
                <td>Close:</td>
                <td>{{stockObject.Close}}</td>
            </tr>
            <tr>
                <td>High:</td>
                <td>{{stockObject.High}}</td>
                <td>Low:</td>
                <td>{{stockObject.Low}}</td>
            </tr>
            <tr>
                <td>Div Amount:</td>
                <td>{{stockObject.DividendAmount}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'stockdetails',
        props : ['stockObject'],
        data () {
            return {
            }
        }
    }

</script>



