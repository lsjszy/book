<template>
	<view class="body">
		<view class="box">
			<view class="text1">尊敬的客户，您好：
				<view></view>

				<view class="text2">您对我们的小程序还满意吗？欢迎提出意见与建议，我们会认真对待您的反馈，感谢您的关注与支持。</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<button open-type='feedback' type='primary'>问题反馈</button>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<button @click="feedback">问题反馈</button>
			<uni-popup ref="popup" type="bottom">
				<text class="feednone">暂不支持该功能！</text>！
			</uni-popup>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			feedback() {
				this.$refs.popup.open('center');
				var timer=setTimeout(()=>{
					this.$refs.popup.close();
					clearTimeout(timer)
				},1000)
			}
		}
	}
</script>

<style lang="less" scoped>
	.feednone{
		width: 400rpx;
		height: 60rpx;
		background-color: #fff;
		padding: 40rpx;
	}
	.body {
		height: 1205rpx;
		padding-top: 10rpx;
		background-color: #d5a3c9;
	}

	.box {
		height: 1905rpx;
		margin-top: 10rpx;
		background-color: #ffffff;
		border-radius: 50rpx 50rpx 0 0;
		box-shadow: 0 -5rpx 20rpx #D09EC4;



		.text1 {
			font-size: 18px;
			padding: 50rpx 0 0 20rpx;
		}

		.text2 {
			text-indent: 60rpx;
			text-align: left;
			font-size: 16px;
			padding: 30rpx 0 0 0rpx;
		}

		button {
			margin-top: 100rpx;
			width: 600rpx;
			background: linear-gradient(to right, #E6B4E6, #FAC8FA) !important;
		}

	}
</style>
