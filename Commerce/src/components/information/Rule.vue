<template>
	<!-- 单号规则 -->
	<el-row>
		<el-col :span="23" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-select-table-two-s">
				<el-button @click="addCustomer()" style="background:#337ab7;border-color: #337ab7;color: #fff;"><i
						class="el-icon-circle-plus-outline"></i>添加</el-button>
			</div>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="23" class="el-table-show-one-s">
			<div class="grid-content2 bg-purple-dark1">
				<div>
					<el-table :data="NumberRuleData" @selection-change="handleSelectionChange" stripe
						class="el-table-one-s" ref="multipleTable"
						:header-cell-style="{background:'rgb(238, 241, 246) none repeat scroll 0% 0%',color:'#606266'}">
						<el-table-column min-width="20" type="index" align="center" :index="indexMethod" label="序号">
						</el-table-column>
						<el-table-column prop="ruleName" :show-overflow-tooltip='true' min-width="35" label="名称" align="center">
						</el-table-column>
						<el-table-column :show-overflow-tooltip='true' prop="ruleStart" min-width="55" label="开始字符" align="center">
						</el-table-column>
						<el-table-column :show-overflow-tooltip='true' prop="ruleEnd" min-width="55" label="结束字符" align="center">
						</el-table-column>
						<el-table-column prop="ruleLenght" min-width="50" label="长度" align="center">
						</el-table-column>
						<el-table-column :show-overflow-tooltip='true' min-width="70" label="当前最大单号" align="center">
							<template #default="scope">
								<span v-if="scope.row.ruleMax=''">暂无</span>
								<span v-if="scope.row.ruleMax!=null" >{{scope.row.ruleMax}}</span>
							</template>
						</el-table-column>
						<el-table-column :show-overflow-tooltip='true' min-width="30" prop="ruleRemarks" label="备注" align="center">
						</el-table-column>
						<el-table-column min-width="60" label="类型" align="center">
							<template #default="scope">
								<span v-if="scope.row.ruleType==0">单号规则</span>
								<span v-if="scope.row.ruleType0==1">袋号规则</span>
							</template>
						</el-table-column>
						<el-table-column min-width="50" label="使用情况" align="center">
							<template #default="scope">
								<span v-if="scope.row.ruleUsage==0">未使用</span>
								<span v-if="scope.row.ruleUsage==1">使用中</span>
							</template>
						</el-table-column>
						<el-table-column prop="addtime" min-width="55" label="添加时间" align="center">
						</el-table-column>
						<el-table-column min-width="110" label="操作" align="center">
							<template #default="scope">
								<el-button v-if="scope.row.ruleUsage==1" disabled @click="showEdit(scope.row)" class="el-button--primary" size="small">
									<i class="el-icon-edit"></i>
								</el-button>
								<el-button v-if="scope.row.ruleUsage==0" @click="showEdit(scope.row)" class="el-button--primary" size="small">
									<i class="el-icon-edit"></i>
								</el-button>
								<el-button v-if="scope.row.ruleUsage==1" @click="delCustomer(scope.row)" disabled class="el-button--primary2" size="small">
									<i class="el-icon-delete"></i>
								</el-button>
								<el-button v-if="scope.row.ruleUsage==0" @click="delCustomer(scope.row)" class="el-button--primary2" size="small">
									<i class="el-icon-delete"></i>
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
	<el-dialog title="增加订单规则" v-model="dialogVisible" width="40%" :before-close="handleClose">
		<el-form :model="Rule" :rules="rules" ref="Rule" label-width="100px">
			<el-form-item label="类型:" style="padding-right: 85px;">
				<el-select v-model="Rule.ruleType" placeholder="请选择">
					<el-option v-for="item in uptheshow" :key="item.uid" :label="item.uname" :value="item.uid">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="名称:">
				<el-input v-model="Rule.ruleName" placeholder="请输入名称"></el-input>
			</el-form-item>
			<el-form-item label="开始字符:">
				<el-input v-model="Rule.ruleStart" placeholder="请输入开始字符"></el-input>
			</el-form-item>
			<el-form-item label="结束字符:">
				<el-input v-model="Rule.ruleEnd" placeholder="请输入结束字符"></el-input>
			</el-form-item>
			<el-form-item label="长度:">
				<el-input-number @change="handleChange" :min="1" :max="10" v-model="Rule.ruleLenght"
					placeholder="请输入长度">
				</el-input-number>
			</el-form-item>
			<el-form-item label="备注:">
				<el-input v-model="Rule.ruleRemarks" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item style="margin-right: 80px;" class="el-form-butt-show-one-s">
				<el-button type="primary" @click="addCustomer2()"><i class="el-icon-s-promotion"></i>提交</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<!-- 弹窗 -->
	<el-dialog title="修改订单规则" v-model="dialogVisible2" width="40%" :before-close="handleClose">
		<el-form :model="Rule" :rules="rules" ref="Rule" label-width="100px">
			<el-form-item label="类型:" style="padding-right: 85px;">
				<el-select disabled v-model="Rule.ruleType" placeholder="请选择">
					<el-option v-for="item in uptheshow" :key="item.uid" :label="item.uname" :value="item.uid">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="名称:">
				<el-input v-model="Rule.ruleName" placeholder="请输入名称"></el-input>
			</el-form-item>
			<el-form-item label="开始字符:">
				<el-input v-model="Rule.ruleStart" placeholder="请输入开始字符"></el-input>
			</el-form-item>
			<el-form-item label="结束字符:">
				<el-input v-model="Rule.ruleEnd" placeholder="请输入结束字符"></el-input>
			</el-form-item>
			<el-form-item label="长度:">
				<el-input-number disabled @change="handleChange" :min="1" :max="10" v-model="Rule.ruleLenght"
					placeholder="请输入长度">
				</el-input-number>
			</el-form-item>
			<el-form-item label="备注:">
				<el-input v-model="Rule.ruleRemarks" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item style="margin-right: 80px;" class="el-form-butt-show-one-s">
				<el-button type="primary" @click="updateCustomer()">立即修改</el-button>
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
				Rule: {
					ruleId: "",
					ruleName: "",
					ruleStart: "",
					ruleEnd: "",
					ruleLenght: "",
					ruleMax: "",
					ruleRemarks: "",
					ruleType: "",
					ruleUsage: "",
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
				NumberRuleData: [],
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
				this.Rule.ruleId = row.ruleId
				this.Rule.deletename = this.$store.state.loginname
				const _this = this
				var flag = true
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.put("http://localhost:8089/Logistics/deleteByNumberRule", this.Rule)
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
				var a = Number(this.Rule.ruleStart.length)
				var b = Number(this.Rule.ruleEnd.length)
				var c = a+b
				if(c>Number(this.Rule.ruleLenght)){
					console.log("添加失败")
					this.$message({
						type: 'error',
						message: '单号设置不规范,总长度过短'
					});
				} else{
					console.log("添加成功")
					this.Rule.addname = this.$store.state.loginname
					this.Rule.timeliness = 0
					this.Rule.ruleUsage = 0
					const _this = this
					this.axios.post("http://localhost:8089/Logistics/addNumberRule", this.Rule)
						.then(function(response) {
							_this.FindCustomerData();
							_this.dialogVisible = false
						}).catch(function(error) {
							console.log(error)
						})
				}
			},
			showEdit(row) {
				this.Rule.ruleId = row.ruleId
				this.Rule.ruleName = row.ruleName
				this.Rule.ruleStart = row.ruleStart
				this.Rule.ruleEnd = row.ruleEnd
				this.Rule.ruleLenght = row.ruleLenght
				this.Rule.ruleMax = row.ruleMax
				this.Rule.ruleRemarks = row.ruleRemarks
				this.Rule.ruleType = row.ruleType
				this.Rule.ruleUsage = row.ruleUsage
				this.Rule.updatename = this.$store.state.loginname
				this.Rule.addname = null
				this.dialogVisible2 = true
			},
			updateCustomer() {
				const _this = this
				this.axios.put("http://localhost:8089/Logistics/updateNumberRule", this.Rule)
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
				this.axios.get("http://localhost:8089/Logistics/selectAllNumberRule", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.NumberRuleData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(size) {
				var _this = this
				this.pageInfo.pagesize = size;
				this.axios.get("http://localhost:8089/Logistics/selectAllNumberRule", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.NumberRuleData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			addCustomer() {
				this.dialogVisible = true;
				Object.keys(this.Rule).forEach((key) => (this.Rule[key] = ""))
			},
			FindCustomerData() {
				var _this = this
				console.log(this.pageInfo.currentPage, this.pageInfo.pagesize)
				this.axios.get("http://localhost:8089/Logistics/selectAllNumberRule", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.NumberRuleData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			var _this = this
			this.axios.get("http://localhost:8089/Logistics/selectAllNumberRule", {
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response)
					_this.NumberRuleData = response.data.list
					_this.pageInfo.total = response.data.total
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
