<template>
	<div id="myself">
		<infor-up :infosrc="infosrc" :bgsrc="bgsrc">
		</infor-up>
		<info-msg :infor = "infor"></info-msg>
	</div>
</template>

<script>
import { bus } from '../../../static/js/bus.js'
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
    infosrc() {
      return this.$store.state.selfinfo.pic;
    },
    infor() {
      return this.$store.state.selfinfo.info;
    }
  },
  created () {
    this.$store.dispatch({
      type : 'checklog'
    });
    if(this.$store.state.selfinfo.logif) {
      this.$emit('try',2);
    }else {
      this.$store.commit('showpop',{'popif':true,'words':'你还没有登录哦','type' : 0});
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
	height: 90vh;
}
</style>
