<template>
	<div id="prompt">
		<p-head></p-head>
		<busy v-if="!ok"></busy>
		<div v-if="ok">
			<one-prom v-for="(item,index) in proms" :pinfo="item" :key="item.p_id" :pic="pics[index]"></one-prom>	
		</div>
		
	</div>
</template>

<script type="text/javascript">
import oneProm from '../../components/one_prom.vue'
import pHead from '../../components/l-head.vue'
import busy from '../../components/busy.vue'
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
		},
		ok() {
			return this.$store.state.selfinfo.prmok;
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