<template>
	<!-- 课程详情表 -->
	<el-row>
		<el-col :span="23" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-select-table-one-s">
				编号名称：
				<el-input v-model="input" placeholder="编号/姓名" clearable class="el-input-one-s"></el-input>
				选择网点：
				<el-select v-model="input2" placeholder="选择网点">
					<el-option v-for="item in OutletsData" :key="item.outletsId" :label="item.outletsName"
						:value="item.outletsId">
					</el-option>
				</el-select>
			</div>
			<div class="el-select-table-two-s">
				<el-button @click="" style="background:#337ab7;border-color: #337ab7;color: #fff;"><i
						class="el-icon-search"></i> 搜索</el-button>
				<el-button @click="" style="background:#337ab7;border-color: #337ab7;color: #fff;"><i
						class="el-icon-circle-plus-outline"></i>添加</el-button>
				<!-- <el-button :disabled="this.multipleSelection.length === 0"
					@click="deleteCourseDetail(multipleSelection)" type="danger" style="background:#337ab7;border-color: #337ab7;color: #fff;">- 批量删除
				</el-button> -->
			</div>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="23" class="el-table-show-one-s">
			<div class="grid-content2 bg-purple-dark1">
				<div>
					<el-table :data="CustomerData" @selection-change="handleSelectionChange" stripe
						class="el-table-one-s" ref="multipleTable"
						:header-cell-style="{background:'rgb(238, 241, 246) none repeat scroll 0% 0%',color:'#606266'}">
						<el-table-column type="selection" min-width="50">
						</el-table-column>
						<el-table-column min-width="20" type="index" align="center" :index="indexMethod" label="编号">
						</el-table-column>
						<el-table-column prop="outletsVo.outletsName" min-width="50" label="操作网点" align="center">
						</el-table-column>
						<el-table-column prop="reNetwork" min-width="50" label="充值网点" align="center">
							<template v-slot="scope">
								{{scope.row.reNetwork==1?'湖南省网点':scope.row.reNetwork==2?'长沙市网点':'株洲市网点'}}
							</template>
						</el-table-column>
						<el-table-column min-width="50" label="付款类型" align="center">
							<template v-slot="scope">
								{{scope.row.reType==0?'充值':'冲账'}}
							</template>
						</el-table-column>
						<el-table-column prop="reMoney" min-width="50" label="金额" align="center">
						</el-table-column>
						<el-table-column prop="reRemarks" min-width="0" label="备注" align="center">
						</el-table-column>
						<el-table-column prop="addname" min-width="50" label="操作人" align="center">
						</el-table-column>
						<el-table-column prop="addtime" min-width="100" label="操作时间" align="center">
						</el-table-column>
					</el-table>
					<div class="block" style="background:#FFF">
						<!-- 分页 -->
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
							:current-page="pageInfo.currentPage" :page-sizes="[5, 10, 15, 20]"
							:page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
							:total="pageInfo.total" class="el-block-showtable-one-s">
						</el-pagination>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import {
		ElMessage
	} from 'element-plus'
	export default {
		data() {
			return {
				rules: {
					coursedetailsName: [{
							required: true,
							message: '请输入课程详细名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '长度在1到20个字符',
							trigger: 'blur'
						}
					]
				},
				multipleSelection: [],
				pageInfo: {
					currentPage: 1,
					pagesize: 5,
					total: 0
				},
				CustomerData: [],
				Customer: {
					outletsId:""
				},
				OutletsData: [],
				input: '',
				input2: ''
			}
		},
		methods: {
			handleClose(done) {
				this.$confirm('确定关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			indexMethod(index) {
				return index + 1 + (this.pageInfo.currentPage - 1) * this.pageInfo.pagesize;
			},
			handleSelectionChange(multipleSelection) {
				this.multipleSelection = multipleSelection;
			},
			toggleSelection() {
				this.$refs.multipleTable.clearSelection();
			},
			handleCurrentChange(page) {
				var _this = this
				this.pageInfo.currentPage = page;
				this.axios.get("http://localhost:8089/Logistics/findAllRecharge", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.CustomerData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(size) {
				var _this = this
				this.pageInfo.pagesize = size;
				this.axios.get("http://localhost:8089/Logistics/findAllRecharge", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.CustomerData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			addCourseDetail() {
				this.dialogVisible = true;
				Object.keys(this.CourseDetail).forEach((key) => (this.CourseDetail[key] = ""))
			},
			FindCourseDetailData() {
				var _this = this
				console.log(this.pageInfo.currentPage, this.pageInfo.pagesize)
				this.axios.get("http://localhost:8089/Logistics/findAllRecharge", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.CustomerData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			var _this = this
			this.axios.get("http://localhost:8089/Logistics/findAllRecharge", {
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response)
					_this.CustomerData = response.data.list
					_this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})
			var _this = this
			this.axios.get("http://localhost:8089/Logistics/selectAllCustomerList", {
					params: this.Customer
				})
				.then(function(response) {
					console.log(response)
					_this.Customer = response.data.list
				}).catch(function(error) {
					console.log(error)
				})
			var _this = this
			this.axios.get("http://localhost:8089/Logistics/selectAllOutletsList", {
					params: this.OutletsData
				})
				.then(function(response) {
					console.log(response)
					_this.OutletsData = response.data.data
					console.log(_this.OutletsData)
				}).catch(function(error) {
					console.log(error)
				})
		}
	}
</script>

<style>
	.el-center-top-labels {
		background-color: #FFF;
		height: 61px;
		margin-bottom: 10px;
		margin-top: 10px;
		margin-left: 23px;
		box-shadow: 0 0 0 0 #eaeaea, 0 2px 2px 1px #eaeaea;
	}

	.el-col {
		border-radius: 0px;
	}

	.el-center-title-content {
		padding: 16px 32px 0 32px;
	}

	.ivu-page-header-main {
		width: 100%;
	}

	.ivu-page-header-row {
		width: 100%;
	}

	.ivu-page-header-title {
		margin-bottom: 16px;
	}

	.ivu-page-header-title {
		display: inline-block;
		color: #17233d;
		font-weight: 500;
		font-size: 20px;
	}

	.ivu-page-header-content {
		font-size: 14px;
		margin-bottom: 16px;
		color: #515a6e;
	}

	.el-table-show-one-s {
		margin: 0 23px;
	}

	.el-select-table-one-s {
		float: left;
		margin-left: 30px;
		margin-top: 10px;
		font-size: 14px;
		color: #73879c;
	}

	.el-select-table-two-s {
		margin-top: 10px;
		margin-right: 30px;
		float: right;
	}

	.el-input-one-s {
		height: 32px;
		width: 193px;
		margin-right: 30px;
	}

	.grid-content2 {
		height: 65px;
		border-radius: 0px;
	}

	.bg-purple-dark1 {
		background: #FFF;
	}

	.el-top-background-one-s {
		-webkit-border-top-left-radius: 4px;
		-webkit-border-top-right-radius: 4px;
	}

	.el-table-one-s {
		padding-top: 20px;
		height: 100%;
		padding-left: 15px;
		padding-right: 15px;
	}

	.el-table__body-wrapper {
		height: 100%;
	}

	.el-pagin-show-one-s {
		padding-top: 15px;
		padding-bottom: 15px;
		background: #FFF;
		margin-bottom: 30px;
		-webkit-border-bottom-left-radius: 4px;
		-webkit-border-bottom-right-radius: 4px;
	}

	/* switch按钮样式 */
	.switch .el-switch__label {
		position: absolute;
		display: none;
		color: #fff !important;
	}

	/*打开时文字位置设置*/
	.switch .el-switch__label--right {
		z-index: 1;
	}

	/* 调整打开时文字的显示位子 */
	.switch .el-switch__label--right span {
		margin-right: 9px;
	}

	/*关闭时文字位置设置*/
	.switch .el-switch__label--left {
		z-index: 1;
	}

	/* 调整关闭时文字的显示位子 */
	.switch .el-switch__label--left span {
		margin-left: 9px;
	}

	/*显示文字*/
	.switch .el-switch__label.is-active {
		display: block;
	}

	/* 调整按钮的宽度 */
	.switch.el-switch .el-switch__core,
	.el-switch .el-switch__label {
		width: 60px !important;
		margin: 0;
	}

	.el-table .cell {
		padding-left: 9px;
	}

	.el-pager li.active {
		color: #fff;
		cursor: default;
		background: #337ab7;
	}

	.el-pagination__total {
		margin-right: 10px;
		font-weight: 400;
		color: #606266;
		font-weight: 600;
		color: #337ab7;
	}

	.el-pagination button:disabled {
		background-color: #eff9fc;
		cursor: not-allowed;
		margin: 0 8px;
	}

	.el-button--primary {
		color: #fff;
		background-color: #337ab7;
		border-color: #337ab7;
	}

	.el-button--primary2 {
		color: #fff;
		background-color: #d9534f;
		border-color: #d9534f;
	}
</style>
