<template>
	<view>
		<view class="contentbox">
			<view :class="['ranktitle',colortag?'femalecolor':'']">
				<text v-if="flag" class="iconfont icon-huoyan"></text>
				<text v-else class="iconfont icon-renqizhi"></text>
				{{bname}}
			</view>
			<view class="rankcont">
				<view class="contitem" v-for="item in bmodule" :key="item.bookId" >
					<navigator :url="`/pages/bookinfo/bookinfo?id=${item.bookId}`" hover-class="none"
						open-type="navigate">
						<image class="bookimg" :src="item.cover" mode="widthFix">
						</image>
						<view class="bookname">{{item.name}}</view>
						<view :class="['readnum',flag?'': 'score']">
							<text v-if="flag" class="iconfont icon-huoyan"></text>
							<text v-else class="iconfont icon-renqizhi"></text>
							<text v-if="item.readNumText">{{item.readNumText}}</text>
							<text v-if="item.score" >{{item.score}}分</text>
							<text v-if="item.status">{{item.status}}</text>
						</view>
					</navigator>
				</view>
			</view>
			<navigator class="more" :url="`/pages/ranklist/ranklist?${url}&title=${bname}`"
				hover-class="none">查看完整榜单>>></navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ranckCom",
		props:['bmodule','bname','flag','url','colortag'],
		data() {
			return {

			};
		}
	}
</script>

<style lang="less" scoped>
.contentbox {
	width: 90%;
	margin: 20rpx auto;
	padding-bottom: 20rpx;
	background-color: #fff;
	border-radius: 30rpx;
	overflow: hidden;
	border: 1px solid #ccc;
	.femalecolor{
		background-color: rgba(235, 195, 221)!important;
	}
	.feico{
		color: #9e658b!important;
	}
	.ranktitle {
		padding: 10rpx 0;
		text-align: center;
		background-color: rgba(201, 195, 236, 0.6);
		border-radius: 0 0 50% 50%;
		.icon-renqizhi{
			color: blue
		}
		.icon-huoyan {
			color: red;
		}
		
	}
	.rankcont {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 20rpx;
		.contitem {
			width: 50%;
			text-align: center;

			.bookname {
				font-size: 16px;
				color: rgb(99, 93, 93);
				padding: 20rpx 0;
			}
			image {
				width: 40%;
			}
			&:first-of-type {
				width: 100%;
				margin: 50rpx;
			}
			.readnum {
				font-size: 12px;
				color: red;
			}
			.score{
				color: rgb(69, 69, 243)!important;
			}
			
		}
	}
	.more {
		text-align: center;
		font-size: 14px;
		color: #aaa;
		margin: 20rpx 0;
	}
}

</style>
