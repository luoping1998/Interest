import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

import selfinfo from './modules/selfinfo.js'
import message from './modules/message.js'

export default new vuex.Store({
	state : {
		pop : {
			popif : false,
			words : '',
			type : 0
		}
	},
	mutations : {
		showpop (state, newpop) {
			state.pop = newpop;
		}
	},
	modules : {
		selfinfo,
		message
	}
})