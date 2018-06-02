<template>
	<div id="add">
		<s-leader @trans = "toshow" words="搜索好友ID、昵称、邮箱"></s-leader>
		<show-fcards :lists = "lists">
		</show-fcards>
		<!-- <f-card v-for="item in lists">{{item}}</f-card> -->
	</div>
</template>

<script> 
import sLeader from '../../components/partition/sLeader.vue'
import showFcards from '../../components/show_fcards.vue'
import fCard from '../../components/partition/fcard.vue'
export default {
	name : 'addFriends',
	components : {
		sLeader,
		showFcards,
		fCard
	},
	methods :{
		toshow (lists) {
			// console.log('toshow:',lists);
			this.lists = lists;
		}
	},
	data() {
		return {
			lists : []
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