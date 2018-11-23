
// Import the mount() method from test utils
// also add destination component
import Vue from 'vue';
window.Vue = Vue;
import axios from 'axios';
import { mount } from '@vue/test-utils'
import app  from './main'




describe('StockCheck', () => {
    // Perform mounting
    const wrapper = mount(stock-details)
    // get vue instance
    const vueobj = wrapper.vm
    console.log("Checking content");
    console.log(wrapper);
    /* // Verify - Stock Component Result
    it('renders the correct markup', () => {
        expect(wrapper.contains('<h4>Result :</h4>')).toBe(true);
    }) */    

})























