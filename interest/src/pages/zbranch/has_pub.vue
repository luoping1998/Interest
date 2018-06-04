<template>
	<div id="pubed">
		<card v-for="item in pubed" :info.sync="item" :imgsrc="pic" :show="true" @toupd="toUpdate"></card>
	</div>
</template>

<script>
import {bus} from '../../../static/js/bus.js'
import card from '../../components/card.vue'
let formName = false;
export default{
	name : 'pub',
	components : {
		card
	},
	data() {
		return {
			pubed : JSON.parse(sessionStorage.getItem('send')),
			pic : sessionStorage.getItem('pic')
		}
	},
	methods : {
		toUpdate() {
	      var myData = {
	        'id' : JSON.parse(sessionStorage.getItem('user')).id
	      };
	      this.$http.get('http://localhost:8000/msgs/get_msg', {
	        params : myData,
	        credentials : true}).then(function(res) {
	          if(res.body.error) {
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
	          }else {
	            sessionStorage.setItem('send',JSON.stringify(res.body.result));
	            this.pubed = res.body.result;
	          }
	        })
	    }
	},
	created() {
		if(formName === 'topub'){
			this.toUpdate();
		}
	},
	beforeRouteEnter(to, from, next) {
		formName = from.name;
		next();
	}
}
</script>

<style scoped>
#pubed {
	width: 100%;
	margin-bottom:60%;
	height:auto;
}
</style>