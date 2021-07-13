<template>
	<div>
		<el-breadcrumb separator="/" style="margin-top: 15px;margin-left: 25px;">
			<el-breadcrumb-item :to="{ path: '/' }"><i style="font-size:20px" class="el-icon-s-fold"></i></el-breadcrumb-item>
		</el-breadcrumb>
		<span class="ham el-breadcrumb-label-s">
			<el-breadcrumb separator="/" style="line-height: 65px;">
				<el-breadcrumb-item><span :style="{color:$store.state.topfontcolor}">首页</span></el-breadcrumb-item>
				<el-breadcrumb-item><span :style="{color:$store.state.topfontcolor}"> 导航一</span></el-breadcrumb-item>
				<el-breadcrumb-item> <span :style="{color:$store.state.topdaohangcolor}"> 主控台</span>
				</el-breadcrumb-item>
			</el-breadcrumb>
		</span>
		<el-dropdown style="margin-top: -30px;float: right;margin-right: 10px;">
			<span class="el-dropdown-link">
				<i style="font-size:20px;margin-right:20px" class="el-icon-notebook-2"></i>
				<i style="font-size:20px;margin-right:20px" class="el-icon-message"></i>
				<img src="../../public/favicon.ico">k
				<i class="el-icon-caret-bottom"></i>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>个人信息</el-dropdown-item>
					<el-dropdown-item>修改密码</el-dropdown-item>
					<el-dropdown-item>刷新</el-dropdown-item>
					<el-dropdown-item>首页</el-dropdown-item>
					<el-dropdown-item divided>退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script>
</script>

<style>
	.el-breadcrumb-label-s {
		height: 64px;
		margin-left: 70px;
		left: 20px;
		top: -40px;
		position: relative;
	}

	.ham {
		float: left;
	}
</style>
