<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
			activeColor="#9e658b" class="posi"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0">
				<ranckCom :bmodule="malehot" :bname="malehotname" :flag="flag" :url="malehoturl"></ranckCom>
				<ranckCom :bmodule="malepop" :bname="malepopname" :flag="!flag" :url="malepopurl"></ranckCom>
			</view>
			<view v-show="current === 1">
				<ranckCom :bmodule="femalehot" :bname="femalehotname" :flag="flag" :url="femalehoturl" :colortag="colortag"></ranckCom>
				<ranckCom :bmodule="femalepop" :bname="femalepopname" :flag="!flag" :url="femalepopurl" :colortag="colortag"></ranckCom>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		rankURL
	} from "@/utils/http.js";
	export default {
		data() {
			return {
				current: 0,
				items: ['男生', '女生'],
				malehotname: '',
				femalehotname: '',
				malepopname: '',
				femalepopname: '',
				malehot: [],
				malehoturl: "",
				femalehot: [],
				femalehoturl: "",
				malepop: [],
				malepopurl: "",
				femalepop: [],
				femalepopurl: "",
				flag: true,
				colortag:true

			}
		},
		onLoad() {
			this.getRankData()
		},
		methods: {
			onClickItem(e) {
				console.log(e)
				this.current = e.currentIndex
			},
			async getRankData() {

				const result = await requestGet(rankURL);
				// console.log(result.ResponseObject[0].module[0].itemList.bookList);
				console.log(result);
				this.malehotname = result.ResponseObject[0].module[0].name;
				this.femalehotname = result.ResponseObject[0].module[1].name;
				this.malepopname = result.ResponseObject[0].module[2].name;
				this.femalepopname = result.ResponseObject[0].module[3].name;

				this.malehot = result.ResponseObject[0].module[0].itemList.bookList;
				this.femalehot = result.ResponseObject[0].module[1].itemList.bookList;
				this.malepop = result.ResponseObject[0].module[2].itemList;
				this.femalepop = result.ResponseObject[0].module[3].itemList;

				this.malehoturl = result.ResponseObject[0].module[0].more.slice(10);
				this.femalehoturl = result.ResponseObject[0].module[1].more.slice(10);
				this.malepopurl = result.ResponseObject[0].module[2].more.slice(10);
				this.femalepopurl = result.ResponseObject[0].module[3].more.slice(10)

			}
		}
	}
</script>

<style lang="less" scoped>
.posi{
	background-color: #e3dae9;
	// #ifdef H5
	position: sticky; 
	top:88rpx;
	// #endif
	// #ifdef MP-WEIXIN
	width: 100%;
	position: fixed;
	top: 0;
	// #endif
	z-index: 99;
}
// #ifdef MP-WEIXIN
.content{
	padding-top: 60rpx;
}
// #endif
</style>
