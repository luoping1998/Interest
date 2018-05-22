<template>
	<div>
		<h1>暂定</h1>
	</div>
</template>

<script>
export default {
  name: 'Zanding',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
  	this.$emit('try',1);
  }
}
</script>

<style scoped>

</style>
