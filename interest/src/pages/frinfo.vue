<template>
	<div id="frinfo">
		<infor-up :infosrc="infosrc" :bgsrc="bgsrc">
		</infor-up>
		<info-msg :infor="infor" :followed="followed"></info-msg>
	</div>
</template>

<script>
import inforUp from '../components/fmsg_up.vue'
import infoMsg from '../components/fmsg_down.vue'
export default {
  name: 'Frinfo',
  data () {
    return {
      infosrc: '../../static/pdx.jpg',
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
        this.infor = res.body.result[0];
      }
    })
  },
  mounted() {
    this.$http.get('http://localhost:8000/users/chfollow', {
      params : {
        'star' : this.$route.params.id,
        'fans' : JSON.parse(sessionStorage.getItem('user')).id
      },
      credentials :true
    }).then(function(res) {
      if(res.body.error) {
        this.followed = false;
      }else {
        if(res.body.result.length == 0) {
          this.followed = false;
        }else {
          this.followed = true;
        }
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
