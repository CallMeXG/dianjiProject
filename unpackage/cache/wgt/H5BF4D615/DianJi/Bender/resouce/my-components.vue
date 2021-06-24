<template>
	<div class="hello">
		<p>Hello {{who}}</p>
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
		  <van-swipe-item>1</van-swipe-item>
		  <van-swipe-item>2</van-swipe-item>
		  <van-swipe-item>3</van-swipe-item>
		  <van-swipe-item>4</van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
	
	
	
	module.exports = {
		data() {
			return {
				who: 'world',
				value: 3
			}
		}
	}
</script>

<style scoped="scoped">
	.hello {
		background-color: #ffe;
	}
	.my-swipe .van-swipe-item {
		color: #fff;
		font-size: 20px;
		line-height: 150px;
		text-align: center;
		background-color: #ff5500;
	}
	
	.van-swipe-item-next {
		color: #fff;
		font-size: 20px;
		line-height: 150px;
		text-align: center;
		background-color: #ffaa7f;
	}
</style>
