<template>
	<div id="myself">
		<infor-up :infosrc="infor.path" :bgsrc="bgsrc" />
		<info-msg :infor = "infor" />
	</div>
</template>

<script>
import inforUp from '../../components/infoup.vue'
import infoMsg from '../../components/infomgs.vue'
export default {
  name: 'Myself',
  data () {
    return {
      bgsrc:'../../../static/zsm.jpg'
    }
  },
  computed : {
    infor() {
      return this.$store.state.selfinfo.info;
    },
    infosrc() {
      return this.$store.state.selfinfo.pic
    }
  },
  created () {
    if(this.$store.state.selfinfo.logif) {
      this.$store.dispatch({
        type : 'getownInfo'
      });
      this.$emit('try',2);
    }else {
      this.$store.commit('showpop',{'popif' : true,'words': "你还没有登录呢",'type' : 0});
			this.$router.push('/login');
    }
  },
  components : {
  	inforUp,
  	infoMsg
  }
}
</script>

<style scoped>
#myself {
	width: 100%;
	height: 100%;
}
</style>
