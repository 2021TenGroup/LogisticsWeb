<template>
	<!-- 左侧导航栏 -->
	<div class="logo" v-bind:style="{background:this.$store.state.leftcolor , borderBottom:$store.state.leftcolorborder , color:$store.state.fontcolor}">
		<img src="../assets/logo.png" class="el-img-s" :style="{display:this.$store.state.leftimg}" />
		<div class="el-label-s" :style="{display:this.$store.state.leftlable,paddingLeft:20+'px'}">火云物流</div>
		
	</div>
	<el-row class="tac">
		<el-col :span="24">
			<el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :background-color="this.$store.state.leftcolor"
			 :text-color="this.$store.state.leftfontcolor" :active-text-color="this.$store.state.leftactioncolor" :unique-opened="true"
			 :collapse-transition="false" :router="true" :collapse="this.$store.state.isCollapse">
				<!-- <el-menu-item index="/HomePage">
					<i class="el-icon-setting"></i>
					<span slot="title">首页</span>
				</el-menu-item> -->
				<el-submenu index="1">
					<template #title>
						<i class="el-icon-document"></i>
						<span>单证</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/Semester">运单录入</el-menu-item>
						<el-menu-item index="/Years">运单编辑</el-menu-item>
						<el-menu-item index="/Announcement">运单查询</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template #title>
						<i class="el-icon-edit"></i>
						<span>签收</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/FaqQueations">签收录入</el-menu-item>
						<el-menu-item index="/QuDao">签收查询</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3">
					<template #title>
						<i class="el-icon-headset"></i>
						<span>客服</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/ClassType">快件跟踪查询</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template #title>
						<i class="el-icon-s-finance"></i>
						<span>财务</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/AdvancePaymentSetup">预付款设置</el-menu-item>
						<el-menu-item index="/Recharge">预付款充值</el-menu-item>
						<el-menu-item index="/RechargeRecord">充值记录</el-menu-item>
						<el-menu-item index="/ClassType">财务报表明细</el-menu-item>
						<el-menu-item index="/ClassType">财务报表汇总</el-menu-item>
						<el-menu-item index="/ClassType">现金账单</el-menu-item>
						<el-menu-item index="/ClassType">月结账单</el-menu-item>
						<el-menu-item index="/ClassType">代收货款查询</el-menu-item>
						<el-menu-item index="/ClassType">代收货款管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="5">
					<template #title>
						<i class="el-icon-s-order"></i>
						<span>订单</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/BookMent">订单分配</el-menu-item>
						<el-menu-item index="/TextBookRK">订单查询</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="6">
					<template #title>
						<i class="el-icon-price-tag"></i>
						<span>仓库</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/Payment">入库登记</el-menu-item>
						<el-menu-item index="/OutStanding">入库查询</el-menu-item>
						<el-menu-item index="/Refund">出库登记</el-menu-item>
						<el-menu-item index="/StorageExpenditure">出库查询</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="7">
					<template #title>
						<i class="el-icon-s-operation"></i>
						<span>资料</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/NetWork">网点维护</el-menu-item>
						<el-menu-item index="/Emp">员工维护</el-menu-item>
						<el-menu-item index="/Client">客户维护</el-menu-item>
						<el-menu-item index="/Rule">单号规则</el-menu-item>
						<el-menu-item index="/Grant">单号发放</el-menu-item>
						<el-menu-item index="8-6">提成维护</el-menu-item>
						<el-menu-item index="8-6">固定维护</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="8">
					<template #title>
						<i class="el-icon-setting"></i>
						<span>系统</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/Archives">职位管理</el-menu-item>
						<el-menu-item index="/Dept">用户管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: 'ShowLeft',
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
	.el-submenu [class^="el-icon-"],
	.el-menu-item [class^="el-icon-"] {
		margin-right: 10px;
	}

	.el-submenu .el-menu-item {
		min-width: 0px;
	}

	.el-submenu,
	.el-menu-item {
		margin-left: 0px;
		position: relative;
	}

	.logo {
		position: relative;
		top: 0px;
		height: 64px;
		line-height: 64px;
		cursor: pointer;
	}

	.logo>div {
		font-size: 25px;
		text-align: left;
		padding-left: 40px;
		font-weight: 100;
	}

	.el-col-24 {
		text-align: left;
	}

	.el-img-s {
		width: 40px;
		height: 40px;
		border-radius: 0px;
		margin: 10px 10px 10px 10px;
		float: left;
	}

	.el-label-s {
		display: none;
	}

	.el-menu {
		border: 0px;
	}

	.el-menu-item-group__title {
		padding: 0px;
	}
</style>
