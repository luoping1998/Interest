<template>
	<div id="search">
		<s-leader words="输入你要查询的关键字"></s-leader>
	</div>
</template>

<script>
import sLeader from '../../components/partition/sleader.vue'
export default {
	name :'search',
	components : {
		sLeader
	}
}
</script>