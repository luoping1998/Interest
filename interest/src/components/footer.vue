<template>
	<div id="s-footer">
      <router-link to="/home" class="s-link" >
      	<icon ref="icon" words="吐槽" :now="hSrc" index="0" @emitothers="change"></icon>
      </router-link>
      <router-link to="/zanding" class="s-link">
      	<icon ref="icon" words="暂定" :now="wSrc" index="1" @emitothers="change"></icon>
      </router-link>
      <router-link to="/myself" class="s-link" @click.native="checkStatus">
      	<icon ref="icon" words="我的" :now="mSrc" index="2" @emitothers="change"></icon>
      </router-link>   
    </div>
</template>

<script>
import icon from './partition/icon.vue'
export default {
	name :'sFooter',
	data : function() {
		return {
			acSrc : ['../../static/a-home.png','../../static/a-home.png','../../static/a-home.png'],
			nmSrc : ['../../static/n-home.png','../../static/n-home.png','../../static/n-home.png'],
			hSrc : '../../static/a-home.png',
			wSrc : '../../static/n-home.png',
			mSrc : '../../static/n-home.png',
		}
	},
	components : {
		icon
	},
	methods : {
		change : function(i) {
			this.hSrc = this.nmSrc[0];
			this.wSrc = this.nmSrc[1];
			this.mSrc = this.nmSrc[2];
			if(i == 0){
				this.hSrc = this.acSrc[0];
			}else if(i == 1){
				this.wSrc = this.acSrc[1];
			}else {
				this.mSrc = this.acSrc[2];
			}
		},
		checkStatus : function() {
			console.log(this.$root.infor);
		}
	}
}
</script>

<style scoped>
.router-link-active {
    text-decoration: none;
    background-color: white;
}

#s-footer {
	width: 100%;
	background-color: pink;
	position: fixed;
	bottom: 0;
	right: 0;
	height: 10vh;
}

#s-footer .s-link {
	width: 33.3%;
	height: 100%;
	float: left;
	font-size: 0.9rem;
}
</style>