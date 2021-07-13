<template>
	<!-- 单号发放 -->
	<el-row>
		<el-col :span="23" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-select-table-two-s">
				<el-button @click="addCustomer()" style="background:#51c7ae;border-color: #51c7ae;color: #fff;"><i
						class="el-icon-paperclip"></i>发放</el-button>
			</div>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="23" class="el-table-show-one-s">
			<div class="grid-content2 bg-purple-dark1">
				<div>
					<el-table :data="NumberLssueData" @selection-change="handleSelectionChange" stripe
						class="el-table-one-s" ref="multipleTable"
						:header-cell-style="{background:'rgb(238, 241, 246) none repeat scroll 0% 0%',color:'#606266'}">
						<el-table-column min-width="20" type="index" align="center" :index="indexMethod" label="序号">
						</el-table-column>
						<el-table-column prop="outletsVo.outletsName" :show-overflow-tooltip='true' min-width="40"
							label="使用网点" align="center">
						</el-table-column>
						<el-table-column :show-overflow-tooltip='true' prop="numberlssueOrder" min-width="55"
							label="开始单号" align="center">
						</el-table-column>
						<el-table-column :show-overflow-tooltip='true' prop="numberlssueNumber" min-width="55"
							label="单号总数" align="center">
						</el-table-column>
						<el-table-column :show-overflow-tooltip='true' prop="numberlssueEnd" min-width="70" label="结束单号"
							align="center">
						</el-table-column>
						<el-table-column :show-overflow-tooltip='true' min-width="45" prop="numberlssueUp" label="单号状态"
							align="center">
							<template #default="scope">
								<span v-if="scope.row.numberlssueUp==0">可用</span>
								<span v-if="scope.row.numberlssueUp==1">不可用</span>
								<span v-if="scope.row.numberlssueUp==2">已用完</span>
							</template>
						</el-table-column>
						<el-table-column min-width="60" label="备注" prop="numberlssueRemarks" align="center">
						</el-table-column>
						<el-table-column prop="addtime" min-width="55" label="添加时间" align="center">
						</el-table-column>
						<el-table-column min-width="110" label="操作" align="center">
							<template #default="scope">
								<el-button @click="showEdit(scope.row)" class="el-button--primary" size="small">
									编辑
								</el-button>
								<el-button @click="delCustomer(scope.row)" class="el-button--primary2" size="small">
									删除
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
	<el-dialog title="单号发放" v-model="dialogVisible" width="40%" :before-close="handleClose">
		<el-form :model="Numberlssue" :rules="rules" ref="Numberlssue" label-width="100px">
			<el-form-item label="发放网点:" style="padding-right: 85px;">
				<el-select v-model="Numberlssue.outletsId" placeholder="请选择">
					<el-option v-for="item in OutletsData" :key="item.outletsId" :label="item.outletsName" :value="item.outletsId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="开始单号:">
				<el-input v-model="Numberlssue.numberlssueOrder" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="发放数量:">
				<el-input-number @change="handleChange" :min="1" :max="100" v-model="Numberlssue.numberlssueNumber"
					placeholder="请输入长度">
				</el-input-number>
			</el-form-item>
			<el-form-item label="备注:">
				<el-input v-model="Numberlssue.numberlssueRemarks" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item style="margin-right: 80px;" class="el-form-butt-show-one-s">
				<el-button type="primary" @click="addCustomer2()"><i class="el-icon-s-promotion"></i>提交</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<!-- 弹窗 -->
	<el-dialog title="单号发放" v-model="dialogVisible2" width="40%" :before-close="handleClose">
		<el-form :model="Numberlssue" :rules="rules" ref="Numberlssue" label-width="100px">
			<el-form-item label="发放网点:" style="padding-right: 85px;">
				<el-select v-model="Numberlssue.outletsId" placeholder="请选择">
					<el-option v-for="item in OutletsData" :key="item.outletsId" :label="item.outletsName" :value="item.outletsId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="开始单号:">
				<el-input v-model="Numberlssue.numberlssueOrder" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="发放数量:">
				<el-input-number @change="handleChange" :min="1" :max="100" v-model="Numberlssue.numberlssueNumber"
					placeholder="请输入长度">
				</el-input-number>
			</el-form-item>
			<el-form-item label="备注:">
				<el-input v-model="Numberlssue.numberlssueRemarks" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item style="margin-right: 80px;" class="el-form-butt-show-one-s">
				<el-button type="primary" @click="updateCustomer()">提交</el-button>
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
				Numberlssue: {
					numberlssueId: "",
					outletsId: "",
					numberlssueOrder: "",
					numberlssueNumber: "",
					numberlssueEnd: "",
					numberlssueUp: "",
					numberlssueRemarks: "",
					addname: "",
					addtime: "",
					updatename: "",
					updatetime: "",
					deletename: "",
					deletetime: "",
					timeliness: ""
				},
				dialogVisible: false,
				dialogVisible2: false,
				multipleSelection: [],
				pageInfo: {
					currentPage: 1,
					pagesize: 5,
					total: 0
				},
				uptheshow: [{
						uid: 0,
						uname: "单号规则"
					},
					{
						uid: 1,
						uname: "袋号规则"
					}
				],
				NumberLssueData: [],
				OutletsData: []
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
			handleChange(value) {
				console.log(value);
			},
			indexMethod(index) {
				return index + 1 + (this.pageInfo.currentPage - 1) * this.pageInfo.pagesize;
			},
			delCustomer(row) {
				this.Numberlssue.numberlssueId = row.numberlssueId
				this.Numberlssue.deletename = this.$store.state.loginname
				const _this = this
				var flag = true
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.put("http://localhost:8089/Logistics/deleteByNumberLssue", this.Numberlssue)
						.then(function(response) {
							_this.FindCustomerData();
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '取消删除!'
					});
				});
			},
			addCustomer2() {
				console.log("添加成功")
				this.Numberlssue.addname = this.$store.state.loginname
				this.Numberlssue.timeliness = 0
				this.Numberlssue.numberlssueUp = 0
				const _this = this
				this.axios.post("http://localhost:8089/Logistics/addNumberLssue", this.Numberlssue)
					.then(function(response) {
						_this.FindCustomerData();
						_this.dialogVisible = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			showEdit(row) {
				this.Numberlssue.outletsId=row.outletsId
				this.Numberlssue.numberlssueId=row.numberlssueId
				this.Numberlssue.numberlssueOrder=row.numberlssueOrder
				this.Numberlssue.numberlssueNumber=row.numberlssueNumber
				this.Numberlssue.numberlssueEnd=row.numberlssueEnd
				this.Numberlssue.numberlssueUp=row.numberlssueUp
				this.Numberlssue.numberlssueRemarks=row.numberlssueRemarks
				this.Numberlssue.updatename = this.$store.state.loginname
				this.Numberlssue.addname = null
				this.dialogVisible2 = true
			},
			updateCustomer() {
				const _this = this
				this.axios.put("http://localhost:8089/Logistics/updateNumberLssue", this.Numberlssue)
					.then(function(response) {
						_this.dialogVisible2 = false
						_this.FindCustomerData();
					}).catch(function(error) {
						console.log(error)
					})
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
				this.axios.get("http://localhost:8089/Logistics/selectAllNumberLssue", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.NumberLssueData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(size) {
				var _this = this
				this.pageInfo.pagesize = size;
				this.axios.get("http://localhost:8089/Logistics/selectAllNumberLssue", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.NumberLssueData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			addCustomer() {
				this.dialogVisible = true;
				Object.keys(this.Numberlssue).forEach((key) => (this.Numberlssue[key] = ""))
			},
			FindCustomerData() {
				var _this = this
				console.log(this.pageInfo.currentPage, this.pageInfo.pagesize)
				this.axios.get("http://localhost:8089/Logistics/selectAllNumberLssue", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.NumberLssueData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			var _this = this
			this.axios.get("http://localhost:8089/Logistics/selectAllNumberLssue", {
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response)
					_this.NumberLssueData = response.data.list
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

	.el-input-number {
		position: relative;
		display: inline-block;
		width: 180px;
		line-height: 38px;
		width: 100%;
	}

	.el-select {
		position: relative;
		line-height: 40px;
	}

	.el-dialog__header {
		padding: 20px 20px 10px;
		padding: 10px;
		background: #f8f8f8;
		border-radius: 5px 5px 0 0;
		border-bottom: 1px solid #eee;
	}

	.el-dialog__title {
		color: #73879c;
		font-family: inherit;
		font-size: 15px;
		font-weight: 700;
	}
</style>
