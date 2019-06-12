<template>
	<div class="f-li" @click="showDetails">
		<div class="f-left" :style="note" />
		<div class="f-right">
			<div class="f-name">{{info.u_name}}</div>
			<div class="f-sign">{{info.signature}}</div>
		</div>
	</div>
</template>

<script type="text/javascript">
export default {
	name : 'fli',
	props : ['info','pic','bpath'],
	computed : {
		note() {
			return {
				'background' : 'url('+this.pic +') no-repeat',
				'backgroundPosition' : 'center',
				'backgroundSize' : '100% auto'
			}
		}
	},
	methods : {
		showDetails() {
			if(this.$store.state.selfinfo.logif){
				if(this.info.id === JSON.parse(sessionStorage.getItem("user")).id) {
					this.$router.push({name : 'Myself'});
				}else {
					this.$router.push({ name : 'Frinfo' , params : {id : this.info.id}});
				}
			}else {
					this.$router.push({ name : 'Frinfo' , params : {id : this.info.id}});
			}	
		}
	}
}
</script>

<style>
.f-li {
	width: 100%;
	height: auto;
	border-bottom: 1px solid lightgray;
	letter-spacing: 0.2rem;
	text-align: left;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0.5rem;
	cursor: pointer;
}

.f-li .f-left {
	width: 3.5rem;
	height: 3.5rem;
	margin-right: 0.5rem;
	border-radius: 90%;
}

.f-li .f-right {
	height: 2.3rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.f-right .f-name {
	width: 100%;
	font-size: 1.1rem;
	line-height: 1;
}

.f-right .f-sign {
	width: 100%;
	font-size: 0.7rem;
	line-height: 1;
	letter-spacing: 0.1rem;
	word-wrap: none;
	text-overflow: ellipsis;
	overflow: hidden;
	color: gray;
}
</style>