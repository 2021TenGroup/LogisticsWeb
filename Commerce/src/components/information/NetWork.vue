<template>
	<!-- 网点维护 -->
	<el-row>
		<el-col :span="23" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-select-table-one-s">
				编号名称：<el-input v-model="input" placeholder="编号/姓名" clearable class="el-input-one-s"></el-input>
				<!-- 选择网点：<el-select v-model="input2" placeholder="选择网点">
					<el-option v-for="item in OutletsData" :key="item.outletsId" :label="item.outletsName"
						:value="item.outletsId">
					</el-option>
				</el-select> -->
			</div>
			<div class="el-select-table-two-s">
				<!-- <el-button @click="" style="background:#337ab7;border-color: #337ab7;color: #fff;"><i
						class="el-icon-search"></i> 搜索</el-button>
				<el-button @click="addCustomer()" style="background:#337ab7;border-color: #337ab7;color: #fff;"><i
						class="el-icon-circle-plus-outline"></i>添加</el-button> -->
				<!-- <el-button :disabled="this.multipleSelection.length === 0"
					@click="deleteCourseDetail(multipleSelection)" type="danger" style="background:#337ab7;border-color: #337ab7;color: #fff;">- 批量删除
				</el-button> -->
			</div>
		</el-col>
	</el-row>
	<el-row class="el-show-over-menu-s">
		<el-col :span="9" class="el-show-left-menu-s">
			<div class="ivu-mb ivu-card ivu-card-dis-hover">
				<div class="ivu-card-head6">
					<div class="el-div-show-butt-one">
						<el-popover placement="top-start" title="标题" :width="200" trigger="hover"
							content="<p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>">
							<template #reference>
								<el-button plain class="el-show-butt-ons-s">
									添加菜单
									<i class="el-icon-caret-bottom"></i>
								</el-button>
							</template>
						</el-popover>
						<el-button plain class="el-show-butt-two-s">
							<i class="el-icon-copy-document"></i>
							全部收起
						</el-button>
						<el-button plain type="danger" class="el-show-butt-two-s">
							<i class="el-icon-delete-solid"></i>
							批量删除
						</el-button>
					</div>
				</div>
				<div class="ivu-menu-body-one-s">
					<div style="height: 249px;overflow: auto;">
						<div class="ivu-menu-bodys-one">
							<div class="ivu-menu-bodys-two">
								<el-input v-model="input" placeholder="输入菜单名称搜索"></el-input>
								<i class="ivu-menu-bodys-three-icon el-icon-search"></i>
							</div>
						</div>
						<div class="ivu-tree">
							<el-tree :data="data" show-checkbox node-key="id" :props="defaultProps"
								:default-expand-all="true" :render-after-expand="false" :accordion="true"
								:check-strictly="true">
							</el-tree>
						</div>
					</div>
				</div>
			</div>
		</el-col>
		<el-col :span="14" class="el-show-right-menu-s">
			<div class="el-show-right-menus-one">
				<div>
					<span class="el-show-right-menus-one-one">
						<i class="el-icon-s-grid"></i>
					</span>
					<span class="el-show-right-menus-one-two">
						编辑菜单：首页
					</span>
				</div>
			</div>
			<div class="el-show-right-menus-two">
				<div>
					<el-form ref="form" :model="form" label-width="80px">
						<el-form-item label="类型:" class="el-show-right-menus-input-one" style="text-align: left;">
							<span>顶栏菜单</span>
						</el-form-item>
						<el-form-item label="标题:" class="el-show-right-menus-input-one">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item label="路径:" class="el-show-right-menus-input-one">
							<el-input v-model="form.paths"></el-input>
						</el-form-item>
						<el-form-item class="el-show-right-menus-input-two">
							<el-button class="el-show-btn-two-log-s" type="primary" @click="">立即创建</el-button>
							<el-button class="el-show-btn-two-log-s">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue'
	export default defineComponent({
		setup() {
			return {
				input: ref(''),
				form: {
					name: '',
					paths: ''
				},
				visible: false,
				data: [{
					id: 1,
					label: '一级 1',
					children: [{
						id: 4,
						label: '二级 1-1',
						children: [{
							id: 9,
							label: '三级 1-1-1'
						}, {
							id: 10,
							label: '三级 1-1-2'
						}]
					}]
				}, {
					id: 2,
					label: '一级 2',
					children: [{
						id: 5,
						label: '二级 2-1'
					}, {
						id: 6,
						label: '二级 2-2'
					}]
				}, {
					id: 3,
					label: '一级 3',
					children: [{
						id: 7,
						label: '二级 3-1'
					}, {
						id: 8,
						label: '二级 3-2'
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
		}
	})
</script>

<style>
	.el-show-over-menu-s {
		padding-left: 10px;
		padding-right: 3px;
	}

	.el-show-left-menu-s {
		background: #FFF;
		height: 341px;
		margin-left: 10px;
		margin-right: 10px;
	}

	.el-show-right-menu-s {
		background: #FFF;
		height: 310px;
		margin-left: 10px;
		margin-right: 10px;
	}

	.ivu-mb,
	.ivu-mb-16 {
		margin-bottom: 16px !important;
	}

	.ivu-card {
		display: block;
		background: #fff;
		-webkit-border-top-left-radius: 4px;
		-webkit-border-top-right-radius: 4px;
		font-size: 14px;
		position: relative;
		transition: all .2s ease-in-out;
	}

	.ivu-card-head6 {
		border-bottom: 1px solid #e8eaec;
		padding: 14px 16px;
		line-height: 1;
		height: 32px;
	}

	.el-div-show-butt-one {
		text-align: left;
	}

	.el-show-butt-ons-s {
		padding: 8px 18px;
		min-height: 30px;
	}

	.el-show-butt-two-s {
		padding: 8px 18px;
		min-height: 30px;
		margin-right: 3x;
	}

	.ivu-menu-body-one-s {
		height: 249px;
		padding: 16px;
		margin-right: 3px;
	}

	.ivu-menu-bodys-one {
		padding: 8px !important;
	}

	.ivu-menu-bodys-two {
		display: inline-block;
		width: 100%;
		position: relative;
		vertical-align: middle;
		line-height: normal;
	}

	.ivu-menu-bodys-three-icon {
		cursor: pointer;
		transition: color .2s ease-in-out;
		width: 32px;
		height: 32px;
		line-height: 40px;
		font-size: 16px;
		text-align: center;
		color: #808695;
		position: absolute;
		right: 0;
		z-index: 3;
	}

	.ivu-tree {
		position: relative;
	}

	.el-show-right-menus-one {
		border-bottom: 1px solid #e8eaec;
		padding: 14px 16px;
		line-height: 1;
		text-align: left;
	}

	.el-show-right-menus-one-one {
		color: rgb(24, 144, 255);
		background-color: rgb(230, 247, 255);
		font-size: 14px;
		width: 24px;
		height: 24px;
		line-height: 24px;
		border-radius: 50%;
		display: inline-block;
		text-align: center;
		white-space: nowrap;
		position: relative;
		overflow: hidden;
		vertical-align: middle;
	}

	.el-show-right-menus-one-two {
		font-size: 14px;
		padding-left: 8px !important;
		color: #515a6e;
	}

	.el-show-right-menus-two {
		padding: 16px;
		height: 225px;
	}

	.el-show-right-menus-input-one {
		margin-left: 30px;
	}

	.el-show-right-menus-input-two {
		text-align: left;
		margin-left: 30px;
	}

	.el-show-btn-two-log-s {
		padding: 8px 18px;
		min-height: 30px;
	}
</style>
