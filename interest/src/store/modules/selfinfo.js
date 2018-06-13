import Vue from 'vue'
export default {
	state : {
		info : JSON.parse(sessionStorage.getItem("user")),		//登录信息	
		pic : sessionStorage.getItem('pic'),					//头像
		megs : JSON.parse(sessionStorage.getItem('megs')),												//我发表的
		logif : false
	},
	mutations : {
		saveinfo (state, newinfo) {
			state.info = newinfo;
			sessionStorage.setItem('user',JSON.stringify(newinfo));
		},
		savepic (state, newpic) {
			state.pic = newpic;
			sessionStorage.setItem('pic',newpic);
		},
		savemegs (state, newmegs) {
			state.megs = newmegs;
			sessionStorage.setItem('megs',JSON.stringify(newmegs));
		},
		logt (state) {
			state.logif = true;
		},
		logf (state) {
			state.logif = false;
		}
	},
	actions : {
		getownInfo({commit, state, dispatch}) {
			console.log(state.info);
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
		          	commit("savemegs",res.body.result);
		          }
	        })
		},
		checklog({commit, state, dispatch}) {
			Vue.http.get('http://localhost:8000/users/logif',{
			      credentials : true
			    }).then(function(res) {
			        if(!res.body.error) {
			          commit('saveinfo',res.body.result);
			          commit('logt');
			        }else{
			          commit('clear');
			          commit('logf');
			          sessionStorage.clear();
			        }
			    })
		}
	} 
}