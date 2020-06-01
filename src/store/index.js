import Vue from "vue";
import Vuex from "vuex";
import _ from 'lodash'

Vue.use(Vuex);

const setStorage = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items))
}

const getStorage = (key) => {
  let items = localStorage.getItem(key)
  return (items) ? JSON.parse(items) : []
}

export default new Vuex.Store({
  state: {
    key: null,
    items: []
  },
  mutations: {
    SET_ITEM: async (state, payload) => {
      let itemIndex = await _.findKey(state.items, { key : payload.items.key})
      if(itemIndex){
        state.items[itemIndex] = await payload.items
        await setStorage(payload.key, this.state.items)
      } else {
        await state.item.push(payload.items)
        await setStorage(payload.key, state.items)
      }
    },
    FETCH_ITEMS: async (state, payload) => {
      state.items = await payload.items
      await setStorage(payload.key, state.items)
    }
  },
  getters : {
    allItems(state) {
      return state.items;
    },
    findItem(state, payload) {
      return _.find(state.items, payload)
    }
  },
  actions : {
    setItem(store, payload) {
      store.commit('SET_ITEM', { key : this.STORAGE_KEY, items: payload });
    },
    fetchItems(store) {
      console.log(this.STORAGE_KEY)
      let items = getStorage()
      store.commit('FETCH_ITEMS', { key : this.STORAGE_KEY, items : items });
    }
  }
});

// YYYYMMDD Format
Date.prototype.format8n = function() {
  let date = this;
  return date.getFullYear() + (date.getMonth() + 1).zf(2) + date.getDate().zf(2);
}

// zero-fill
Number.prototype.zf = function (len) {
  var s = String(this), c = '0';
  len = len || 2;
  while (s.length < len) s = c + s;
  return s;
}
