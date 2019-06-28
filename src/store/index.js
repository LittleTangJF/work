import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import thematic_store from './modules/thematic.js';
import global_store from './modules/global.js';
export default new vuex.Store({
    modules: {
        global: global_store,
        thematic: thematic_store
    }
})