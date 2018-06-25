import Vue from 'vue'
import router from '../../router/index.js'
export default {
	state : {
		info : JSON.parse(sessionStorage.getItem("user")) || {},					//登录信息	
		pic : sessionStorage.getItem('pic'),										//头像
		megs : JSON.parse(sessionStorage.getItem('megs')) || {},					//帖子
		imgs : JSON.parse(sessionStorage.getItem('mimgs')) || [],		//帖子对应的图片
		logif : false,																//是否登录	
		prompts : JSON.parse(sessionStorage.getItem('proms')) || []																//推送信息							
	},
	mutations : {
		saveinfo (state, newinfo) {
			for(var key in newinfo) {
				state.info[key] = newinfo[key];
			}
			sessionStorage.setItem('user',JSON.stringify(newinfo));
		},
		savepic (state, newpic) {
			state.pic = newpic;
			sessionStorage.setItem('pic',newpic);
		},
		savemegs (state, newmegs) {
			for(var key in newmegs) {
				state.megs[key] = newmegs[key];
			}
			sessionStorage.setItem('megs',JSON.stringify(newmegs));
		},
		saveimgs (state, newimgs) {
			state.imgs = newimgs;
			sessionStorage.setItem('mimgs',JSON.stringify(newimgs));
		},
		saveprompts (state, newprompts) {
			state.prompts = mewprompts;
			sessionStorage.setItem('proms',JSON.stringify(newprompts));
		},
		logt (state) {
			state.logif = true;
		},
		logf (state) {
			state.logif = false;
			state.info = {};
			state.pic = '';
			state.megs = {};
			state.imgs = [];
			sessionStorage.clear();
		}
	},
	actions : {
		getownInfo({commit, state, dispatch}) {
			// console.log(state.info);
			Vue.http.get('http://localhost:8000/users/friend',{  
		        params : {
		          id : state.info.id
		        },
		        credentials : true
		      }).then(function (res) {
		        if(res.body.error) {
		        	// console.log(res.body.result);
		          commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
		        }else {
		          commit("saveinfo",res.body.result);
		          commit("savepic",res.body.pic);
		        }
		      })
		},
		getownMessages({commit, state, dispatch}) {
			Vue.http.get('http://localhost:8000/msgs/get_msg', {
		        credentials : true}).then(function(res) {
		          if(res.body.error) {
		        	commit("showpop",{'popif' : true,'words' : res.body.result,'type' : 0});
		          }else {
		          	console.log(res);
		          	commit("savemegs",res.body.result);
		          	commit("saveimgs",res.body.imgs);
		          }
	        })
		},
		checklog({commit, state, dispatch}) {
			Vue.http.get('http://localhost:8000/users/logif',{
			      credentials : true
			    }).then(function(res) {
			        if(!res.body.error) {
			          console.log(res.body.infor);
			          commit('saveinfo',res.body.infor);
			          commit('logt');
			        }else{
			          commit('clear');
			          commit('logf');
			          router.push('/login');
		        	  commit("showpop",{'popif' : true,'words' : res.body.result,'type' : 0});
			        }
			        return false;
			    })
		},
		getprompts({commit, state, dispatch}) {
			var source ;
			Vue.http.get('http://localhost:8000/prom/id', {
				credentials : true
			}).then((res) => {
				if(res.body.error) {
		        	commit("showpop",{'popif' : true,'words' : res.body.result,'type' : 0});
				}else {
					if(window.EventSource) {
						source = new EventSource('http://localhost:8000/prom/push');
						source.addEventListener('open', () => {
							console.log('connected.');
						}, false);

						source.addEventListener('message', e => {
							console.log(e);
							console.log(`data : ${ e.data}`);
						},false);
					
						source.addEventListener('error', e => {
							//判断source.readyState 属性的取值 判断连接的状态
							console.log(e);
							if(e.target.readyState === EventSource.CLOSED) {
								console.log('disconnected.');
							}else if(e.target.readyState === EventSource.CONNECTING) {
								console.log('connecting');
							}
						}, false)
					}else {
						console.log('SSE is not supported.');
					}
				}
			})
			
		}
	}
}