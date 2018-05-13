<template>
	<div id="login">
		<div class="cover">
			<div class="up-logo">
				<div class="inter"></div>
				<p>Enjoy everything and keep interesting</p>
			</div>
			<div class="up-info" v-show = "show">
				<v-btn bgcolor="white" bdcolor="white" color="rgb(35,112,153)" words="Log in with Email" @click.native = "withEmail">
				</v-btn>
				<v-btn bgcolor="rgb(35,112,153)" bdcolor="rgb(35,112,153)" color="white" words="Log in with Username">
				</v-btn>
				<p>Don't have an account ?</p>
				<v-btn bgcolor="rgba(0,0,0,0)" bdcolor="white" color="white" words="Sign up">
				</v-btn>
			</div>
			<div class="withe" v-show="withe">
				<input type="text" placeholder="E-mail">
				<input type="password" placeholder="Password">
				<v-btn bgcolor="white" bdcolor="white" color="rgb(35,112,153)" words="To Login"></v-btn>
			</div>
			<div class="skip" @click = "skip">skip</div>
		</div>
	</div>
</template>

<script>
import vBtn from '../components/partition/vbtn.vue'
export default {
	name : 'Login',
	components : {
		vBtn
	},
	methods : {
		skip() {
			this.$router.push('/home');
			this.$emit('toshow');
		},
		withEmail() {
			this.withe = true;
			this.show = false;
		}
	},
	data() {
		return {
			withe : false,
			withu : false,
			show : true
		}
	}
}
</script>

<style scoped>
#login {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100vh;
	color: white;
	background-image: url('../../static/log_bg.jpg');	
	background-size: auto 100%;
	background-position: center;
}
#login .cover {
	width: 100%;
	height: 100%;
	background-color: rgba(155,230,250,0.2);
}

.cover .up-logo {
	width: 100%;
	height: 50%;
	overflow: hidden;
}

.cover .withe {
	width: 100%;
	height: 50%;
	overflow: hidden;
}

.up-logo .inter {
	width: 100%;
	height: 10vh;
	margin-top: 17vh;
	background: no-repeat URL('../../static/inter2.png');	
	background-size: 60% auto;
	background-position: center;
}

#login p {
	margin-top: 5vh;
}

#login .skip {
	text-decoration: underline;
	display: block;
	width: 16vw;
	height: 3vh;
	margin-top: 2vh;
	float: right;
}

#login input {
	border: none;
	margin-top: 1vh;
	margin-bottom: 3vh;
	border-bottom: 1px solid white;
	height: 8vh;
	width: 73vw;
	line-height: 8vh;
	color: white;
	text-align: center;
	outline: none;
	font-size: 1rem;
	background-color: rgba(0,0,0,0);
}

input::-webkit-input-placeholder{
    color:white;
}
input::-moz-placeholder{
    color:white;
}
input:-moz-placeholder{
    color:white;
}
input:-ms-input-placeholder{
    color:white;
}
</style>