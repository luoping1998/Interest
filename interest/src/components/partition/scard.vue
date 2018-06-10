<template>
	<div class="scard">
		<div class="split" @click="showpub">
			<div class="pub"></div>
			<div class="flag">PUBLISHED</div>
			<div class="num">{{infor.msgnum}}</div>
		</div>
		<div class="split" @click="showfans">
			<div class="icon"></div>
			<div class="flag">FOLLOWERS</div>
			<div class="num">{{infor.fansnum}}</div>
		</div>
		<div class="split" style="border:none;" @click="showstars">
			<div class="folling"></div>
			<div class="flag">FOLLOWING</div>
			<div class="num">{{infor.starnum}}</div>
		</div>
		</div>
	</div>
</template>

<script>
export default {
	name :'scard',
	props : ['infor'],
	methods : {
		showpub() {
			if(this.infor.id === JSON.parse(sessionStorage.getItem("user")).id) {
				this.$router.push({name : 'haspub'});
			}else {
				//跳到用户发表页面
			}
		},
		showfans() {
			this.$router.push({name:'Followme',params : {'u_id':this.infor.id}});
		},
		showstars() {
			this.$router.push({name:'Myfollow',params : {'u_id':this.infor.id}});
		}
	}
}
</script>

<style scoped>
.scard {
	margin:0 auto;
	/*border-top: 1px solid gray;*/
	width: 90%;
	height: 18vh;
	display: flex;
	justify-content: space-around;
}

.scard .split {
	width: 33%;
	height: 100%;
	/*padding-top: 3vh;*/
	border-right: 1px solid gray;
	text-align: center;
}

.split .num {
	width: 90%;
	margin:0 auto;
	height: 30%;
	font-size: 1.5rem;
	line-height: 6vh;
}

.split .icon {
	width: 100%;
	height: 50%;
	background: url('../../../static/myself/fans.png') no-repeat;
	background-position: center;
	background-size: auto 50%;
}

.split .pub {
	width: 100%;
	height: 50%;
	background: url('../../../static/myself/top.png') no-repeat;
	background-position: center;
	background-size: auto 50%;
}

.split .folling {
	width: 100%;
	height: 50%;
	background: url('../../../static/myself/foed.png') no-repeat;
	background-position: center;
	background-size: auto 50%;
}

.split .flag {
	width: 100%;
	height: 20%;
	font-size: 0.6rem;
}

</style>