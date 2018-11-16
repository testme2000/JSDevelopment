
// Import the mount() method from test utils
// also add destination component
import { mount } from '@vue/test-utils'
import { stock } from './main'

describe('StockCheck', () => {
    // Perform mounting
    const wrapper = mount(stock)
    // get vue instance
    const vueobj = wrapper.vm
    // Verify - Stock Component Result
    it('renders the correct markup', () => {
        expect(wrapper.html()).toContain('<h4>Result :</h4>')
    })    

})























