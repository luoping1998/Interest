<template>
	<div id = "fpass">
		找回密码页面
	</div>	
</template>

<script>
import {isMail} from '../../../static/common.js'
import {isLegal} from '../../../static/common.js'
import {isRange} from '../../../static/common.js'
import vBtn from '../../components/partition/vbtn.vue'

export default {
	name : 'fpass',
	components : {
		vBtn
	},
	methods : {
		back() {
			this.$router.push('/login');
		}
	}
}
</script>

<style scoped>
#fpass{
	width: 100%;
	height: 100%;
	background: url('../../../static/log_bg.jpg') no-repeat;
	background-position: center;
	background-size: auto 100%;
	color: white;
	overflow: hidden;
}

</style>