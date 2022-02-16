<template>
	<view>
		<cell :list="populars"></cell>
		<view class="more">
			<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
			<uni-load-more v-else :status="'nomore'"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		listURL,
		homeURL
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				populars: [],
				pageindex: 5,
				flag:false
			}
		},
		onLoad() {
			this.getBannerData();
		},
		methods: {
			async getBannerData() {
				
				let resulth = await requestGet(listURL +this.pageindex);
				console.log(resulth)
				this.populars =[...this.populars,... resulth.ResponseObject[0].module.itemList];
			},
		},
		onReachBottom: function() {
			this.pageindex = this.pageindex+1;
			console.log("aaaaa")
			this.getBannerData()
		},
		onPullDownRefresh(){
			this.flag = false;
			this.populars = [];
			this.pageindex = 5;
			this.getBannerData().then(()=>{
				uni.stopPullDownRefresh();
			})
		}
	}
</script>

<style>

</style>
