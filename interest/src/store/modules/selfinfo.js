import Vue from 'vue'
import router from '../../router/index.js'
export default {
	state : {
		info : JSON.parse(sessionStorage.getItem("user")) || {},					//登录信息	
		pic : sessionStorage.getItem('pic'),										//头像
		megs : JSON.parse(sessionStorage.getItem('megs')) || [],					//帖子
		imgs : JSON.parse(sessionStorage.getItem('mimgs')) || [],					//帖子对应的图片
		logif : false,	
		pubok : false,															//是否登录	
		prompts : []					//推送信息							
	},
	mutations : {
		isok (state) {
			state.pubok = true;
		},
		notok (state) {
			state.pubok = false;
		},
		saveinfo (state, newinfo) {
			state.info = Object.assign({}, newinfo);
			sessionStorage.setItem('user',JSON.stringify(newinfo));
		},
		savepic (state, newpic) {
			state.pic = newpic;
			sessionStorage.setItem('pic',newpic);
		},
		savemegs (state, newmegs) {
			state.megs = Object.assign([], newmegs);
			sessionStorage.setItem('megs',JSON.stringify(newmegs));
		},
		saveimgs (state, newimgs) {
			state.imgs = Object.assign([], newimgs);
			sessionStorage.setItem('mimgs',JSON.stringify(newimgs));
		},
		saveprompts (state, newprompts) {
			state.prompts =Object.assign([], newprompts);
			// sessionStorage.setItem('proms',JSON.stringify(newprompts));
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
			Vue.http.get('http://139.199.205.91:8000/users/friend',{  
		        params : {
		          id : state.info.id
		        },
		        credentials : true
		      }).then(function (res) {
		        if(res.body.error) {
		          commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
		        }else {
		          commit("saveinfo",res.body.result);
		          commit("savepic",res.body.pic);
		        }
		      })
		},
		getownMessages({commit, state, dispatch}) {
			commit('notok');
			Vue.http.get('http://139.199.205.91:8000/msgs/get_msg', {
		        credentials : true}).then(function(res) {
					commit('isok');
		        	if(res.body.error) {
		        		commit("showpop",{'popif' : true,'words' : res.body.result,'type' : 0});
		        	}else {
		          		commit("savemegs",res.body.result);
		          		commit("saveimgs",res.body.imgs);
		        	}
	        })
		},
		checklog({commit, state, dispatch}) {
			Vue.http.get('http://139.199.205.91:8000/users/logif',{
			      credentials : true
			    }).then(function(res) {
			        if(!res.body.error) {
			          commit('saveinfo',res.body.infor);
			          commit('logt');
			          return true;
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
				Vue.http.get('http://139.199.205.91:8000/prom/id', {
					credentials : true
				}).then((res) => {
					if(res.body.error) {
			        	commit("showpop",{'popif' : true,'words' : res.body.result,'type' : 0});
					}else {
						if(window.EventSource) {
							source = new EventSource('http://139.199.205.91:8000/prom/push');
							source.addEventListener('message', (e) => {
	
								commit('saveprompts',JSON.parse(e.data));
							},false);
						
							source.addEventListener('error', (e) => {
								//判断source.readyState 属性的取值 判断连接的状态
								if(e.target.readyState === EventSource.CLOSED) {
									// console.log('disconnected.');
								}else if(e.target.readyState === EventSource.CONNECTING) {
									// console.log('connecting');
								}
							}, false)
						}else {
							// console.log('SSE is not supported.');
						}
					}
				})	
		},
		readprompts({commit, state, dispatch}) {
			Vue.http.get('http://139.199.205.91:8000/prom/hasread',{ 
				credentials:true }).then( (res) => {
					if(res.error) {
		        		// commit("showpop",{'popif' : true,'words' : res.body.result,'type' : 0});
					}else {
						commit('saveprompts',res.body);
					}
			})
		}
	}
}