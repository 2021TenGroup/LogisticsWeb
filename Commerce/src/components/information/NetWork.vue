<template>
	<!-- 网点维护 -->
	<el-row>

	</el-row>
	<el-row class="el-show-over-menu-s" style="margin-top:20px;">
		<el-col :span="9" class="el-show-left-menu-s">
			<div class="ivu-mb ivu-card ivu-card-dis-hover">
				<div class="ivu-card-head6">
					<div class="el-div-show-butt-one">
						<el-button @click="addwd()" class="el-show-butt-two-s"
							style="color: #fff;background-color: #337ab7;border-color: #337ab7;">
							<i class="el-icon-circle-plus-outline"></i>
							新增
						</el-button>
						<el-button @click="showedit()" class="el-show-butt-two-s"
							style="color: #fff;background-color: #337ab7;border-color: #337ab7;">
							<i class="el-icon-edit"></i>
							编辑
						</el-button>
						<el-button @click="delCustomer()" class="el-show-butt-two-s"
							style="color: #fff;background-color: #d9534f;border-color: #d9534f;">
							<i class="el-icon-delete"></i>
							删除
						</el-button>
					</div>
				</div>
				<div class="ivu-menu-body-one-s">
					<div style="height: 249px;overflow: auto;">
						<div class="ivu-menu-bodys-one">
							<div class="ivu-menu-bodys-two">
								<el-input placeholder="输入关键字进行过滤" v-model="filterText">
								</el-input>
								<i class="ivu-menu-bodys-three-icon el-icon-search"></i>
							</div>
						</div>
						<div class="ivu-tree">
							<!-- <el-tree class="filter-tree" :data="OutletsData" :props="defaultProps" default-expand-all
								:filter-node-method="filterNode" ref="tree"> -->
							<el-tree @click="getCheckedKeys" show-checkbox v-model="abdf" :data="OutletsData"
								node-key="outletsId" :default-checked-keys="xz" :props="defaultProps" ref="tree"
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
						网点信息
					</span>
				</div>
			</div>
			<div class="el-show-right-menus-two">
				<div>
					<el-form ref="Outletsvalue" :model="Outletsvalue" label-width="80px">
						<div :style="{display:showtable1}">
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsNumber"
												disabled placeholder="网点编码">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsName"
												disabled placeholder="网点名称">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s"
												v-model="Outletsvalue.outletsBelonging" disabled placeholder="所属网点">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsPerson"
												disabled placeholder="负责人">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsPhone"
												disabled placeholder="手机号码">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsProvince"
												disabled placeholder="省份">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsCity"
												disabled placeholder="城市">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsRegion"
												disabled placeholder="区域">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsAddress"
												disabled placeholder="地址">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one" style="width:507px">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsRemarks"
												disabled placeholder="备注">
											</el-input>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div :style="{display:showtable2}">
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsNumber"
												placeholder="网点编码">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsName"
												placeholder="网点名称">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" :disabled="readOnly"
												placeholder="所属网点">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsPerson"
												placeholder="负责人">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsPhone"
												placeholder="手机号码">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<!-- <el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsProvince"
												placeholder="省份"> 
												</el-input>-->
											<el-select v-model="Outletsvalue.outletsProvince" placeholder="省份">
												<el-option v-for="item in adressdata1" :key="item.uname"
													:label="item.uname" :value="item.uname">
												</el-option>
											</el-select>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<!-- <el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsCity"
												placeholder="城市">
											</el-input> -->
											<el-select @click="showcity()" v-model="Outletsvalue.outletsCity"
												placeholder="城市">
												<el-option v-for="item in adressdata2" :key="item.uname"
													:label="item.uname" :value="item.uname">
												</el-option>
											</el-select>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<!-- <el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsRegion"
												placeholder="区域">
											</el-input> -->
											<el-select @click="showqu()" v-model="Outletsvalue.outletsRegion"
												placeholder="区域">
												<el-option v-for="item in adressdata3" :key="item.uname"
													:label="item.uname" :value="item.uname">
												</el-option>
											</el-select>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsAddress"
												placeholder="地址">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<div class="ivu-card-body-one" style="width:507px">
								<div class="ivu-description-list">
									<div class="el-div-show-input-one">
										<div class="ivu-description-detail">
											<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsRemarks"
												placeholder="备注">
											</el-input>
										</div>
									</div>
								</div>
							</div>
							<el-form-item class="el-show-right-menus-input-two">
								<el-button :style="{display:showbutton1}" @click="addCustomer2()" class="el-show-btn-two-log-s" type="primary">
									<i class="el-icon-document"></i>
									保存
								</el-button>
								<el-button :style="{display:showbutton2}" @click="updateCustomer()" class="el-show-btn-two-log-s" type="primary">
									<i class="el-icon-document"></i>
									保存
								</el-button>
							</el-form-item>
						</div>
					</el-form>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import {
		ElMessage
	} from 'element-plus'
	import qs from 'qs'
	export default {
		data() {
			return {
				input: "",
				OutletsData: [],
				Outlets: [],
				Outletsvalue: {
					outletsId: "",
					outletsNumber: "",
					outletsName: "",
					outletsBelonging: "",
					outletsPerson: "",
					outletsPhone: "",
					outletsProvince: "",
					outletsCity: "",
					outletsRegion: "",
					outletsAddress: "",
					outletsRemarks: "",
					addname: "",
					addtime: "",
					updatename: "",
					updatetime: "",
					deletename: "",
					deletetime: "",
					timeliness: ""
				},
				showtable1: "block",
				showtable2: "none",
				adressdata1: [{
					uname: "湖南省"
				}, {
					uname: "湖北省"
				}],
				adressdata2: [],
				adressdata3: [],
				xz: [],
				form: {
					name: '',
					paths: ''
				},
				abdf: "",
				visible: false,
				showbutton1:"block",
				showbutton2:"none",
				filterText: '',
				defaultProps: {
					children: 'children',
					label: 'outletsName'
				}
			}
		},
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
			}
		},
		methods: {
			filterNode(value, data) {
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			addwd() {
				if (Number(this.$refs.tree.getCheckedKeys()) == 0) {
					console.log("失败")
					ElMessage.warning({
						message: '请先选中一个网点',
						type: 'warning'
					});
				} else {
					Object.keys(this.Outletsvalue).forEach((key) => (this.Outletsvalue[key] = ""))
					this.showtable1 = "none"
					this.showtable2 = "block"
					this.showbutton1="block"
					this.showbutton2="none"
				}
			},
			delCustomer() {
				this.Outletsvalue.outletsId = Number(this.$refs.tree.getCheckedKeys())
				this.Outletsvalue.deletename = this.$store.state.loginname
				const _this = this
				var flag = true
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.axios.put("http://localhost:8089/Logistics/delOutletsVo", this.Outletsvalue)
						.then(function(response) {
							_this.FindCustomerData();
							Object.keys(_this.Outletsvalue).forEach((key) => (_this.Outletsvalue[key] = ""))
							_this.showtable1="block"
							_this.showtable2="none"
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
			showedit() {
				/* this.showtable1="none"
				this.showtable2="block" */
				if (Number(this.$refs.tree.getCheckedKeys()) == 0) {
					console.log("失败")
					ElMessage.warning({
						message: '请先选中一个网点',
						type: 'warning'
					});
				} else {
					console.log("成功")
					this.showtable1="none"
					this.showtable2="block"
					this.getCheckedKeys()
					this.showbutton1="none"
					this.showbutton2="block"
				}
			},
			selectAllRoleByEmpId() {
				this.xz = [];
				const _this = this;
				this.axios.get("http://localhost:8089/Logistics/selectAllOutletsList", {
						params: this.OutletsData
					})
					.then(function(response) {
						_this.OutletsData = response.data.data
						_this.OutletsData.forEach((item) => {
							_this.xz.push(item.outletsId)
						})
						_this.$nextTick(() => {
							_this.$refs.tree.setCheckedKeys(_this.xz);
						});
					}).catch(function(error) {
						console.log(error)
					})
			},
			addCustomer2() {
				if (Number(this.$refs.tree.getCheckedKeys()) == 0) {
					console.log("失败")
					ElMessage.warning({
						message: '请先选中一个网点',
						type: 'warning'
					});
				} else {
					console.log("添加成功")
					this.Outletsvalue.addname = this.$store.state.loginname
					this.Outletsvalue.timeliness = 0
					const _this = this
					this.axios.post("http://localhost:8089/Logistics/addOutlets", this.Outletsvalue)
						.then(function(response) {
							_this.FindCustomerData();
							Object.keys(_this.Outletsvalue).forEach((key) => (_this.Outletsvalue[key] = ""))
							_this.showtable2 = "none"
							_this.showtable1 = "block"
						}).catch(function(error) {
							console.log(error)
						})
				}
			},
			updateCustomer() {
				this.Outletsvalue.outletsId = Number(this.$refs.tree.getCheckedKeys())
				const _this = this
				this.axios.put("http://localhost:8089/Logistics/updateOutlets", this.Outletsvalue)
					.then(function(response) {
						_this.FindCustomerData();
						_this.showtable2 = "none"
						_this.showtable1 = "block"
					}).catch(function(error) {
						console.log(error)
					})
			},
			FindCustomerData() {
				this.xz = [];
				const _this = this;
				this.axios.get("http://localhost:8089/Logistics/selectAllOutletsList", {
						params: this.OutletsData
					})
					.then(function(response) {
						_this.OutletsData = response.data.data
						_this.OutletsData.forEach((item) => {
							_this.xz.push(item.outletsId)
						})
						_this.$nextTick(() => {
							_this.$refs.tree.setCheckedKeys([]);
						});
					}).catch(function(error) {
						console.log(error)
					})
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
			},
			showcity() {
				console.log(this.Outletsvalue.outletsProvince)
				if (this.Outletsvalue.outletsProvince == '湖南省') {
					this.adressdata2 = [{
						uname: "长沙市"
					}, {
						uname: "株洲市"
					}, {
						uname: "湘潭市"
					}]
				} else if (this.Outletsvalue.outletsProvince == '湖北省') {
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
				console.log(this.Outletsvalue.outletsProvince)
				if (this.Outletsvalue.outletsCity == '长沙市') {
					this.adressdata3 = [{
						uname: "天心区"
					}, {
						uname: "芙蓉区"
					}, {
						uname: "岳麓区"
					}]
				} else if (this.Outletsvalue.outletsCity == '株洲市') {
					this.adressdata3 = [{
						uname: "芦淞区"
					}, {
						uname: "天元区"
					}, {
						uname: "荷塘区"
					}]
				} else if (this.Outletsvalue.outletsCity == '湘潭市') {
					this.adressdata3 = [{
						uname: "雨湖区"
					}, {
						uname: "岳塘区"
					}, {
						uname: "韶山区"
					}]
				} else if (this.Outletsvalue.outletsCity == '武汉市') {
					this.adressdata3 = [{
						uname: "江汉区"
					}, {
						uname: "武昌区"
					}, {
						uname: "汉阳区"
					}]
				} else if (this.Outletsvalue.outletsCity == '宜昌市') {
					this.adressdata3 = [{
						uname: "西陵区"
					}, {
						uname: "夷陵区"
					}, {
						uname: "伍家岗区"
					}]
				} else if (this.Outletsvalue.outletsCity == '荆州市') {
					this.adressdata3 = [{
						uname: "荆州区"
					}, {
						uname: "沙市区"
					}, {
						uname: "经济技术开发区"
					}]
				}
			},
			getCheckedKeys() {
				console.log(Number(this.$refs.tree.getCheckedKeys()));
				const _this = this;
				var id = Number(this.$refs.tree.getCheckedKeys())
				this.axios.get("http://localhost:8089/Logistics/selectOutletsById/" + id, {
						params: id
					})
					.then(function(response) {
						console.log(response)
						_this.Outlets = response.data.data
						_this.Outletsvalue.outletsName = _this.Outlets.outletsName
						_this.Outletsvalue.outletsNumber = _this.Outlets.outletsNumber
						_this.Outletsvalue.outletsPhone = _this.Outlets.outletsPhone
						_this.Outletsvalue.outletsPerson = _this.Outlets.outletsPerson
						_this.Outletsvalue.outletsProvince = _this.Outlets.outletsProvince
						_this.Outletsvalue.outletsCity = _this.Outlets.outletsCity
						_this.Outletsvalue.outletsRegion = _this.Outlets.outletsRegion
						_this.Outletsvalue.outletsAddress = _this.Outlets.outletsAddress
						_this.Outletsvalue.outletsRemarks = _this.Outlets.outletsRemarks
						console.log(_this.Outlets)
					}).catch(function(error) {
						console.log(error)
					})
			}
		},
		created() {
			this.xz = [];
			const _this = this;
			this.axios.get("http://localhost:8089/Logistics/selectAllOutletsList", {
					params: this.OutletsData
				})
				.then(function(response) {
					_this.OutletsData = response.data.data
					_this.OutletsData.forEach((item) => {
						_this.xz.push(item.outletsId)
					})
					_this.$nextTick(() => {
						_this.$refs.tree.setCheckedKeys([]);
					});
				}).catch(function(error) {
					console.log(error)
				})
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
		height: 350px;
		padding: 16px;
		margin-right: 3px;
		box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
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

	.ivu-card-body-one {
		display: inline-block;
		padding-left: 13px;
		padding-right: 16px;
		width: 150px;
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
		height: 357px;
		background: #FFF;
		box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
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

	.el-input__inner {
		-webkit-appearance: none;
		background-color: #FFF;
		border-radius: 4px;
		border: 1px solid #DCDFE6;
		box-sizing: border-box;
		display: inline-block;
		height: 32px;
		line-height: 40px;
		outline: 0;
		padding: 0 15px;
		-webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		width: 100%;
	}
</style>
