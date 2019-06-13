<template>
	<div class="reply">
		<div class="r-head">
			<div class="r-pic" :style="note" @click.stop="showmore" />
			<div class="r-info">
				<p class="r-name">{{info.u_name}}</p>
				<p class="r-date">{{new Date(info.r_date).Format("yyyy-MM-dd HH:mm:ss")}}</p>
			</div>
		</div>
		<div class="r-cotent">{{info.r_cont}}</div>
	</div>
</template>

<script type="text/javascript">
export default {
	name : 'reply',
	props : ['info','pic'],
	computed : {
		note () {
			return {
				background : 'url(' + this.pic +") no-repeat",
				backgroundSize : '100% auto',
				backgroundPosition : 'center'
			}
		}
	},
	methods : {
		showmore() {
			let u_id = this.info.u_id;
			console.log(this.info,u_id);
			if(this.$store.state.selfinfo.logif	){
				if(u_id === JSON.parse(sessionStorage.getItem('user')).id) {
					this.$router.push('/index/myself');
				}else{
					this.$router.push({ name : 'Frinfo' , params : {id : u_id}});
				}
			}else {
				this.$router.push({ name : 'Frinfo' , params : {id : u_id}});
			}

			
		}
	}
}
</script>

<style scoped>
.reply {
	width: 100%;
	height: auto;
	text-align:left;
	padding: 0.6rem 5%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}

.reply .r-head {
	height: 3.5rem;
	padding-bottom: 0.5rem;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.r-head .r-pic {
	width: 3rem;
	height: 3rem;
	background-color: white;
	margin-right: 1rem;
	border-radius: 50%;
}

.r-head .r-info {
	width: 14rem;
	height: 3rem;
	float: left;
}

.r-info .r-name {
	font-size: 1.2rem;
	font-weight: bold;
	margin: 0;
}

.r-info .r-date {
	font-size: 0.8rem;
	line-height: 1.5rem;
	color: gray;
	margin: 0;
}
.reply .r-cotent {
	font-size: 0.9rem;
	display: flex;
	align-items: center;
	padding-left: 4rem;
}
</style>