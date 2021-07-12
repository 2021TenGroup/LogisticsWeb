<template>
	<!-- 课程详情表 -->
	<el-row>
		<el-col :span="23" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-select-table-one-s">
				编号名称：<el-input v-model="input" placeholder="编号/姓名" clearable class="el-input-one-s"></el-input>
				选择网点：<el-input v-model="input" placeholder="选择网点" clearable class="el-input-one-s"></el-input>
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
						<el-table-column prop="customerNumber" min-width="50" label="客户编号" align="center">
						</el-table-column>
						<el-table-column prop="customerName" min-width="50" label="姓名" align="center">
						</el-table-column>
						<el-table-column prop="customerPhone" min-width="50" label="手机" align="center">
						</el-table-column>
						<el-table-column prop="customerUser" min-width="50" label="邮箱" align="center">
						</el-table-column>
						<el-table-column prop="outletsVo.outletsName" min-width="50" label="所属网点" align="center">
						</el-table-column>
						<el-table-column label="操作" align="center">
							<template #default="scope">
								<el-button @click="" class="el-button--primary" size="small">编辑</el-button>
								<el-button @click="" class="el-button--primary2" size="small">删除
								</el-button>
							</template>
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
	<!-- 弹窗 -->
	<el-dialog title="增加客户信息" v-model="dialogVisible" width="30%" :before-close="handleClose">
		<el-form :model="Customer" :rules="rules" ref="Customer" label-width="100px">
			<el-form-item label="客户编号:">
				<el-input v-model="Customer.customerNumber" placeholder="请输入客户编号"></el-input>
			</el-form-item>
			<el-form-item label="客户姓名:">
				<el-input v-model="Customer.customerName" placeholder="请输入客户姓名"></el-input>
			</el-form-item>
			<!-- <el-form-item label="所属网点:" style="padding-right: 85px;">
				<el-select v-model="Course.classtypeId" placeholder="请选择">
					<el-option v-for="item in classtypeData" :key="item.classtypeId" :label="item.classtypeName"
						:value="item.classtypeId">
					</el-option>
				</el-select>
			</el-form-item> -->
			<!-- <el-form-item label="结算方式:" style="padding-right: 85px;">
				<el-select v-model="Course.classtypeId" placeholder="请选择">
					<el-option v-for="item in classtypeData" :key="item.classtypeId" :label="item.classtypeName"
						:value="item.classtypeId">
					</el-option>
				</el-select>
			</el-form-item> -->
			<el-form-item label="邮箱:">
				<el-input v-model="Customer.customerUser" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="地址:">
				<el-input v-model="Customer.customerAddress" placeholder="请输入地址"></el-input>
			</el-form-item>
			<!-- <el-form-item label="课时费用:">
				<el-input v-model="Course.courseMoney" placeholder="请输入课时费用"></el-input>
			</el-form-item>
			<el-form-item label="课程提成:">
				<el-input v-model="Course.commission" placeholder="请输入课程提成金额"></el-input>
			</el-form-item> -->
			<!-- <el-form-item label="开报办理人:">
				<el-input v-model="Course.beginname" placeholder="请输入开报办理人"></el-input>
			</el-form-item> -->
			<!-- <el-form-item label="开报时间:"> -->
				<!-- <el-date-picker type="date" placeholder="选择日期" v-model="Course.begintime" style="width: 100%;">
				</el-date-picker> -->
			<!-- 	<el-input type="date" v-model="Course.begintime"></el-input>
			</el-form-item> -->
			<el-form-item style="margin-right: 80px;" class="el-form-butt-show-one-s">
				<el-button type="primary" @click="">立即创建</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
	import {
		ElMessage
	} from 'element-plus'
	export default {
		data() {
			return {
				rules: {
					customerName: [{
							required: true,
							message: '请输入客户姓名',
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
				dialogVisible:true,
				multipleSelection: [],
				pageInfo: {
					currentPage: 1,
					pagesize: 5,
					total: 0
				},
				CustomerData: [],
				OutletsData: [],
				input: '',
				Customer:{
					customerId:"",
					outletsId:"",
					customerNumber:"",
					customerName:"",
					customerSettlement:"",
					customerUser:"",
					customerPhone:"",
					customerProvince:"",
					customerCity:"",
					customerRegion:"",
					customerAddress:"",
					addname:"",
					addtime:"",
					updatename:"",
					updatetime:"",
					deletename:"",
					deletetime:"",
					timeliness:""
				},
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
				this.axios.get("http://localhost:8089/Logistics/selectAllCustomer", {
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
				this.axios.get("http://localhost:8089/Logistics/selectAllCustomer", {
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
			addCustomer() {
				this.dialogVisible = true;
				Object.keys(this.Customer).forEach((key) => (this.Customer[key] = ""))
			},
			FindCustomerData() {
				var _this = this
				console.log(this.pageInfo.currentPage, this.pageInfo.pagesize)
				this.axios.get("http://localhost:8089/Logistics/selectAllCustomer", {
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
			this.axios.get("http://localhost:8089/Logistics/selectAllCustomer", {
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
			this.axios.get("http://localhost:8089/Logistics/selectAllOutletsList", {
					params: this.OutletsData
				})
				.then(function(response) {
					console.log(response)
					_this.OutletsData = response.data.list
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
