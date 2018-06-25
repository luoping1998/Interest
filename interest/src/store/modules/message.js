import Vue from 'vue'
export default {
	state : {
		world : [],					//世界贴
		wpics : [],					//世界贴对应头像
		wimgs : [],					//世界帖对应图片
		follow : [],				//关注贴
		fpics : [],					//关注贴对应头像
		fimgs : [],					//关注帖对应图片
		pubed : [],					//已发表贴
		count : 0					//世界贴
	},
	mutations : {
		saveworld(state, nworld) {
			state.world = nworld;
		},
		savewpics(state, nwpics) {
			state.wpics = nwpics;
		},
		savewimgs(state, nwimgs) {
			state.wimgs = nwimgs;
		},
		savefollow(state, nfollow) {
			state.follow = nfollow;
		},
		savefpics(state, nfpics) {
			state.fpics =  nfpics;
		},
		savefimgs(state, nfimgs) {
			state.fimgs =  nfimgs;
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
			state.pubed = npubed;
		},
		clear(state) {
			state.world = [];
			state.wpics = [];
			state.follow = [];
			state.fpics = [];
			state.pubed = [];
			state.count = 0;
		}
	},
	actions : {
		getworld({commit, state, dispatch}, count) {
			var start;
			if(count == 0) start = 0;
			else start = state.count;
			// console.log(start);
			Vue.http.get('http://localhost:8000/msgs/wnew',{
				params : {
					start : start
				},
				credentials : true
			}).then(function(res) {
				// console.log(res);
				if(res.body.error) {
					commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
				}else {
					if(start == 0) {
						// this.pics = res.body.pics;
						commit('savewpics', res.body.pics);
						commit('saveworld',res.body.result);
						commit('savewimgs',res.body.imgs);
						// this.newDatas = res.body.result;
					}else {
						if(res.body.result.length){
							state.count += res.body.result.length;
						}
						commit('concatwpics', res.body.pics);
						commit('concatworld',res.body.result);
						commit('concatwimgs',res.body.imgs);
						// this.pics = this.pics.concat(res.body.pics);
						// this.newDatas = this.newDatas.concat(res.body.result);
					}
				}
			})
		},
		getfollow({commit, state, dispatch}) {
			Vue.http.get('http://localhost:8000/msgs/getfmsg',{
				credentials : true }).then(function(res) {
				if(res.body.error){
					commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
				}else {
					commit('savefollow', res.body.result);
					commit('savefpics', res.body.pics);
					commit('savefimgs', res.body.imgs);
				}
			})
		}
	}
}