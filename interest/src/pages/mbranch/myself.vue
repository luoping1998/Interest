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
    this.$store.dispatch({
      type : 'checklog'
    });
    this.$emit('try',2);
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
