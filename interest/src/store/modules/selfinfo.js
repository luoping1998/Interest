import Vue from 'vue'
import router from '../../router/index.js'
export default {
	state : {
		info : JSON.parse(sessionStorage.getItem("user")) || {},					//登录信息	
		pic : sessionStorage.getItem('pic'),										//头像
		megs : JSON.parse(sessionStorage.getItem('megs')) || [],					//帖子
		imgs : JSON.parse(sessionStorage.getItem('mimgs')) || [],					//帖子对应的图片
		pubkey : '',
		logif : false,	
		pubok : false,	
		prmok : false,														//是否登录	
		prompts : []					//推送信息							
	},
	mutations : {
		savekey(state, newkey) {
			console.log(newkey);
			state.pubkey = newkey;
		},
		isok (state) {
			state.pubok = true;
		},
		notok (state) {
			state.pubok = false;
		},
		promisok (state) {
			state.prmok = true;
		},
		promnotok (state) {
			state.prmok = false;
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
			const promise = new Promise((resolve, reject) => {
				Vue.http.get('http://139.199.205.91:8000/users/friend',{  
			        params : {
			          id : state.info.id
			        },
			        credentials : true
			      }).then((res) => {
			        if(res.body.error) {
			        	reject(res.body.result);
			        }else {
			        	resolve(res);
				    }
			      })
			}).then(res => {
				commit("saveinfo",res.body.result);
			    commit("savepic",res.body.pic);
			}).catch(err => {
				commit('showpop',{'popif' : true,'words' : err,'type' : 0});
			})
			
		},
		getownMessages({commit, state, dispatch}) {
			commit('notok');
			const promise = new Promise((resolve, reject) => {
				Vue.http.get('http://139.199.205.91:8000/msgs/get_msg', {
		        credentials : true}).then(function(res) {
					commit('isok');
		        	if(res.body.error) {
		        		reject(res.body.result);
		        	}else {
		          		resolve(res);
		        	}
	        	})
			}).then(res => {
				commit("savemegs",res.body.result);
		        commit("saveimgs",res.body.imgs);
			}).catch(err => {
		       	commit("showpop",{'popif' : true,'words' : err,'type' : 0});
			})
			
		},
		checklog({commit, state, dispatch}) {
			const promise = new Promise((resolve, reject) => {
				Vue.http.get('http://139.199.205.91:8000/users/logif',{
			      credentials : true
			    }).then(function(res) {
			        if(!res.body.error) {
			        	resolve(res);
			        }else{
			        	reject(res.body.result);
			        }
			    })
			}).then(res=>{
				commit('saveinfo',res.body.infor);
			    commit('logt');
			}).catch(err=>{
				commit('clear');
			    commit('logf');
			    router.push('/login');
		        commit("showpop",{'popif' : true,'words' : err,'type' : 0});
		        return false;
			})
			
		},
		getprompts({commit, state, dispatch}) {
			commit('promnotok');
				var source ;
				const promise = new Promise((resolve, reject)=>{
					Vue.http.get('http://139.199.205.91:8000/prom/id', {
						credentials : true
					}).then((res) => {
						commit('promisok');
						if(res.body.error) {
							reject(res.body.result);
				  		}else {
							if(window.EventSource) {
								source = new EventSource('http://139.199.205.91:8000/prom/push');
								source.addEventListener('message', (e) => {
									resolve(e.data);
								},false);
							
								source.addEventListener('error', (e) => {
									//判断source.readyState 属性的取值 判断连接的状态
									if(e.target.readyState === EventSource.CLOSED) {
										reject('disconnected.');
									}else if(e.target.readyState === EventSource.CONNECTING) {
										resolve('connecting')
									}
								}, false)
							}else {
								reject('SSE is not supported.');
							}
						}
					})	
				}).then(res => {
					commit('saveprompts',JSON.parse(res));
				}).catch(err => {
					commit("showpop",{'popif' : true,'words' : err,'type' : 0});
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
		},
		getpubKey({commit, state, dispatch}) {
			Vue.http.get('http://139.199.205.91:8000/users/key',{ 
				credentials:true }).then( (res) => {
					console.log(res);
				commit('savekey',res.body.publicKey);
			})
		}
	}
}