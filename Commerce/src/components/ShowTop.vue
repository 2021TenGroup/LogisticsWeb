<template>
	<div>
	<el-breadcrumb separator="/" style="margin-top: 15px;margin-left: 25px;">
		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
	</el-breadcrumb>
	<el-dropdown style="margin-top: -15px;float: right;margin-right: 10px;">
	  <span class="el-dropdown-link">
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
</style>
