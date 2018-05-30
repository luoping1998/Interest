<template>
	<div id="pubed">
		<card v-for="item in pubed" :info="item" :imgsrc="pic"></card>
	</div>
</template>

<script>
import card from '../../components/card.vue'
export default{
	name : 'pub',
	components : {
		card
	},
	data() {
		return {
			pubed : [],
			pic : sessionStorage.getItem('pic')
		}
	},
	beforeCreate() {
		var myData = {
			id : JSON.parse(sessionStorage.getItem('user')).id
		};
		this.$http.get('http://localhost:8000/msgs/get_msg',{
			params : myData,
			credentials : true}).then(function(res){
				console.log(res);
				if(res.body.error) {

				}else {
					this.pubed = res.body.result;
				}
			})
	}
}
</script>

<style scoped>
#pubed {
	width: 100%;
	height:80%;
}
</style>