<template>
	<div class = "one-prom" @click="godetail">
		<div class = "p-head">
			<div class = "p-pic" :style="note" :click.stop="gouser"></div>
			<div class = "p-main">
				<span class = "p-name">
				{{pinfo.uname}} 
				</span>
				{{pinfo.p_type}}
			</div>
		</div>
		<div class = "p-meg" v-if="pinfo.m_cont != null">
			{{pinfo.m_cont}}
		</div>
		<div class = "p-commit" v-if="pinfo.p_cont">
		: {{pinfo.p_cont}}
		</div>
	</div>
</template>

<script type="text/javascript">
//0 关注 | 1 点赞 |  2 评论 | 3 转发   | 4 回复
export default {
	name : 'prom',
	props :['pinfo','pic'],
	methods : {
		gouser() {
			this.$router.push({name : 'Frinfo', params: { id : this.pinfo.u_id}});
		},
		gomes() {
			this.$router.push({name : 'Msgdetails', params: { id : this.pinfo.m_id}});
		},
		gocommit() {
			this.$router.push({name : 'Commitdetail', params: { c_id : this.pinfo.c_id}});
		},
		gotra() {
			this.$router.push({name : 'Msgdetails', params: { id : this.pinfo.n_id}});
		},
		godetail() {
			switch(this.pinfo.t_id) {
				case 0 : 
							this.gouser();
							break; 
				case 1 :
				case 2 :
							this.gomes();
							break; 
				case 3 :
							this.gotra();
							break;
				case 4 :
							this.gocommit();
							break;
			}
		},
	},
	data() {
		return {
			note : {
				background : 'url(' + this.pic +') no-repeat',
				backgroundPosition : 'center',
				backgroundSize : '100% auto'
			}
		}
	}
}
</script>

<style scoped>
.p-name {
	color: #2575fc;
	letter-spacing: 0.1rem;
}

.one-prom {
	margin: 1rem;
	height: auto;
	overflow: hidden;
	text-align: left;
	border: 1px solid lightgray;
	padding:0.5rem;
	cursor: pointer;
}

.one-prom .p-head {
	width: 100%;
	padding-bottom: 0.5rem;
	display: flex;
	align-items: center;
}

.p-head .p-pic {
	width: 2.5rem;
	height: 2.5rem;
}

.p-head .p-main {
	height: 2.5rem;
	font-size: 1rem;
	line-height: 2.5rem;
	text-indent: 0.5rem;
}

.one-prom .p-meg {
	height: 2rem;
	line-height: 2rem;
	font-size: 0.9rem;
	padding:0 0.5rem;
	overflow: hidden;
	text-overflow: ellipsis;
	color: gray;
	background-color: rgba(0,0,0,0.05);
}

.one-prom .p-commit {
	width: 100%;
	height: auto;
	padding-top: 0.5rem;
	font-size: 0.9rem;
	line-height: 1.5rem;
}
</style>