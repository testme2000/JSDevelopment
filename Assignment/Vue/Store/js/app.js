Vue.use(ShopifyProducts);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    warehouseinventory : {},
    group: {}
  },

  mutations: {
    updateinventory(state, arrivaldata) {
      state.warehouseinventory = arrivaldata;
    },

    updategroup(state, arrivaldata) {
      let tempgroup = {},
        notingroup = {
          heading : 'Miscellaneous',
          handle : 'other'
        };

      Object.keys(arrivaldata).forEach(key => {
          let item = arrivaldata[key];
          let type = item.hasOwnProperty('type') ? item.type : notingroup;

          if(!tempgroup.hasOwnProperty(type.handle)) {
              tempgroup[type.handle] = {
                  heading : type.title,
                  handle : type.handle,
                  warehouseinventory: []
              }
          }
          tempgroup[type.handle].warehouseinventory.push(item.handle);
      });

      Object.keys(tempgroup).forEach(key => {
        let grouptest = tempgroup[key];

        if(grouptest.warehouseinventory.length < 3) {
            console.log("temp gropu");
            console.log(tempgroup.notingroup);
      //    tempgroup.warehouseinventory = tempgroup.warehouseinventory.concat(group.products);
      //    delete tempgroup[key];
        }
      });

      let finalsort = {};

      Object.keys(tempgroup).sort().forEach(key => {
        finalsort[key] = tempgroup[key];
      })
      state.group = finalsort;
      console.log("Final Sort");
      console.log(finalsort);
    }
  },
  actions: {
    prepareBusiness({commit}, products) {
      commit('updategroup', products);
    }
  }
});

const router = new VueRouter({
  routes : [
            {
              path: '/',
              name: 'Home',
              components: {
                default: HomePage,
                sidebar: ListCategories
              }
            },
            {
              path: '/category/:slug',
              name: 'Category',
              component: CategoryPage,
              props: true
            },
            {
              path: '/product/:slug',
              name: 'Product',
              component: ProductPage
            },
            {
              path: '/404',
              alias: '*',
              component: PageNotFound
            }
          ]
});

new Vue({
  el : "#app",
  store,
  router,
  created() {
    CSV.fetch({url: './data/csv-files/bicycles.csv'}).then(data => {
      let properformat = this.$formatProducts(data);
      this.$store.dispatch('prepareBusiness',properformat);
    });
  }
})