<template>
	<!-- 单号发放 -->
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
						class="el-icon-search"></i>搜索</el-button>
				<el-button @click="addCustomer()" style="background:#337ab7;border-color: #337ab7;color: #fff;">
					<i class="el-icon-circle-plus-outline"></i>添加
				</el-button>
			</div>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="23" class="el-table-show-one-s">
			<div class="grid-content2 bg-purple-dark1">
				<div>
					<el-table :data="EmpData" @selection-change="handleSelectionChange" stripe
						class="el-table-one-s" ref="multipleTable"
						:header-cell-style="{background:'rgb(238, 241, 246) none repeat scroll 0% 0%',color:'#606266'}">
						<el-table-column min-width="20" type="index" align="center" :index="indexMethod" label="序号">
						</el-table-column>
						<el-table-column prop="userName" :show-overflow-tooltip='true' min-width="40"
							label="登录账号" align="center">
						</el-table-column>
						<el-table-column :show-overflow-tooltip='true' prop="outletsVo.outletsName" min-width="55"
							label="所属网点" align="center">
						</el-table-column>
						<el-table-column :show-overflow-tooltip='true' prop="empName" min-width="55"
							label="姓名" align="center">
						</el-table-column>
						<el-table-column :show-overflow-tooltip='true' prop="phone" min-width="70" label="手机"
							align="center">
						</el-table-column>
						<el-table-column min-width="60" label="角色名" prop="perPositionVo.positionName" align="center">
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
	<el-dialog title="添加员工" v-model="dialogVisible" width="40%" :before-close="handleClose">
		<el-form :model="Emp" :rules="rules" ref="Emp" label-width="100px">
			<el-form-item label="所属网点:" style="padding-right: 85px;">
				<el-select v-model="Emp.outletsId" placeholder="请选择">
					<el-option v-for="item in OutletsData" :key="item.outletsId" :label="item.outletsName"
						:value="item.outletsId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="员工编号:">
				<el-input v-model="Emp.empNumber" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="姓名:">
				<el-input v-model="Emp.empName" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="用户名:">
				<el-input v-model="Emp.userName" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="密码:">
				<el-input v-model="Emp.passWord" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="手机:">
				<el-input v-model="Emp.phone" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="岗位:">
				<el-input v-model="Emp.positionId" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="身份证号:">
				<el-input v-model="Emp.identityCards" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="地址:">
				<el-input v-model="Emp.address" placeholder="请输入备注"></el-input>
			</el-form-item>
			身份证照片:
			<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
				:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<el-form-item style="margin-right: 80px;" class="el-form-butt-show-one-s">
				<el-button type="primary" @click="addCustomer2()"><i class="el-icon-s-promotion"></i>提交</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<!-- 弹窗 -->
	<el-dialog title="编辑员工" v-model="dialogVisible2" width="40%" :before-close="handleClose">
		<el-form :model="Emp" :rules="rules" ref="Emp" label-width="100px">
			<el-form-item label="所属网点:" style="padding-right: 85px;">
				<el-select v-model="Emp.outletsId" placeholder="请选择">
					<el-option v-for="item in OutletsData" :key="item.outletsId" :label="item.outletsName"
						:value="item.outletsId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="员工编号:">
				<el-input v-model="Emp.empNumber" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="姓名:">
				<el-input v-model="Emp.empName" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="用户名:">
				<el-input v-model="Emp.userName" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="密码:">
				<el-input v-model="Emp.passWord" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="手机:">
				<el-input v-model="Emp.phone" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="岗位:">
				<el-input v-model="Emp.positionId" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="身份证号:">
				<el-input v-model="Emp.identityCards" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="地址:">
				<el-input v-model="Emp.address" placeholder="请输入备注"></el-input>
			</el-form-item>
			身份证照片:
			<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
				:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<img :src="imageUrl" width="128" alt="imageUrl" height="146" />
			<el-form-item style="margin-right: 80px;" class="el-form-butt-show-one-s">
				<el-button type="primary" @click="updateCustomer()"><i class="el-icon-s-promotion"></i>提交</el-button>
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
				imageUrl: '',
				
				Emp: {
					empId:"",
					positionId:"",
					outletsId:"",
					empNumber:"",
					userName:"",
					passWord:"",
					phone:"",
					identityCards:"",
					address:"",
					zPhotographs:"",
					fPhotographs:"",
					empName:"",
					addname:"",
					addtime:"",
					updatename:"",
					updatetime:"",
					deletename:"",
					deletetime:"",
					timeliness:""
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
				EmpData: [],
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
			handleAvatarSuccess(res, file) {
				console.log(res)
				console.log(file.name)
				var abc = "../../../static/" + file.name
				console.log(abc)
				this.Emp.zPhotographs = abc
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
			
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			indexMethod(index) {
				return index + 1 + (this.pageInfo.currentPage - 1) * this.pageInfo.pagesize;
			},
			delCustomer(row) {
				this.Emp.empId = row.empId
				this.Emp.deletename = this.$store.state.loginname
				const _this = this
				var flag = true
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.put("http://localhost:8089/Logistics/deleteByEmps", this.Emp)
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
				this.Emp.addname = this.$store.state.loginname
				this.Emp.zPhotographs = this.imageUrl
				this.Emp.timeliness = 0
				const _this = this
				this.axios.post("http://localhost:8089/Logistics/addEmps", this.Emp)
					.then(function(response) {
						_this.FindCustomerData();
						_this.dialogVisible = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			showEdit(row) {
				this.Emp.empId = row.empId
				this.Emp.positionId = row.positionId
				this.Emp.outletsId = row.outletsId
				this.Emp.empNumber = row.empNumber
				this.Emp.userName = row.userName
				this.Emp.passWord = row.passWord
				this.Emp.phone = row.phone
				this.Emp.identityCards = row.identityCards
				this.Emp.address = row.address
				this.Emp.zPhotographs = row.zPhotographs
				this.imageUrl = row.zPhotographs
				this.Emp.fPhotographs = row.fPhotographs
				this.Emp.empName = row.empName
				this.Emp.updatename = this.$store.state.loginname
				this.Emp.addname = null
				this.dialogVisible2 = true
			},
			updateCustomer() {
				const _this = this
				this.axios.put("http://localhost:8089/Logistics/updateEmps", this.Emp)
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
				this.axios.get("http://localhost:8089/Logistics/selectAllEmps", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.EmpData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(size) {
				var _this = this
				this.pageInfo.pagesize = size;
				this.axios.get("http://localhost:8089/Logistics/selectAllEmps", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.EmpData = response.data.list
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
				this.axios.get("http://localhost:8089/Logistics/selectAllEmps", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.EmpData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			var _this = this
			this.axios.get("http://localhost:8089/Logistics/selectAllEmps", {
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response)
					_this.EmpData = response.data.list
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
