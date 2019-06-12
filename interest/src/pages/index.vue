<template>
	<div id="index">
		<router-view @try="change" />
		<i-footer :index="index" />
	</div>
</template>

<script>
import iFooter from '../components/footer.vue';
export default {
	name :'index',
	components : {
		iFooter
	},
	data(){
		return {
			index : 0
		}
	},
	methods : {
		change(i) {
			this.index = i;
		}
	},
	beforeCreate() {
		if(this.index){
			const log = this.$store.dispatch({ type : 'checklog' });
			if(log) {
		    this.$store.dispatch({
		      type : 'getprompts'
		    });
		  }
		}
	}
}
</script>

<style>
#index {
	width: 100%;
	height: 100%;
  position: relative;
}
</style>