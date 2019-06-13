<template>
	<div class="fcard" @click.stop = details>
		<div class="fpic" :style="note" />
			<div class="finfo">
				<div class="fmain">
					<span class="fname">{{item.u_name}}</span>
					<span class="flevel">LV{{item.u_level}}</span>
				</div>
				<div class="fsign">{{item.signature}}</div>
		</div>
		<div class="fbtn" @click.stop="add">关 注</div>
	</div>
</template>

<script>
export default {
	name :'fcard',
	props : ['item','src'],
	data() {
		return {
			note : {
				background: `url(${this.src}) no-repeat`,
				backgroundPosition: 'center',
				backgroundSize: '100% auto',
				backgroundColor: 'white'
			}
		}
	},
	methods : {
		async add() {
			//加关注
			var params = {
				'star' : this.item.id,
				'fans' : JSON.parse(sessionStorage.getItem('user')).id
			}
			await this.$http.get('http://localhost:8000/users/follow',{
				params : params,
				credentials: true }).then(function (res) {
				if(res.body.error) {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
				}else {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.msg,'type' : 1});
					this.$store.dispatch({
						type : 'getownInfo'
					});
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
	width: 90%;
	height: auto;
	padding: 0.5rem;
	margin: 0 auto;
	margin-bottom: 1rem;
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
}

.fcard .fpic {
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	margin-right: 1rem;
	cursor: pointer;
}

.finfo {
	width: 100%;
	flex: 1;
	text-align: left;
	line-height: 2rem;
}

.fmain .fname {
	font-size: 1.2rem;
}

.fmain .flevel {
	font-size: 0.5rem;
	background-color: #7eb1f5;
	color: white;
	padding: 0.1rem 0.4rem;
	box-sizing: border-box;
}

.finfo .fsign {
	text-align: left;
	font-size: 0.6rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 1rem;
} 

.fbtn{
	height: 1.5rem;
	padding: 0 0.5rem;
	background-color: #7eb1f5;
	color: white;
	font-size: 0.7rem;
	line-height: 1.5rem;
	cursor: pointer;
	align-self: center;
}
</style>