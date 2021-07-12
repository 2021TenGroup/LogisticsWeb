<template>
	<!-- 客户维护 -->
	<el-row>
		<el-col :span="23" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-select-table-one-s">
				编号名称：<el-input v-model="input" placeholder="编号/姓名" clearable class="el-input-one-s"></el-input>
				选择网点：<el-select v-model="input2" placeholder="选择网点">
					<el-option v-for="item in OutletsData" :key="item.outletsId" :label="item.outletsName"
						:value="item.outletsId">
					</el-option>
				</el-select>
			</div>
			<div class="el-select-table-two-s">
				<el-button @click="" style="background:#337ab7;border-color: #337ab7;color: #fff;"><i
						class="el-icon-search"></i> 搜索</el-button>
				<el-button @click="addCustomer()" style="background:#337ab7;border-color: #337ab7;color: #fff;"><i
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
						<el-table-column min-width="20" type="index" align="center" :index="indexMethod" label="序号">
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
								<el-button @click="showEdit(scope.row)" class="el-button--primary" size="small">编辑
								</el-button>
								<el-button @click="delCustomer(scope.row)" class="el-button--primary2" size="small">删除
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
			<el-form-item label="所属网点:" style="padding-right: 85px;">
				<el-select v-model="Customer.outletsId" placeholder="请选择">
					<el-option v-for="item in OutletsData" :key="item.outletsId" :label="item.outletsName"
						:value="item.outletsId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="结算方式:" style="padding-right: 85px;">
				<el-select v-model="Customer.customerSettlement" placeholder="请选择">
					<el-option v-for="item in uptheshow" :key="item.uid" :label="item.uname" :value="item.uid">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="省份:" style="padding-right: 85px;">
				<el-select v-model="Customer.customerProvince" placeholder="请选择">
					<el-option v-for="item in adressdata1" :key="item.uname" :label="item.uname" :value="item.uname">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="城市:" style="padding-right: 85px;">
				<el-select @click="showcity()" v-model="Customer.customerCity" placeholder="请选择">
					<el-option v-for="item in adressdata2" :key="item.uname" :label="item.uname" :value="item.uname">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="地区:" style="padding-right: 85px;">
				<el-select @click="showqu()" v-model="Customer.customerRegion" placeholder="请选择">
					<el-option v-for="item in adressdata3" :key="item.uname" :label="item.uname" :value="item.uname">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="手机:">
				<el-input v-model="Customer.customerPhone" placeholder="请输入手机"></el-input>
			</el-form-item>
			<el-form-item label="邮箱:">
				<el-input v-model="Customer.customerUser" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="地址:">
				<el-input v-model="Customer.customerAddress" placeholder="请输入地址"></el-input>
			</el-form-item>
			<el-form-item style="margin-right: 80px;" class="el-form-butt-show-one-s">
				<el-button type="primary" @click="addCustomer2()"><i class="el-icon-s-promotion"></i>提交</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<!-- 弹窗 -->
	<el-dialog title="修改客户信息" v-model="dialogVisible2" width="30%" :before-close="handleClose">
		<el-form :model="Customer" :rules="rules" ref="Customer" label-width="100px">
			<el-form-item label="客户编号:">
				<el-input v-model="Customer.customerNumber" placeholder="请输入客户编号"></el-input>
			</el-form-item>
			<el-form-item label="客户姓名:">
				<el-input v-model="Customer.customerName" placeholder="请输入客户姓名"></el-input>
			</el-form-item>
			<el-form-item label="所属网点:" style="padding-right: 85px;">
				<el-select v-model="Customer.outletsId" placeholder="请选择">
					<el-option v-for="item in OutletsData" :key="item.outletsId" :label="item.outletsName"
						:value="item.outletsId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="结算方式:" style="padding-right: 85px;">
				<el-select v-model="Customer.customerSettlement" placeholder="请选择">
					<el-option v-for="item in uptheshow" :key="item.uid" :label="item.uname" :value="item.uid">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="省份:" style="padding-right: 85px;">
				<el-select v-model="Customer.customerProvince" placeholder="请选择">
					<el-option v-for="item in adressdata1" :key="item.uname" :label="item.uname" :value="item.uname">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="城市:" style="padding-right: 85px;">
				<el-select @click="showcity()" v-model="Customer.customerCity" placeholder="请选择">
					<el-option v-for="item in adressdata2" :key="item.uname" :label="item.uname" :value="item.uname">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="地区:" style="padding-right: 85px;">
				<el-select @click="showqu()" v-model="Customer.customerRegion" placeholder="请选择">
					<el-option v-for="item in adressdata3" :key="item.uname" :label="item.uname" :value="item.uname">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="手机:">
				<el-input v-model="Customer.customerPhone" placeholder="请输入手机"></el-input>
			</el-form-item>
			<el-form-item label="邮箱:">
				<el-input v-model="Customer.customerUser" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="地址:">
				<el-input v-model="Customer.customerAddress" placeholder="请输入地址"></el-input>
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
				dialogVisible: false,
				dialogVisible2: false,
				multipleSelection: [],
				pageInfo: {
					currentPage: 1,
					pagesize: 5,
					total: 0
				},
				CustomerData: [],
				OutletsData: [],
				input: '',
				input2: '',
				Customer: {
					customerId: "",
					outletsId: "",
					customerNumber: "",
					customerName: "",
					customerSettlement: "",
					customerUser: "",
					customerPhone: "",
					customerProvince: "",
					customerCity: "",
					customerRegion: "",
					customerAddress: "",
					addname: "",
					addtime: "",
					updatename: "",
					updatetime: "",
					deletename: "",
					deletetime: "",
					timeliness: ""
				},
				uptheshow: [{
						uid: 1,
						uname: "寄付"
					},
					{
						uid: 2,
						uname: "月结"
					}
				],
				adressdata1: [{
					uname: "湖南省"
				}, {
					uname: "湖北省"
				}],
				adressdata2: [],
				adressdata3: []
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
			delCustomer(row) {
				this.Customer.customerId = row.customerId
				this.Customer.deletename = this.$store.state.loginname
				const _this = this
				var flag = true
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.put("http://localhost:8089/Logistics/delCustomer", this.Customer)
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
				this.Customer.addname = this.$store.state.loginname
				this.Customer.timeliness = 0
				const _this = this
				this.axios.post("http://localhost:8089/Logistics/addCustomer", this.Customer)
					.then(function(response) {
						_this.FindCustomerData();
						_this.dialogVisible = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			showEdit(row) {
				this.Customer.customerId = row.customerId
				this.Customer.outletsId = row.outletsId
				this.Customer.customerNumber = row.customerNumber
				this.Customer.customerSettlement = row.customerSettlement
				this.Customer.customerName = row.customerName
				this.Customer.customerUser = row.customerUser
				this.Customer.customerAddress = row.customerAddress
				this.Customer.customerPhone = row.customerPhone
				this.Customer.customerProvince = row.customerProvince
				this.Customer.customerCity = row.customerCity
				this.Customer.customerRegion = row.customerRegion
				this.Customer.updatename = this.$store.state.loginname
				this.Customer.addname = null
				this.dialogVisible2 = true
			},
			updateCustomer() {
				const _this = this
				this.axios.put("http://localhost:8089/Logistics/updateCustomer", this.Customer)
					.then(function(response) {
						_this.dialogVisible2 = false
						_this.FindCustomerData();
					}).catch(function(error) {
						console.log(error)
					})
			},
			showcity() {
				console.log(this.Customer.customerProvince)
				if (this.Customer.customerProvince == '湖南省') {
					this.adressdata2 = [{
						uname: "长沙市"
					}, {
						uname: "株洲市"
					}, {
						uname: "湘潭市"
					}]
				} else if (this.Customer.customerProvince == '湖北省') {
					this.adressdata2 = [{
						uname: "武汉市"
					}, {
						uname: "宜昌市"
					}, {
						uname: "荆州市"
					}]
				}
			},
			showqu() {
				console.log(this.Customer.customerProvince)
				if (this.Customer.customerCity == '长沙市') {
					this.adressdata3 = [{
						uname: "天心区"
					}, {
						uname: "芙蓉区"
					}, {
						uname: "岳麓区"
					}]
				} else if (this.Customer.customerCity == '株洲市') {
					this.adressdata3 = [{
						uname: "芦淞区"
					}, {
						uname: "天元区"
					}, {
						uname: "荷塘区"
					}]
				} else if (this.Customer.customerCity == '湘潭市') {
					this.adressdata3 = [{
						uname: "雨湖区"
					}, {
						uname: "岳塘区"
					}, {
						uname: "韶山区"
					}]
				} else if (this.Customer.customerCity == '武汉市') {
					this.adressdata3 = [{
						uname: "江汉区"
					}, {
						uname: "武昌区"
					}, {
						uname: "汉阳区"
					}]
				} else if (this.Customer.customerCity == '宜昌市') {
					this.adressdata3 = [{
						uname: "西陵区"
					}, {
						uname: "夷陵区"
					}, {
						uname: "伍家岗区"
					}]
				} else if (this.Customer.customerCity == '荆州市') {
					this.adressdata3 = [{
						uname: "荆州区"
					}, {
						uname: "沙市区"
					}, {
						uname: "经济技术开发区"
					}]
				}
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
