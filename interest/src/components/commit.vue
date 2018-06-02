<template>
	<div class="commit">
		<div class="co-pic" :style="note"></div>
		<div class="co-info">
			<div class="co-name">{{info.u_name}}</div>
			<div class="co-date">{{info.date}}</div>
			<div class="co-content">{{info.commit}}</div>
		</div>
	</div>
</template>

<script>
export default {
	name : 'commit' ,
	props : ['info'],
	created() {
		this.note = {
			background: "url(" + this.info.pic + ") no-repeat",
            backgroundPosition: "center",
            backgroundSize: "100% auto"
         }
	},
	data() {
		return {
			note : {}
		}
	}
}
</script>

<style scoped>
.commit {
	width: 90%;
	height: 5rem;
	padding:0.6rem;
}

.commit .co-pic {
	width:3rem;
	height: 3rem;
	margin-bottom: 2rem;
	float: left;
	background-color: pink;
}

.commit .co-info {
	width: 78%;
	/*padding : 0.8rem;*/
	padding-bottom: 0;
	height: 100%;
	margin-left: 1rem;
	float: left;
}

.co-info .co-name {
	width: 100%;
	height: 2rem;
	text-indent: 0.3rem;
	font-size: 1.3rem;
	line-height: 2rem;
}

.co-info .co-date {
	width: 100%;
	height: 1rem;
	line-height: 1rem;
	color: gray;
	font-size: 0.8rem;
}

.co-info .co-content {
	width: 100%;
	height: 2rem;
	/*background-color: pink;*/
	line-height: 2rem;
	font-size: 1rem;
	overflow: hidden;
}
</style>