import Vue from 'vue'
export default {
	state : {
		world : [],					//世界贴
		wpics : [],					//世界贴对应头像
		wimgs : [],					//世界帖对应图片
		follow : [],				//关注贴
		fpics : [],					//关注贴对应头像
		fimgs : [],					//关注帖对应图片
		pubed : []					//已发表贴				//世界贴
	},
	mutations : {
		saveworld(state, nworld) {
			state.world = Object.assign([], nworld);
		},
		savewpics(state, nwpics) {
			state.wpics = Object.assign([], nwpics);
		},
		savewimgs(state, nwimgs) {
			state.wimgs = Object.assign([], nwimgs);
		},
		savefollow(state, nfollow) {
			state.follow = Object.assign([], nfollow);
		},
		savefpics(state, nfpics) {
			state.fpics =  Object.assign([], nfpics);
		},
		savefimgs(state, nfimgs) {
			state.fimgs =  Object.assign([], nfimgs);
		},
		concatworld(state, nworld) {
			state.world = state.world.concat(nworld);
		},
		concatwpics(state, nwpics) {
			state.wpics = state.wpics.concat(nwpics);
		},
		concatwimgs(state, nwimgs) {
			state.wimgs = state.wimgs.concat(nwimgs);
		},
		concatfollow(state, nfollow) {
			state.follow = state.follow.concat(nfollow);
		},
		concatfpics(state, nfpics) {
			state.fpics =  state.fpics.concat(nfpics);
		},
		concatfimgs(state, nfimgs) {
			state.fimgs = state.fimgs.concat(nfimgs);
		},
		savepubed(state, npubed) {
			state.pubed = Object.assign([], npubed);;
		},
		addcount(state, num) {
			state.count += num;
		},
		clear(state) {
			state.world = [];
			state.wpics = [];
			state.follow = [];
			state.fpics = [];
			state.pubed = [];
		}
	}
}