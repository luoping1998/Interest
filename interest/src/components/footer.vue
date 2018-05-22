<template>
	<div id="s-footer">
      <router-link to="/index/home" class="s-link" >
      	<icon ref="icon" words="吐槽" :now="hSrc" index="0" ></icon>
      </router-link>
      <router-link to="/index/msg" class="s-link">
      	<icon ref="icon" words="消息" :now="wSrc" index="1" ></icon>
      </router-link>
      <router-link to="/index/myself" class="s-link">
      	<icon ref="icon" words="我的" :now="mSrc" index="2" ></icon>
      </router-link>   
    </div>
</template>

<script>
import icon from './partition/icon.vue'
export default {
	name :'sFooter',
	props : ['index'],
	data : function() {
		return {
			acSrc : ['../../static/a-home.png','../../static/a-mes.png','../../static/a-user.png'],
			nmSrc : ['../../static/n-home.png','../../static/n-mes.png','../../static/n-user.png'],
			hSrc : '../../static/a-home.png',
			wSrc : '../../static/n-mes.png',
			mSrc : '../../static/n-user.png',
		}
	},
	components : {
		icon
	},
	watch : {
		index (newval, oldval) {
			this.hSrc = this.nmSrc[0];
			this.wSrc = this.nmSrc[1];
			this.mSrc = this.nmSrc[2];
			if(newval == 0){
				this.hSrc = this.acSrc[0];
			}else if(newval == 1){
				this.wSrc = this.acSrc[1];
			}else {
				this.mSrc = this.acSrc[2];
			}
		}
	}
}
</script>

<style scoped>
.router-link-active {
    color: rgb(120,180,250);
}

#s-footer {
	border-top: 1px solid rgb(200,200,200);
	width: 100%;
	background-color: white;
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