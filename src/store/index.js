import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    users: [],
    user: null,
    loginErrors: []
  },

  actions: {
    LOGIN({state, commit}, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const user = state.users.find(user => user.name === payload.name && user.password === payload.password);
            if (user) {
              commit('USER', payload);
              commit('LOGIN_ERRORS', []);
              resolve(true);
            } else {
              reject('User or password is incorrect');
              commit('LOGIN_ERRORS', ['User or password is incorrect']);
            }
          } catch (error) {
            reject('User or password is incorrect');
          }
          
        }, 300);
      });
      
    },

    REGISTER({state, commit}, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const user = state.users.find(user => user.name === payload.name);
            if (user) {
              commit('LOGIN_ERRORS', ['User already exists']);
              reject('User already exists');
            } else {            
              commit('REGISTER', payload);
              commit('LOGIN_ERRORS', []);
              resolve(true);
            }
          } catch (error) {
            reject('Error');
          }
          
        }, 300);
      });
      
    }
  },

  mutations: {
    USER(state, payload) {
      state.user = payload;
    },

    REGISTER(state, payload) {
      state.users.unshift(payload);
      state.user = payload;
    },

    LOGIN_ERRORS(state, payload) {
      state.loginErrors = payload;
    }
  },  

  getters: {
    isAuthenticated: state => {
      console.log('store', !!(state.user && state.user.name));
      return !!(state.user && state.user.name);
    }
  }
});

try {
  const localstorageDB = localStorage.getItem('toDoDB');
  if (localstorageDB) {
    store.replaceState(JSON.parse(localstorageDB));
    store.state.loginErrors = [];
  }
} catch (error) {
  console.error('Error on local storage');
}


store.subscribe((mutation, state) => {
  try {
    localStorage.setItem('toDoDB', JSON.stringify(state));
  } catch (error) {
    console.error('Error on local storage');
  }
});

export default store;
