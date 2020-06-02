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
      let itemIndex = await _.findIndex(state.items, function(o) { return o.key == payload.item.key });
      console.log(itemIndex)
      if(itemIndex > -1){
        state.items[itemIndex] = await payload.item
        await setStorage(payload.key, state.items)
      } else {
        await state.items.push(payload.item)
        await setStorage(payload.key, state.items)
      }
    },
    FETCH_ITEMS: async (state, payload) => {
      state.items = await payload.items;
      state.key = await payload.key;
      setStorage(payload.key, state.items)
    }
  },
  getters : {
    allItems(state) {
      return state.items;
    }
    //findItem(state, payload) {
    //  return _.find(state.items, payload)
    //}
  },
  actions : {
    setItem(store, payload) {
      store.commit('SET_ITEM', { key : this.STORAGE_KEY, item: payload });
    },
    fetchItems(store, payload) {
      store.commit('FETCH_ITEMS', { key : this.STORAGE_KEY, items : payload });
    },
    initItems(store) {
      return new Promise((resolve) => {
        let items = getStorage(this.STORAGE_KEY)
        store.commit('FETCH_ITEMS', { key : this.STORAGE_KEY, items : items });
        resolve(items);
      });
    }
  }
});