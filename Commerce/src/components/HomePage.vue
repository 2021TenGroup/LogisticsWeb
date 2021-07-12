<template>
	<!-- 首页 -->
	<el-container header="100%">
		<el-aside :width="this.$store.state.left+'px'"
			v-bind:style="{background:this.$store.state.leftcolor,zIndex:this.$store.state.leftindex}">
			<router-view name="showleft"></router-view>
		</el-aside>
		<el-container>
			<el-header style="padding: inherit;height: 79px;" v-bind:style="{background:this.$store.state.topcolor}">
				<router-view name="showtop"></router-view>
			</el-header>
			<el-main style="padding: 0px;">
				<router-view name="showcenter"></router-view>
				<router-view name="showpanel"></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		name: 'HomePage',
		data() {
			return {
				/* isCollapse: true */
			}
		},
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
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
		padding: inherit;
		box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
		transition: all .2s ease-in-out;
		z-index: 11;
	}

	.el-header {
		padding: inherit;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
		box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .05);
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}

	.el-container {
		height: 100%;
		width: 100%;
	}

	.el-main {
		background: #f5f7f9;
	}
</style>