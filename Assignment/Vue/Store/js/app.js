Vue.use(ShopifyProducts);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    warehouseinventory : {},
    group: {},

    categoryHome: {
      heading: 'Welcome to Store',
      handle: 'home',
      warehouseinventory: [
          'adjustable-stem',
          'fizik-saddle-pak',
          'keda-tube',
          'colorful-fixie-lima',
          'oury-grip-set',
          'pure-fix-pedals-with-cages'
      ]
    }
  },

  mutations: {
    updateinventory(state, arrivaldata) {
      let products = {};

      Object.keys(arrivaldata).forEach(key => {
        let product = arrivaldata[key];
        let prices = [];
        for(let variation of product.variationProducts) {
          if(!prices.includes[variation.price]) {
            prices.push(variation.price);
          }
        }
        product.price = Math.min(...prices);
        product.hasManyPrices = price.length > 1;
        products[key] = product;
      })
      state.warehouseinventory = products;
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
      //    tempgroup.warehouseinventory = tempgroup.warehouseinventory.concat(group.products);
      //    delete tempgroup[key];
        }
      });

      let finalsort = {};

      Object.keys(tempgroup).sort().forEach(key => {
        finalsort[key] = tempgroup[key];
      })
      state.group = finalsort;
    }
  },
  actions: {
    prepareBusiness({commit}, products) {
      commit('updategroup', products);
    }
  },
  getters : {
    categoryProducts: (state, getters) => (slug) => {
      if(getters.categoriesExist) {
        let category = false;
        products = [];

        if(this.slug) {
            category = this.$store.state.group[this.slug];
        }
        else {
            category = this.categoryHome;
        }

        if(category) {
          for(let featured of category.warehouseinventory) {
            products.push(state.warehouseinventory[featured]);
          }
          category.productDetails = products;
        }
        return category;
      }
    },
    categoriesExist: (state) => {
      return Object.keys(state.group).length;
    }
  }
});

const router = new VueRouter({
  routes : [
            {
              path: '/',
              name: 'Home',
              components: {
                default: CategoryPage,
                sidebar: ListCategories
              },
              props: {
                default: true,
                sidebar: true
              }
            },
            {
              path: '/category/:slug',
              name: 'Category',
              components: {
                default: CategoryPage,
                sidebar: ProductFiltering
              },
              props: {
                default: true,
                sidebar: true
              }
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