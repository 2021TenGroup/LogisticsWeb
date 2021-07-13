<template>
	<!-- 网点维护 -->
	<el-row>

	</el-row>
	<el-row class="el-show-over-menu-s" style="margin-top:20px;">
		<el-col :span="9" class="el-show-left-menu-s">
			<div class="ivu-mb ivu-card ivu-card-dis-hover">
				<div class="ivu-card-head6">
					<div class="el-div-show-butt-one">
						<el-button @click="addwd()" class="el-show-butt-two-s" style="color: #fff;background-color: #337ab7;border-color: #337ab7;">
							<i class="el-icon-circle-plus-outline"></i>
							新增
						</el-button>
						<el-button class="el-show-butt-two-s" style="color: #fff;background-color: #337ab7;border-color: #337ab7;">
							<i class="el-icon-edit"></i>
							编辑
						</el-button>
						<el-button class="el-show-butt-two-s" style="color: #fff;background-color: #d9534f;border-color: #d9534f;">
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
										<el-input class="el-show-input-one-s" v-model="Outletsvalue.outletsBelonging"
											disabled placeholder="所属网点">
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
						<el-form-item class="el-show-right-menus-input-two">
							<el-button class="el-show-btn-two-log-s" type="primary" style="display:none;">
								<i class="el-icon-document"></i>
								保存
							</el-button>
						</el-form-item>
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
				xz: [],
				form: {
					name: '',
					paths: ''
				},
				abdf: "",
				visible: false,
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
			addwd(){
				
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

	.el-form-item__content {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		line-height: 40px;
		position: relative;
		font-size: 14px;
		margin-left: 230px;
	}
</style>
