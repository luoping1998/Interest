<template>
	<div class="fcard" @click.stop = details>
			<div class="fbody">
				<div class="fup">
					<div class="fpic"></div>
					<div class="finfo">
						<div class="fmain">
							<span class="fname">{{item.u_name}}</span>
							<span class="flevel">LV{{item.u_level}}</span>
						</div>
						<div class="fsign">{{item.signature}}</div>
					</div>
					<div class="fbtn" @click.stop="add">关 注</div>
				</div>
			</div>
		</div>
</template>

<script>
export default {
	name :'fcard',
	props : ['item'],
	methods : {
		add() {
			//加关注
			this.$http.get('http://localhost:8000/users/follow',{
				//e_id : 被关注人   star   
				//g_id : 粉丝       fans   
				params : {
					star : this.item.id,
					fans : JSON.parse(sessionStorage.getItem('user')).id
				},
				credentials : true
			}).then(function (res) {
				console.log(res);
				if(res.body.error) {
					//弹框
				}else {
					
				}
			})
		},
		details(){ 
			//查看用户详细信息
			if(this.item.id === JSON.parse(sessionStorage.getItem('user')).id) {
				this.$router.push('/index/myself');
			}else{
				this.$router.push({ name : 'Frinfo' , params : {id : this.item.id}});
			}
			
		}
	}
}
</script>

<style scoped>
.fcard {
	width: 100%;
	height: 20vh;
	/*padding-left: 5vw;*/
}

.fcard .fbody {
	background-color: pink;
	margin:0 auto;
	padding: 3vw;
	width: 80%;
	height: 90%;
	border-radius: 5px;
}

.fup {
	width: 100%;
	height: 60%;
	/*background-color: white;*/
}

.fdown {
	width: 100%;
	height: 40%;
}

.fup .fpic {
	width: 18vw;
	height: 18vw;
	background-color: white;
	border-radius: 90%;
	float: left;
	margin-right: 3vw; 
}

.fup .finfo {
	width: 57vw;
	height: 22vw;
	text-align: left;
	background-color: white;
	float: left;
	line-height: 11vw;
}

.finfo .fmain{
	width: 90%;
	height: 50%;
	line-height: 13vw;
	margin:0 auto;
}

.fmain .fname {
	font-size: 1.4rem;
}

.fmain .flevel {
	font-size: 0.2rem;
	background-color: pink;
	color: white;
	text-align: center;
	padding:0.1rem;
	margin-left: 0.3rem;
	padding-left:0.4rem;
	padding-right:0.4rem;
}
.finfo .fsign {
	width: 95%;
	height: 50%;
	margin:0 auto;
	text-align: left;
	font-size: 0.7rem;
	word-wrap:keep-all;
	white-space:nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 9vw;
} 

.fup .fbtn{
	width: 20%;
	height: 8vw;
	background-color: white;
	float: right;
	margin:2vw;
	font-size: 0.9rem;
	line-height: 8vw;
}
</style>