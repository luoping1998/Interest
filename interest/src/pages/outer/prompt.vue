<template>
	<div id="prompt">
		<p-head></p-head>
		<one-prom v-for="(item,index) in proms" :pinfo="item" :key="item.p_id" :pic="pics[index]"></one-prom>
	</div>
</template>

<script type="text/javascript">
import oneProm from '../../components/one_prom.vue';
import pHead from '../../components/l-head.vue';
export default {
	name : 'prompt',
	components : {
		oneProm,
		pHead
	},
	computed : {
		proms (){
			return this.$store.state.selfinfo.prompts.result;
		},
		pics (){
			return this.$store.state.selfinfo.prompts.pics;
		}
	}
}
</script>

<style scoped>
#prompt {
	width:100%;
	margin-top: 3rem;
	height: auto;
	overflow: hidden; 
}

</style>