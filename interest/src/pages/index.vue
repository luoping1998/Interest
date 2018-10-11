<template>
	<div id="index">
		<!-- <keep-alive> -->
			<router-view @try="change"></router-view>
		<!-- </keep-alive> -->
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
  	position: relative;
}
</style>