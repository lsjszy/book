<template>
	<view class="">

		<view v-if="tag" class="root">
			<!-- 个人信息 -->
			<view class="profile">
				<view class="body">
					<view class="notice">
						<view class="title">请先登录</view>
						<view class="text">阅读进度、账号信息跨设备同步</view>
						<!-- #ifdef MP-WEIXIN -->
						<button id="login" hover-class="button-hover" @click="bindGetUserInfo">马上登录</button>
						<!-- #endif -->

						<!-- #ifdef H5 -->
						<view id="login" @click="blogin">马上登录</view>
						<view class="register" @click="register">
							没有账号？马上注册
						</view>
						<uni-popup ref="popup" type="bottom" backgroundColor="#fff">
							<view class="formg">
								<uni-forms :value="loginForm" ref="loginForm" :rules="loginRules"
									validate-trigger="submit">
									<uni-forms-item name="email">
										<text class="loginTitles">邮箱</text>
										<uni-easyinput type="text" v-model="loginForm.email" placeholder="点击输入邮箱">
										</uni-easyinput>
									</uni-forms-item>
									<uni-forms-item name="nickname">
										<text class="loginTitles">昵称</text>
										<uni-easyinput type="text" v-model="loginForm.nickname" placeholder="点击输入昵称">
										</uni-easyinput>
									</uni-forms-item>
									<uni-forms-item name="password">
										<text class="loginTitles">密码</text>
										<uni-easyinput type="text" v-model="loginForm.password" placeholder="点击输入密码">
										</uni-easyinput>
									</uni-forms-item>
									<button  v-if="tlog" @click="goPath(loginForm)">注册</button>
									<button  v-else @click="logPath(loginForm)">登录</button>
									
									<uni-popup ref="popup2" type="center" backgroundColor="#fff">
										<view class="popword">
											{{tsmasg}}√
										</view>
									</uni-popup>
								</uni-forms>
							</view>
						</uni-popup>
						<!-- #endif -->
					</view>
				</view>
			</view>
			<!-- 功能部分 -->
			<view class="function">
				<navigator class="item" url="/pages/help/help">
					<view class="ftitle" >帮助中心</view>
					<uni-icons type="forward" size="20" class="ficon"></uni-icons>
				</navigator>
				<navigator class="item" url="/pages/feedback/feedback">
					<view class="ftitle" >问题反馈</view>
					<uni-icons type="forward" size="20" class="ficon"></uni-icons>
				</navigator>
			</view>
		</view>
		<view v-else class="root2">
			<!-- 个人信息 -->
			<view class="profile"> 
				<view class="body">
					<view class="notice">
						<view class="user">
							<!--  #ifdef MP-WEIXIN -->
							<view class="img">
								<open-data type="userAvatarUrl"></open-data>
							</view>
							<view class="name">
								微信用户：<open-data type="userNickName"></open-data>
							</view>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<uni-icons type="contact" size="80" class="pcion"></uni-icons>
							<view class="name">
								用户：{{uname}}
							</view>
							<!-- #endif -->
						</view>
					</view>
				</view>
			</view>
			<!-- 功能部分 -->
			<view class="function"> 
					<navigator class="item" url="/pages/help/help" hover-class="none">
						<view class="ftitle" >帮助中心</view>
						<uni-icons type="forward" size="20" class="ficon"></uni-icons>
					</navigator>
					<navigator class="item" url="/pages/readhistory/readhistory" hover-class="none">
						<view class="ftitle" >浏览记录</view>
						<uni-icons type="forward" size="20" class="ficon"></uni-icons>
					</navigator>
					<navigator class="item" url="/pages/feedback/feedback" hover-class="none">
						<view class="ftitle" >问题反馈</view>
						<uni-icons type="forward" size="20" class="ficon"></uni-icons>
					</navigator>
					<view class="item">
						<view class="ftitle" @click="logout">退出登录</view>
					</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations,
	} from 'vuex';
	export default {
		data() {
			return {
				uname:'',
				tsmasg:'',
				tlog:true,
				tag: true,
				loginForm: {
					email: '',
					nickname: '',
					password: ''
				},
				// 密码登录校验规则
				loginRules: {
					email: {
						rules: [{
							required: true,
							errorMessage: '请输入邮箱'
						}, {
							validateFunction: function(rule, value, data, callback) {
								var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
								if (re.test(value)) {
									callback()
								} else {
									callback('邮箱格式不正确！');
								}
							}

						}]
					},
					nickname: {
						rules: [{
							required: true,
							errorMessage: '请输入昵称'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入密码',
						}, {
							validateFunction: function(rule, value, data, callback) {
								if (value.length > 20 || value.length < 6) {
									callback('密码长度在6-20位！')
								} else {
									callback();
								}
							}
						}]
					}
				}

			}
		},
		computed: {
			...mapState(["code"]),
		},
		// created() {
		// 	if (this.code.length >= 1) {
		// 		console.log("存在code")
		// 		// this.tag = false;
		// 	}
		// },
		methods: {
			// #ifdef MP-WEIXIN
			...mapMutations(['addcode']),
			login(authDetail) {
				let _this = this
				uni.login({
					success(res) {
						console.log('获取code成功', res);
						_this.addcode({
							code: res.code
						})
						_this.tag = false
					},
					fail(err) {
						console.log('获取code失败', err)
					}
				})
			},
			bindGetUserInfo(e) {
				if (this.code.length >= 1) {
					console.log("存在code");
					this.tag = false;
					return;
				} else {
					let _this = this
					uni.getUserProfile({
						desc: 'weixin',
						success: res => {
							_this.login(res)
							console.log(res, '授权成功');
						},
						fail: err => {
							console.log(err, '失败授权')
						}
					})
				}

			},
			
			// #endif
			logout() {
				this.tag = true
			},
			// #ifdef H5
			register() {
				this.tlog=true;
				this.$refs.popup.open('center')
			},
			blogin(){
				this.tlog=false;
				this.$refs.popup.open('center')
			},
			// 登录请求
			logPath(validateForm) {
				var _this = this;
				console.log(validateForm, "aaaaa")
				uni.request({
					url: "/login",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					method: "POST",
					data: validateForm,
					success: function(res) {
						console.log(res.data, "rrrrrrrr");
						_this.tsmasg="登录成功";
						_this.uname=_this.loginForm.nickname;
						_this.loginForm.email = _this.loginForm.nickname = _this.loginForm.password = ''
						_this.$refs.popup2.open("center");
						
						setTimeout(()=>{
							_this.$refs.popup2.close()
							_this.$refs.popup.close()
							_this.tag=false;
						},1000)
						
					},
					fail: function(err) {
						console.log(err)
					}
			
				})
			
			},
			// 注册请求
			goPath(validateForm) {
				var _this = this;
				console.log(validateForm, "aaaaa")
				var msg = validateForm
				uni.request({
					url: "/register",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					method: "POST",
					data: validateForm,
					success: function(res) {
						console.log(res.data, "rrrrrrrr");
						_this.tsmasg="注册成功";
						_this.loginForm.email = _this.loginForm.nickname = _this.loginForm.password = ''
						_this.$refs.popup2.open("center");
						_this.tlog=false;
					},
					fail: function(err) {
						console.log(err)
					}

				})

			}
			// #endif
		}

	}
</script>

<style lang="less" scoped>
	.pcion{
		margin-right: 100rpx;
	}
	.popword{
		width:200rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border: 2rpx solid #eee;
	}
	uni-forms-item {
		display: flex
	}

	.formg {
		width: 600rpx;
		height: 600rpx;
		padding: 20rpx;
		border: 8rpx solid #e4a4d3;
		border-radius: 4rpx;
	}

	.profile {
		padding-top: 10rpx;
		height: 350rpx;
		background-color: #d5a3c9;

		.body {
			height: 350rpx;
			margin-top: 10rpx;
			background-color: #ffffff;
			border-radius: 50rpx 50rpx 0 0;
			box-shadow: 0 -5rpx 20rpx #D09EC4;

			.notice {
				position: absolute;
				width: 690rpx;
				height: 280rpx;
				background-color: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				margin: 40rpx 0rpx 30rpx 30rpx;
				box-shadow: 0 5rpx 20rpx #FFD0F6;

				.title {
					width: 690rpx;
					margin-top: 40rpx;
					text-align: center;
					font-size: 16px;
					color: #3C3C3C;
				}

				.text {
					width: 690rpx;
					margin-top: 15rpx;
					text-align: center;
					font-size: 12px;
					color: #6C6C6C;
				}

				#login {
					width: 600rpx;
					height: 80rpx;
					margin-top: 20rpx;
					border-radius: 40rpx;
					background: linear-gradient(to right, #E6B4E6, #FAC8FA);
					font-size: 16px;
					color: #ffffff;
					text-align: center;
				}

				// #ifdef H5
				#login {
					width: 600rpx;
					height: 80rpx;
					line-height: 80rpx;
					// margin-top: 20rpx;
					border-radius: 40rpx;
					background: linear-gradient(to right, #E6B4E6, #FAC8FA);
					font-size: 16px;
					color: #ffffff;
					text-align: center;
					margin: 20rpx auto 10rpx;
				}

				.register {
					text-align: center;
					font-size: 24rpx;
					text-decoration: underline;
					color: #6A6A6A
				}

				// #endif

			}
		}
	}

	.function {
		.item {
			height: 80rpx;
			line-height: 80rpx;
			width: 100%;
			background-color: #fff;
			display: flex;
			border-bottom: 2rpx solid #EEEEEE;

			.ftitle {
				flex: 6;
				margin-left: 30rpx;
			}

			.ficon {
				flex: 1;
			}
		}

	}

	.button-hover {
		opacity: 0.7;
		background: linear-gradient(to right, #E6B4E6, #FAC8FA);
	}

	.root2 {
		height: 100%;

		.profile {
			padding-top: 10rpx;
			height: 270rpx;
			background-color: #d5a3c9;

			.body {
				height: 270rpx;
				margin-top: 10rpx;
				background-color: #ffffff;
				border-radius: 50rpx 50rpx 0 0;
				box-shadow: 0 -5rpx 20rpx #d09ec4;

				.notice {
					position: absolute;
					width: 690rpx;
					height: 200rpx;
					margin-left: 20rpx;
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					margin: 40rpx 0rpx 30rpx 30rpx;
					box-shadow: 0 5rpx 20rpx #ffd0f6;

					.user {
						position: absolute;
						width: 690rpx;
						margin: 20rpx 0 0 20rpx;
						color: #3c3c3c;

						.img {
							overflow: hidden;
							display: block;
							width: 100rpx;
							height: 100rpx;
							border-radius: 100rpx;
							border: 2rpx solid #d09ec4;
							margin-top: 20rpx;
						}

						.name {
							font-size: 16px;
							margin-top: -75rpx;
							margin-left: 120rpx;
							// #ifdef H5
							margin-left: 4.75rem;
							// #endif
						}
					}
				}
			}
		}



		button {
			flex: 1;
			height: 80rpx !important;
			width: 650rpx !important;
			text-align: left !important;
			font-size: 14px !important;
			color: #272727 !important;
			background-color: #fff !important;
			border: none !important;
			margin: 0 !important;
			padding: 0;

			&::after {
				border: none !important;
			}
		}


		.button-hover {
			opacity: 0.7;
			background: linear-gradient(to right, #e6b4e6, #fac8fa);
		}
	}
</style>
