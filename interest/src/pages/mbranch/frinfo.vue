<template>
	<div id="frinfo">
    <busy v-if="!ok"></busy>
      <infor-up :infosrc="infosrc" :bgsrc="bgsrc" v-if="ok" />
	   	<info-msg :infor="infor" v-if="ok" />
  </div>
</template>

<script>
import inforUp from '../../components/fmsg_up.vue'
import infoMsg from '../../components/fmsg_down.vue'
import busy from '../../components/busy.vue'
export default {
  name: 'Frinfo',
  data () {
    return {
      infosrc: '',
      bgsrc:'../../static/zsm.jpg',
      infor : {},
      followed : false,
      ok : false
    }
  },
  mounted () {
    //检测有没有登录
    this.ok = false;
    this.$http.get('http://139.199.205.91:8000/users/friend',{
      params : this.$route.params,
      credentials : true
    }).then(function(res) {
      this.ok = true;
      if(res.body.error){
          this.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
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
	height: 100%;
}
</style>
