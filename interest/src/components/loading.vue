<template>
	<div class="loading"></div>
</template>

<script>
export default {
	name : 'loading',
    props : ['text'],
    computed : {
        inner (){
            return this.text;
        }
    }
}
</script>

<style scoped>
 .loading {
    width: 100%;
    height: 0;
    transition:height 1s;
    text-align: center;
    color: #cb153d;
    -webkit-transition:height 1s;
    overflow: hidden;
    background:url('../../static/action.gif') no-repeat;
    background-position:bottom;
    background-size: 30% auto;
}
</style>