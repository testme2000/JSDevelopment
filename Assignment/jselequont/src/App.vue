<template>
  <div id="app">
    <div>
      <button id="triid" class="btn btn-primary" @click="performTriangle()">Triangle</button>
      &nbsp;
      <button id="fizid" class="btn btn-primary" @click="performFizBuzz()">FizBuzz</button>
      &nbsp;
      <button id="gridd" class="btn btn-primary" @click="performGrid()">Grid</button> 
      &nbsp;
      <button id="minidd" class="btn btn-primary" @click="performMinimum()">Minimum</button>
      &nbsp;
      <button id="evenoddid" class="btn btn-primary" @click="performEvenOdd()">Even/Odd Check</button>
      &nbsp;
      <button id="beanid" class="btn btn-primary" @click="performBeanCount()">Bean Count</button>
    </div>
    <br>
    <div>
      <button id="rangeid" class="btn btn-primary" @click="performRangeStatus()">Range Count</button>
      &nbsp;
      <button id="reverseid" class="btn btn-primary" @click="performReverse()">Reverse String</button>
      &nbsp;
      <button id="listid" class="btn btn-primary" @click="performListOperation()">List Processing</button>
    </div>
    <table>
      <tr>
        <td>
            <triangle v-bind:displaytri="tristatus" />
        </td>
      </tr>
      <tr>
        <td>
            <fizbuzz v-bind:displayfizbuz="fizbuzzstatus" />
        </td>
      </tr>
      <tr>
        <td>
            <flexgrid v-bind:displaygrid="gridstatus" />
        </td>
      </tr>
      <tr>
        <td>
            <minval v-bind:displaymin="minstatus" />
        </td>
      </tr>
      <tr>
        <td>
            <evenodd v-bind:displayevenodd="evenoddstatus" />
        </td>
      </tr>
      <tr>
        <td>
            <beancount v-bind:displaybeancount="beancountstatus" />
        </td>
      </tr>
      <tr>
        <td>
            <range v-bind:displayrange="rangestatus" />
        </td>
      </tr>
      <tr>
        <td>
            <reverse v-bind:displayreverse="reversestatus" />
        </td>
      </tr>
      <tr>
        <td>
            <listprocess v-bind:displaylist="listprocess" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import triangle from './components/triangle'
  import fizbuzz from './components/fizbuzz'
  import flexgrid from './components/flexgrid'
  import minval from './components/minval'
  import evenodd from './components/evenodd'
  import beancount from './components/Beancount'
  import range from './components/Range'
  import reverse from './components/reverse'
  import listprocess from './components/list'


  export default {
    name: 'app',
    components: {
      triangle,
      fizbuzz,
      flexgrid,
      minval,
      evenodd,
      beancount,
      range,
      reverse,
      listprocess
    },
    data() {
      return {
        tristatus : false,
        fizbuzzstatus : false,
        gridstatus : false,
        minstatus : false,
        evenoddstatus : false,
        beancountstatus : false,
        rangestatus : false,
        reversestatus : false,
        listprocess : false
      }
    },
    methods : {
      performTriangle() {
          // Perform Triangle
          this.tristatus = !this.tristatus;
          if(this.tristatus) {
            this.fizbuzzstatus = false;
            this.gridstatus = false;
            this.minstatus = false;
            this.evenoddstatus = false;
            this.beancountstatus = false;
            this.rangestatus = false;
            this.reversestatus = false;
            this.listprocess = false;
          }
      },
      performFizBuzz() {
          // Perform FizzBuzz
          this.fizbuzzstatus = !this.fizbuzzstatus;
          if(this.fizbuzzstatus) {
            this.tristatus = false;
            this.gridstatus = false;
            this.minstatus = false;
            this.evenoddstatus = false;
            this.beancountstatus = false;
            this.rangestatus = false;
            this.reversestatus = false;
            this.listprocess = false;
          }
      },
      performGrid() {
        this.gridstatus = !this.gridstatus;
        if(this.gridstatus) {
          this.fizbuzzstatus = false;
          this.tristatus = false;
          this.minstatus = false;
          this.evenoddstatus = false;
          this.beancountstatus = false;
          this.rangestatus = false;
          this.reversestatus = false;
          this.listprocess = false;
        }
      },
      performMinimum() {
        this.minstatus = !this.minstatus;
        if(this.minstatus) {
          this.fizbuzzstatus = false;
          this.tristatus = false;
          this.gridstatus = false;
          this.evenoddstatus = false;
          this.beancountstatus = false;
          this.rangestatus = false;
          this.reversestatus = false;
          this.listprocess = false;
        }
      },
      performEvenOdd() {
        this.evenoddstatus = !this.evenoddstatus;
        if(this.evenoddstatus) {
          this.fizbuzzstatus = false;
          this.tristatus = false;
          this.gridstatus = false;
          this.minstatus = false;
          this.beancountstatus = false;
          this.rangestatus = false;
          this.reversestatus = false;
          this.listprocess = false;
        }
      },
      performBeanCount() {
        this.beancountstatus = !this.beancountstatus;
        if(this.beancountstatus) {
          this.fizbuzzstatus = false;
          this.tristatus = false;
          this.gridstatus = false;
          this.minstatus = false;
          this.evenoddstatus = false;
          this.rangestatus = false;
          this.reversestatus = false;
          this.listprocess = false;
        }
      },
      performRangeStatus() {
        this.rangestatus = !this.rangestatus;
        if(this.rangestatus) {
          this.fizbuzzstatus = false;
          this.tristatus = false;
          this.gridstatus = false;
          this.minstatus = false;
          this.evenoddstatus = false;
          this.beancountestatus = false;
          this.reversestatus = false;
          this.listprocess = false;
        }
      },
      performReverse() {
        this.reversestatus = !this.reversestatus;
        if(this.reversestatus) {
          this.fizbuzzstatus = false;
          this.tristatus = false;
          this.gridstatus = false;
          this.minstatus = false;
          this.evenoddstatus = false;
          this.beancountstatus = false;
          this.rangestatus = false;
          this.listprocess = false;
        }
      },
      performListOperation() {
        this.listprocess = !this.listprocess;
        if(this.listprocess) {
          this.fizbuzzstatus = false;
          this.tristatus = false;
          this.gridstatus = false;
          this.minstatus = false;
          this.evenoddstatus = false;
          this.beancountstatus = false;
          this.rangestatus = false;
          this.reversestatus = false;
        }
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 5px;
}
 
.grouped {   
    display: inline-block;
}

.grouped > .button:not(:last-child) {
    margin-right: 10px;
}


</style>
