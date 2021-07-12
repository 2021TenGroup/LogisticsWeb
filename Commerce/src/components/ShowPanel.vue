<template>
	<!-- 课程详情表 -->
	<el-row>
		<el-col :span="23" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-select-table-one-s">
				编号名称：<el-input v-model="input" placeholder="编号/姓名" clearable class="el-input-one-s"></el-input>
				选择网点：<el-input v-model="input" placeholder="选择网点" clearable class="el-input-one-s"></el-input>
			</div>
			<div class="el-select-table-two-s">
				<el-button @click="addCourseDetail()" style="background:#337ab7;border-color: #337ab7;color: #fff;"><i class="el-icon-search"></i> 搜索</el-button>
				<el-button @click="toggleSelection()" style="background:#337ab7;border-color: #337ab7;color: #fff;"><i class="el-icon-circle-plus-outline"></i>添加</el-button>
				<el-button :disabled="this.multipleSelection.length === 0"
					@click="deleteCourseDetail(multipleSelection)" type="danger" style="background:#337ab7;border-color: #337ab7;color: #fff;">- 批量删除
				</el-button>
			</div>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="23" class="el-table-show-one-s">
			<div class="grid-content2 bg-purple-dark1">
				<div>
					<el-table :data="CourseDetailData" @selection-change="handleSelectionChange" stripe
						class="el-table-one-s" ref="multipleTable" :header-cell-style="{background:'rgb(238, 241, 246) none repeat scroll 0% 0%',color:'#606266'}">
						<el-table-column type="selection" min-width="50">
						</el-table-column>
						<el-table-column type="expand" max-width="15" label="详细" :show-overflow-tooltip="true">
							<template #default="props">
								<el-form label-position="left" inline class="demo-table-expand">
									<div style="display: inline-block;" class="el-table-xiang-show-one-s">
										<el-form-item label="考勤(应道/实到):">
											<span>31/28</span>
										</el-form-item>
										<el-form-item label="课程费用:">
											<span>{{ props.row.courseVo.courseMoney }}元</span>
										</el-form-item>
										<el-form-item label="课时量:">
											<span>{{ props.row.courseVo.classhours }}</span>
										</el-form-item>
									</div>
								</el-form>
							</template>
						</el-table-column>
						<el-table-column prop="coursedetailsName" min-width="50" label="课程详细名称" align="center">
						</el-table-column>
						<el-table-column prop="courseVo.courseName" min-width="50" label="课程名称" align="center">
						</el-table-column>
						<el-table-column prop="coursesequence" min-width="50" label="课程序列号" align="center">
						</el-table-column>
						<el-table-column label="操作" align="center">
							<template #default="scope">
								<el-button @click="showEdit(scope.row)" type="text" size="small">编辑</el-button>
								<div class="ivu-divider"></div>
								<el-button @click="delSelectAllCourseDetail(scope.row)" type="text" size="small">删除</el-button>
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
	<el-dialog title="增加课类详细信息" v-model="dialogVisible" width="30%" :before-close="handleClose">
		<el-form :model="CourseDetail" :rules="rules" ref="CourseDetail" label-width="100px" class="demo-ruleForm">
			<el-form-item label="课程详细名:" prop="coursedetailsName">
				<el-input v-model="CourseDetail.coursedetailsName" placeholder="请输入课程类别名称"></el-input>
			</el-form-item>
			<el-form-item label="课程名称:" style="padding-right: 85px;">
				<el-select v-model="CourseDetail.courseId" placeholder="请选择">
					<el-option v-for="item in CourseData" :key="item.courseId" :label="item.courseName"
						:value="item.courseId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="课程序列号:">
				<el-input v-model="CourseDetail.coursesequence" placeholder="请输入课时量"></el-input>
			</el-form-item>
			<el-form-item class="el-form-butt-show-one-s">
				<el-button type="primary" @click="addCourseDetailData('CourseDetail')">立即创建</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog title="修改课程详细信息" v-model="dialogVisible2" width="50%" :before-close="handleClose">
		<el-form :model="CourseDetail" :rules="rules" ref="CourseDetail" label-width="100px" class="demo-ruleForm">
			<el-form-item label="课程详细名:" prop="coursedetailsName">
				<el-input v-model="CourseDetail.coursedetailsName" placeholder="请输入课程类别名称"></el-input>
			</el-form-item>
			<el-form-item label="课程名称:" style="padding-right: 85px;">
				<el-select v-model="CourseDetail.courseId" placeholder="请选择">
					<el-option v-for="item in CourseData" :key="item.courseId" :label="item.courseName"
						:value="item.courseId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="课程序列号:">
				<el-input v-model="CourseDetail.coursesequence" placeholder="请输入课时量"></el-input>
			</el-form-item>
			<el-form-item class="el-form-butt-show-one-s">
				<el-button type="primary" @click="updateCourseDetail('CourseDetail')">立即修改</el-button>
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
				dialogVisible: false,
				dialogVisible2: false,
				CourseDetail: {
					coursedetailsId: "",
					coursedetailsName: "",
					coursesequence: "",
					addname: "",
					addtime: "",
					updatename: "",
					updatetime: "",
					deletename: "",
					deletetime: "",
					timeliness: "",
					courseId: ""
				},
				Course: {
					courseId: "",
					courseName: "",
					courseState: "",
					classhours: "",
					courseMoney: "",
					commission: "",
					addname: "",
					addtime: "",
					updatename: "",
					updatetime: "",
					stopname: "",
					stoptime: "",
					beginname: "",
					begintime: "",
					deletename: "",
					deletetime: "",
					timeliness: "",
					classtypeId: ""
				},
				pageInfo: {
					currentPage: 1,
					pagesize: 5,
					total: 0
				},
				CourseData: [],
				classtypeData: [],
				CourseDetailData: [],
				input: ''
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
			addCourseDetailData(CourseDetail) {
				this.Course.courseId =this.CourseDetail.courseId
				/* console.log(this.Course.courseId) */
				this.CourseDetail.addname = this.$store.state.loginname
				this.CourseDetail.timeliness = 0
				const _this = this
				this.axios.put("http://localhost:8080/Training/updateByCourseHouse", this.Course)
					.then(function(response) {
						_this.FindCourseDetailData();
					}).catch(function(error) {
						console.log(error)
					})
				this.axios.post("http://localhost:8080/Training/addCourseDetailsService", this.CourseDetail)
					.then(function(response) {
						_this.FindCourseDetailData();
						_this.dialogVisible = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			delSelectAllCourseDetail(row) {
				const _this = this
				this.CourseDetail.coursedetailsId = row.coursedetailsId
				this.Course.courseId =row.courseId
				this.CourseDetail.deletename = this.$store.state.loginname
				var flag = true
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.put("http://localhost:8080/Training/updateByCourseHouseTwo", this.Course)
						.then(function(response) {
							_this.FindCourseDetailData();
						}).catch(function(error) {
							console.log(error)
						})
					this.axios.put("http://localhost:8080/Training/deleteByCourseDetails", this.CourseDetail)
						.then(function(response) {
							_this.FindCourseDetailData();
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
			handleSelectionChange(multipleSelection) {
				this.multipleSelection = multipleSelection;
			},
			toggleSelection() {
				this.$refs.multipleTable.clearSelection();
			},
			showEdit(row){
				this.CourseDetail.courseId = row.courseId
				this.CourseDetail.coursedetailsId = row.coursedetailsId
				this.CourseDetail.coursedetailsName = row.coursedetailsName
				this.CourseDetail.coursesequence = row.coursesequence
				this.CourseDetail.updatename = this.$store.state.loginname
				this.CourseDetail.addname = null
				this.dialogVisible2 = true
			},
			updateCourseDetail(CourseDetail) {
				this.$refs[CourseDetail].validate((valid) => {
					if (valid) {
						const _this = this
						this.axios.put("http://localhost:8080/Training/updateByCourseDetailsKey", this.CourseDetail)
							.then(function(response) {
								_this.dialogVisible2 = false
								_this.FindCourseDetailData();
							}).catch(function(error) {
								console.log(error)
							})
					} else {
						console.log("修改失败！");
						return false;
					}
				})
			},
			handleCurrentChange(page) {
				var _this = this
				this.pageInfo.currentPage = page;
				this.axios.get("http://localhost:8080/Training/selectAllCourseDetails", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.CourseDetailData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(size) {
				var _this = this
				this.pageInfo.pagesize = size;
				this.axios.get("http://localhost:8080/Training/selectAllCourseDetails", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.CourseDetailData = response.data.list
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
				this.axios.get("http://localhost:8080/Training/selectAllCourseDetails", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.CourseDetailData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			deleteCourseDetail() {
				var ids = this.multipleSelection.map(item => item.coursedetailsId).join()
				console.log(ids)
				this.$confirm('此操作将永久删除选中信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					const _this = this
					this.CourseDetail.deletename = this.$store.state.loginname
					this.axios.put("http://localhost:8080/Training/deleteByCourseDetailsKey/" + ids+"/"+this.$store.state.loginname)
						.then(function(response) {
							_this.FindCourseDetailData();
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
		},
		created() {
			var _this = this
			this.axios.get("http://localhost:8088/Training/selectAllCourseDetails", {
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response)
					_this.CourseDetailData = response.data.list
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
		box-shadow: 0 0 0 0 #eaeaea,0 2px 2px 1px #eaeaea;
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
</style>
