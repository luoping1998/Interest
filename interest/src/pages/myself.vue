<template>
	<div id="myself">
		<infor-up :infosrc="infosrc" :bgsrc="bgsrc">
		</infor-up>
		<info-msg></info-msg>
	</div>
</template>

<script>
import inforUp from '../components/infoup.vue'
import infoMsg from '../components/infomgs.vue'
export default {
  name: 'Myself',
  data () {
    return {
      infosrc: '../../static/info.png',
      bgsrc:'../../static/bg.png',
      id: '',
      level: '',
      email : '',
      sended : []      
    }
  },
  // mounted () {
  //   //检测有没有登录
  //   if(document.cookies) {
  //     console.log('err');
  //   }else {
  //     console.log('hhh');
  //     this.$router.push('/login');
  //   }
  // },
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
