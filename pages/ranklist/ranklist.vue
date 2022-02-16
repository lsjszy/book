<template>
	<view>
		<view class="ctitle">
			<text class="fixtitle">{{title}}</text>
		</view>
		<cell :list="booklist"></cell>
		<view class="more">
			<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
			<uni-load-more v-else :status="'nomore'"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		baseURL
	} from "@/utils/http.js";
	export default {
		data() {
			return {
				title: '',
				booklist: [],
				loading: true,
				pageIndex: 1,
				actionid:null,
				type:'',
				id:null,
				title:'',
				flag: false
			}
		},
		onLoad(options) {
			console.log(options)
			this.title=options.title
			this.name = options.name;
			this.actionid=options.actionid;
			this.type=options.Type;
			this.Channel=options.Channel;
			this.id=options.id;
			this.getRankmoreData()
		},
		methods: {
			async getRankmoreData() {
				console.log("aaaaaa")
				let result = await requestGet(baseURL,{
					name:this.name,
					actionid:this.actionid,
					type:this.type,
					Channel:this.Channel,
					id:this.id
				}
					);
				console.log(result)
				this.booklist = [...this.booklist, ...result.ResponseObject[0].module.itemList]
	
			}
		},
		onReachBottom: function() {
			this.pageIndex = this.pageIndex+1;
			console.log("aaaaa")
			this.getRankmoreData()
		},
		onPullDownRefresh(){
			this.flag = false;
			this.booklist = [];
			this.pageIndex = 1;
			this.getRankmoreData().then(()=>{
				uni.stopPullDownRefresh();
			})
		}
	}
</script>

<style lang="less" scoped>
.ctitle {	
		height: 80rpx;
		background-color: #fff;
		text-align: center;
		// border-bottom: 1px solid #d6d6d6;
		.fixtitle{
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;
			background-color: #fff;
			// #ifdef MP-WEIXIN
			position: fixed;
			top: 0;
			left: 0;
			border-bottom: 1px solid #fff9f99e;
			// #endif
		}
	}
	// #ifdef H5
	.ctitle{
		position:sticky;
		top: 88rpx;
		left: 0rpx;
		z-index: 99;
		border-bottom: 1px solid #d6d6d6;
	}
	
	// #endif
</style>
