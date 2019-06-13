<template>
	<div id="add">
		<s-leader @trans = "toshow" words="搜索好友ID、昵称、邮箱"></s-leader>
		<show-fcards :lists = "lists" :pics="pics" />
	</div>
</template>

<script> 
import sLeader from '../../components/partition/sleader.vue'
import showFcards from '../../components/show_fcards.vue'
export default {
	name : 'addFriends',
	components : {
		sLeader,
		showFcards
	},
	methods :{
		toshow (obj) {
			this.lists = obj.lists;
			this.pics = obj.pics
		}
	},
	data() {
		return {
			lists : [],
			pics : []
		}
	}
}
</script>

<style scoped>
#add {
	width: 100%;
	height: 100vh;
}
</style>