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
      infosrc: '../../../static/pdx.jpg',
      bgsrc:'../../../static/zsm.jpg',
      infor : {}
    }
  },
  methods : {
    toUpdate() {
      this.$http.get('http://localhost:8000/users/friend',{  
        params : {
          id : JSON.parse(sessionStorage.getItem('user')).id
        },
        credentials : true
      }).then(function (res) {
        if(res.body.error) {
          bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
        }else {
          sessionStorage.setItem('user',JSON.stringify(res.body.result));
          this.infor = res.body.result;
        }
      })
    }
  },
  created () {
    bus.$on('updmy',this.toUpdate);
    this.$emit('try',2);
    var user = JSON.parse(sessionStorage.getItem('user'));
    this.infosrc = sessionStorage.getItem('pic');
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
