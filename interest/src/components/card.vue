<template>
	<div class="card" @click="showdetails">
		<div class="i-up">
			<div class="i-img" :style="note"></div>
			<div class="i-info">
				<div class="i-id">{{info.u_name}}</div>
				<div class="i-date">{{info.date}}</div>
			</div>
		</div>
		<div class="i-down">
			<div class="i-msg">
				{{info.content}}
			</div>
			<div class="i-choice">
				<i-con :nsrc="nShare" :asrc="aShare"></i-con>
				<i-con :nsrc="nComent" :asrc="aComent"></i-con>
				<i-con :nsrc="nLike" :asrc="aLike"></i-con>
			</div>
		</div>
	</div>
</template>

<script>
import iCon from './partition/i-like.vue'
export default {
	name : 'card',
	components:{
		iCon
	},
	props:['imgsrc','info'],
	data: function() {
		return {
			nLike : '../../../static/icons/n-like.png',
			aLike : '../../../static/icons/a-like.png',
			nShare : '../../../static/icons/n-share.png',
			aShare : '../../../static/icons/a-share.png',
			nComent :'../../../static/icons/n-coment.png',
			aComent :'../../../static/icons/a-coment.png',
			note : {
				backgroundImage: "url(" + this.imgsrc + ")",
            	backgroundRepeat: "no-repeat",
            	backgroundSize: "100% auto",
            	backgroundPosition: "center"
			}
		}
	},
	methods : {
		showdetails() {

		}
	}
}
</script>

<style scoped>
.card {
	width: 80%;
	height: 11rem;
	background-color: white;
	margin:3vh auto;
	border-radius: 10px;
	padding: 10px;
	border: 1px solid lightgray;
}

.card .i-up {
	width: 100%;
	height: 40%;
}

.i-up .i-img {
	width: 4rem;
	height: 4rem;
	float: left;
	border-radius: 50%;
}

.i-up .i-info {
	width: 60%;
	height: 100%;
	text-align: left;
	float: left;
	line-height: 2.4rem;
	text-indent: 15px;
}

.i-info .i-id {
	width: 100%;
	height: 50%;
	font-weight: bold;
}

.i-info .i-date {
	width: 100%;
	height: 50%;
	line-height: 1rem;
	font-size: 0.6rem;
	color: gray;
}

.card .i-down {
	width: 100%;
	height: 60%;
}

.i-down .i-msg {
	width: 90%;
	height: 62%;
	margin:0 auto;
	border: 1px solid lightgray;
	font-size: 0.9rem;
	text-align:left;
	line-height: 1.4rem;
	padding: 0.4rem;
}

.i-down .i-choice {
	width: 100%;
	height: 34%;
}

.i-choice .i-icon {
	width: 1.8rem;
	height: 1.8rem;
	margin-top:0.2rem;
	margin-right: 0.5rem;
	float: right;
}

</style>