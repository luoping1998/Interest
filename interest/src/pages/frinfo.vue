<template>
	<div id="frinfo">
		<infor-up :infosrc="infosrc" :bgsrc="bgsrc">
		</infor-up>
		<info-msg :infor="infor" ></info-msg>
	</div>
</template>

<script>
import inforUp from '../components/fmsg_up.vue'
import infoMsg from '../components/fmsg_down.vue'
export default {
  name: 'Frinfo',
  data () {
    return {
      infosrc: '',
      bgsrc:'../../static/zsm.jpg',
      infor : {},
      followed : false
    }
  },
  beforeCreate () {
    //检测有没有登录
    this.$http.get('http://localhost:8000/users/friend',{
      params : this.$route.params,
      credentials : true
    }).then(function(res) {
      if(res.body.error){

      }else {
        this.infor = res.body.result;
        this.infosrc = res.body.pic;
      }
    })
  },
  components : {
  	inforUp,
  	infoMsg
  }
}
</script>

<style scoped>
#frinfo {
	width: 100%;
	height: 90vh;
}
</style>
