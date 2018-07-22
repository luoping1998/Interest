<template>
	<div id="index">
		<router-view @try="change"></router-view>
		<i-footer :index="index"></i-footer>
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
	mounted() {
		if(this.index!=0){
			if(this.$store.dispatch({
		      type : 'checklog'
		    })) {
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
	overflow: scroll;
	min-height: 100%;
}
</style>