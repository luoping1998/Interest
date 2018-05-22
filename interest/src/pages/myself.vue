<template>
	<div id="myself">
		<infor-up :infosrc="infosrc" :bgsrc="bgsrc">
		</infor-up>
		<info-msg :infor = "infor"></info-msg>
	</div>
</template>

<script>
import inforUp from '../components/infoup.vue'
import infoMsg from '../components/infomgs.vue'
export default {
  name: 'Myself',
  data () {
    return {
      infosrc: '../../static/pdx.jpg',
      bgsrc:'../../static/zsm.jpg',
      infor : {}
    }
  },
  mounted () {
    //检测有没有登录
    this.$emit('try',2);
    var user = JSON.parse(sessionStorage.getItem('user'));
    if(user) {
      this.infor = user;
    }else {
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
