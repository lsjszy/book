<template>
	<view class="content">
		<!-- 搜索框 -->
		<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
		<!-- 遮盖层 -->
		<uni-popup ref="popup" type="bottom" class="searchcon" backgroundColor="#e2e4ff">
			<template #default>
				<view class="stitle">
					<text class="stext">{{value}}的相关作品如下</text>
					<uni-icons type="closeempty" size="20" color="#AAAAAA" @click="close"></uni-icons>
				</view>
				<scroll-view scroll-y="true" @scrolltolower="lower">
					<cell :list="searchlist"></cell>
					<view class="more">
						<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
						<uni-load-more v-else :status="'nomore'"></uni-load-more>
					</view>
				</scroll-view>
			</template>
		</uni-popup>
		<!-- 轮播图 -->
		<swiper class="swiper" indicator-dots="true" indicator-color="rgba(0,0,0,.3)" autoplay="true" interval="5000"
			duration="1000" circular="true">
			<swiper-item class="swpitem" v-for="item in banner" :key="item.id">
				<navigator url="/pages/list/list" open-type="navigate" hover-class="none">
					<image class="swpimg" :src="item.img" mode="widthFix" lazy-load="true" />
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 宫格 -->
		<uni-grid :column="3" :showBorder="false" @change="girdItemChange">
			<uni-grid-item v-for="(item,index) in slide" :key="item.id" :index="index">
				<text :class="[item.icon ,'iconfont']"></text>
				<text class="text">{{item.name}}</text>
			</uni-grid-item>
		</uni-grid>
		<indexCom :shortps="shortps">
			<template #icon>
				<slot><text class="iconfont icon-jinpai"></text></slot>
			</template>
			<template #title>
				<slot>畅销短篇</slot>
			</template>
		</indexCom>
		<indexCom :shortps="populars">
			<template #icon>
				<slot><text class="iconfont icon-yinpai"></text></slot>
			</template>
			<template #title>
				<slot>人气佳作</slot>
			</template>
		</indexCom>
		<view class="like">
			<view class="btitle">
				<view class="titleTag">
					<text class="iconfont icon-jinpai tongpai"></text>
					猜你喜欢
				</view>
				<view class="bmore">
					<navigator url="/pages/morelist/morelist?id=5" hover-class="none">
						更多
						<text class="iconfont icon-changyong_fanhui"></text>
					</navigator>
				</view>
			</view>
			<cell :list="likelist"></cell>
		</view>
		<view :class="[flag==true?'bottomline':'dis']">
			没有了，我也是有底线的~
		</view>
	</view>

</template>

<script>
	import {
		requestGet,
		bannerURL,
		homeURL,
		searchURL
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				title: 'Hello',
				slide: [{
						id: 0,
						name: "分类",
						url: "/pages/classify/classify",
						icon: "icon-fenlei",
						link: "navigateTo"

					},
					{
						id: 1,
						name: "排行榜",
						url: "/pages/rank/rank",
						icon: "icon-paihangbang",
						link: "navigateTo"

					},
					{
						id: 2,
						name: "听书",
						url: "/pages/listen/listen",
						icon: "icon-yangqitingshu",
						link: "switchTab"

					}

				],
				shortps: [],
				populars: [],
				likelist: [],
				shortpid: null,
				popid: null,
				likeid: null,
				value: null,
				banner: [],
				flag: false,
				searchlist: [],
				pageIndex: 1
			}
		},
		onLoad() {
			this.getBannerData()
		},
		methods: {

			search(e) {
				// 搜索内容
				console.log(e.value);
				this.value = e.value
				this.$refs.popup.open('buttom')
				this.searchlist = [];
				this.getSearchData()
			},
			close() {
				this.$refs.popup.close()
			},
			lower: function(e) {
				console.log(e, "触底了");
				this.pageIndex += 1
				this.getSearchData();
			},
			async getBannerData() {
				let result = await requestGet(bannerURL);
				console.log(result)
				let resulth = await requestGet(homeURL);
				this.banner = result.data.spread[0].advs;
				this.shortps = resulth.ResponseObject[0].Cards[4].Data;
				this.populars = resulth.ResponseObject[0].Cards[3].Data;
				this.likelist = [...resulth.ResponseObject[0].Cards[0].Data, ...resulth.ResponseObject[0].Cards[
					1].Data, ...resulth.ResponseObject[0].Cards[2].Data, ...resulth.ResponseObject[
					0].Cards[5].Data, ...resulth.ResponseObject[0].Cards[6].Data];

			},
			girdItemChange(e) {
				var current = this.slide.find((item, idx) => {
					if (idx === e.detail.index) {
						return true;
					}
				})
				if (current.link == "navigateTo") {
					uni.navigateTo({
						url: current.url
					});
				} else {
					uni.switchTab({
						url: current.url
					})
				}

			},
			async getSearchData() {
				const result = await requestGet(searchURL, {
					keyword: this.value,
					pageIndex: this.pageIndex
				});
				console.log(result, 'aaaaa');
				this.searchlist = [...this.searchlist, ...result.ResponseObject[0].module.bookList] || [];
				var searchList = this.searchlist;
				searchList.forEach(v => {
					v.name = v.name.replace(new RegExp(this.value, "g"),
						"<span style='color: #c74343f6;'>" + this.value + "</span>")
					v.name = `<div class="tp">${v.name}</div>`
					v.author = v.author.replace(new RegExp(this.value, "g"),
						"<span style='color: #c74343f6;'>" + this.value + "</span>")
					v.author = `<div class="tp">${v.author}</div>`
					v.status = v.status.replace(new RegExp(this.value, "g"),
						"<span style='color: #c74343f6;'>" + this.value + "</span>")
					v.status = `<div class="tp">${v.status}</div>`
					v.introduce = v.introduce.replace(new RegExp(this.value, "g"),
						"<span style='color: #c74343f6;'>" + this.value + "</span>")
					v.introduce = `<div class="tp">${v.introduce}</div>`
				});
				this.searchlist = searchList
			},
			onReachBottom: function() {
				this.flag = true;
				console.log("chudil")
			},
		}
	}
</script>

<style lang="less" scoped>
	@import url("~@/common/css/btitle.css");

	.stitle {
		margin: 20rpx 20rpx;
		display: flex;

		.stext {
			flex: 6;

		}

		uni-icons {
			flex: 1;
			text-align: right;
		}
	}

	// #ifdef H5
	scroll-view {
		height: 1450rpx;
		border-radius: 40rpx;
	}

	// #endif
	// #ifdef MP-WEIXIN
	scroll-view {
		height: 92vh;
		border-radius: 40rpx;
	}

	// #endif

	.swiper {
		width: 100%;
		height: 300rpx;
		text-align: center;
		margin-bottom: 20rpx;

		.swpitem {
			width: 100%;

			.swpimg {
				width: 700rpx;
				height: 300rpx;
				border-radius: 20rpx;
			}
		}
	}

	.uni-grid {
		height: 140rpx !important;

	}

	/deep/.uni-grid-wrap {
		height: 140rpx !important;
		text-align: center;
	}

	/deep/.uni-grid-item[data-v-7b4a3849] {
		height: 100%;
		display: flex;
		cursor: pointer;
		height: 70px !important;
	}

	uni-grid {
		height: 140rpx !important;

		/deep/.uni-grid-item {
			height: 140rpx !important;
		}

		uni-grid-item {
			height: 140rpx !important;
			text-align: center;

			/deep/ .uni-grid-item__box {
				height: 140rpx !important;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}
	}

	.like {
		width: 95%;
		margin: 0 auto 20rpx;
	}



	.icon-yangqitingshu {

		color: #e0acff;
		font-size: 60rpx;
	}

	.icon-fenlei {

		color: #ff917b;
		font-size: 70rpx;
	}

	.icon-paihangbang {

		color: #75b3ff;
		font-size: 60rpx;
	}

	.icon-yinpai {
		color: #d8ab39;
		margin-left: 20rpx;
		font-size: 22px;
		margin: 0 18rpx;
	}

	.icon-jinpai {
		color: rgb(240, 225, 22);
		margin-left: 20rpx;
		font-size: 20px;
	}

	.tongpai {
		color: rgb(184, 207, 99);
	}

	.bottomline {
		font-size: 12px;
		color: #aaa;
		text-align: center;
	}
</style>
