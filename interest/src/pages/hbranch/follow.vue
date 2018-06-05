<template>
	<div id="follow">
		<card v-for = "(item,index) in infors" :info = "item" :show="false" :imgsrc="pics[index]"></card>
	</div>
</template>
<script>
import {bus} from '../../../static/js/bus.js'
import card from '../../components/card.vue'
export default {
	name : 'Follow',
	components: {
		card
	},
	data: function() {
		return {
			infors : [],
			pics : []
		}
	},
	beforeCreate() {
		this.$http.get('http://localhost:8000/msgs/getfmsg',{credentials : true }).then(function(res) {
				console.log(res.body);
				if(res.body.error){
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
				}else {
					this.infors = res.body.result;
					this.pics = res.body.pics;
				}
			})
	}
}
</script>

<style scoped>
#follow {
	width: 100%;
	height: auto;
	padding-bottom: 20%;
	overflow: scroll;
}
</style>
