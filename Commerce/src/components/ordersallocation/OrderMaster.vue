<template>
	<div>
		<el-row style="margin-top: 10px;">
			<el-col :span="2">
				<div style="height: 40px;">
					<el-button @click="addOrder()" style="background:#337ab7;border-color: #337ab7;color: #fff;">
						<i class="el-icon-plus"></i>创建订单</el-button>
				</div>
			</el-col>
		</el-row>
		<el-table :data="tableData" style="width: 99%; margin-left: 5px;">
			<!-- <el-table-column prop="oTime" label="添加时间" width="180"> -->
			<!-- </el-table-column>
			<el-table-column prop="orderSource" label="订单来源" width="180">
			</el-table-column> -->
			<el-table-column prop="addressee" label="收件人" width="180">
			</el-table-column>
			<el-table-column prop="aPhone" label="收件人电话" width="180">
			</el-table-column>
			<el-table-column prop="receivingAddress" label="收件地址" width="180">
			</el-table-column>
			<el-table-column prop="sender" label="寄件人" width="180">
			</el-table-column>
			<el-table-column prop="senderPhone" label="寄件人电话" width="180">
			</el-table-column>
			<el-table-column prop="mailingAddress" label="寄件地址" width="180">
			</el-table-column>
			<el-table-column prop="goodNumber" label="件数" width="180">
			</el-table-column>
			<el-table-column prop="weight" label="重量" width="180">
			</el-table-column>
			<el-table-column prop="remarks" label="备注" width="180">
			</el-table-column>
			<el-table-column fixed="right" prop="operation" label="操作" width="200">
				<template #default="scope">
					<el-button type="primary" size="small" @click="showEdit(scope.row)">录入</el-button>
					<el-button type="danger" size="small" @click="delOrder(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="添加" v-model="dialogVisible" width="70%" :before-close="handleClose">
			<el-form :model="Orders" :rules="rules" ref="Orders" inline="true">
				<div class="title">基本信息</div>
				<div style="align-content: center;">
					<el-form-item label="寄件人:">
						<el-input v-model="Orders.sender" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="寄件手机:">
						<el-input v-model="Orders.senderPhone" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="寄件邮编:">
						<el-input v-model="Orders.postcode" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="详细地址:">
						<el-input v-model="Orders.mailingAddress" placeholder="请输入"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="收件人:">
						<el-input v-model="Orders.addressee" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="收件手机:">
						<el-input v-model="Orders.aPhone" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="收件邮编:">
						<el-input v-model="Orders.receivingCode" placeholder="请输入"></el-input>
					</el-form-item>
					<el-form-item label="详细地址:">
						<el-input v-model="Orders.receivingAddress" placeholder="请输入"></el-input>
					</el-form-item>
				</div>
				<el-form-item style="margin-right: 80px;">
					<el-button type="primary" @click="add()"><i class="el-icon-s-promotion"></i>提交</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog title="订单录入" v-model="dialogVisible2" width="70%" :before-close="handleClose">
			<el-form :model="Orders" :rules="rules" ref="Orders" inline="true">
				<el-form-item style="margin-right: 80px;">
					<el-button type="primary" @click="updateOrders()"><i class="el-icon-s-promotion"></i>保存</el-button>
				</el-form-item>
				<div class="title">基本信息</div>
				<div style="align-content: center;">
					<el-form-item label="寄件人:">
						<el-input v-model="Orders.sender"></el-input>
					</el-form-item>
					<el-form-item label="寄件手机:">
						<el-input v-model="Orders.senderPhone"></el-input>
					</el-form-item>
					<el-form-item label="详细地址:">
						<el-input v-model="Orders.mailingAddress"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="收件人:">
						<el-input v-model="Orders.addressee"></el-input>
					</el-form-item>
					<el-form-item label="收件手机:">
						<el-input v-model="Orders.aPhone"></el-input>
					</el-form-item>
					<el-form-item label="详细地址:">
						<el-input v-model="Orders.receivingAddress"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="物品类型:">
						<el-input v-model="Orders.addressee"></el-input>
					</el-form-item>
					<el-form-item label="物品类型名称:">
						<el-input v-model="Orders.goodName"></el-input>
					</el-form-item>
					<el-form-item label="件数:">
						<el-input v-model="Orders.goodNumber"></el-input>
					</el-form-item>
					<el-form-item label="重量:">
						<el-input v-model="Orders.weight"></el-input>
					</el-form-item>
					<el-form-item label="运费:">
						<el-input v-model="Orders.volume"></el-input>
					</el-form-item>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "OrderMaster",
		data() {
			return {
				tableData: [],
				Orders: {
					oId: "",
					oTime: "",
					orderSource: "",
					addressee: "",
					aPhone: "",
					receivingAddress: "",
					sender: "",
					senderPhone: "",
					mailingAddress: "",
					goodNumber: "",
					weight: "",
					remarks: "",
					addname: "",
					addtime: "",
					updatename: "",
					updatetime: "",
					deletename: "",
					deletetime: "",
					timeliness: ""
				},
				dialogVisible: false,
				dialogVisible2: false
			}
		},
		methods: {
			addOrder() {
				this.dialogVisible = true;
				Object.keys(this.Orders).forEach((key) => (this.Orders[key] = ""))
			},
			add() {
				this.Orders.addname = this.$store.state.loginname
				this.Orders.timeliness = 0
				const _this = this
				this.axios.post("http://localhost:8089/Logistics/orders/addOrders", this.Orders)
					.then(function(res) {
						_this.dialogVisible = false
						_this.getOrderDate();

					}).catch(function(error) {
						console.log(error)
					})
			},
			showEdit(row) {
				this.Orders.oId = row.oid
				this.Orders.oTime = row.otime
				this.Orders.orderSource = row.orderSource
				this.Orders.addressee = row.addressee
				this.Orders.aPhone = row.aPhone
				this.Orders.receivingAddress = row.receivingAddress
				this.Orders.sender = row.sender
				this.Orders.senderPhone = row.senderPhone
				this.Orders.mailingAddress = row.mailingAddress
				this.Orders.updatename = this.$store.state.loginname
				this.Orders.addname = null
				this.dialogVisible2 = true
			},
			updateOrders() {
				const _this = this
				console.log(_this.Orders)
				this.axios.put("http://localhost:8089/Logistics/orders/updOrders/"+_this.Orders.oId, _this.Orders)
					.then(function(response) {
						
						_this.dialogVisible2 = false
						_this.getOrderDate();
					}).catch(function(error) {
						console.log(error)
					})
			},
			getOrderDate() {
				var _this = this;
				this.axios.get("http://localhost:8089/Logistics/orders/list")
					.then((res) => {
						_this.tableData = res.data.data;
						console.log(_this.tableData)
						console.log(res.data.data)
					})
					.catch((err) => {});
			},
			delOrder(row) {
				this.Orders.oId = row.oid
				this.Orders.deletename = this.$store.state.loginname
				console.log(row.oid)
				const _this = this
				var flag = true
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.axios.put("http://localhost:8089/Logistics/orders/del", row)
						.then(function(response) {
							_this.getOrderDate();
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '取消删除!'
					});
				});
			}
		},
		created() {
			this.getOrderDate();
		}
	}
</script>

<style>
	.el-table td,
	.el-table th {
		text-align: center;
	}

	.el-dialog {
		text-align: left;
	}

	.el-dialog-header {
		padding: 10px;
		background: #f8f8f8;
		border-radius: 5px 5px 0 0;
		border-bottom: 1px solid #eee;
	}

	.title {
		font-weight: 600;
		font-size: 14px;
		height: 36px;
		line-height: 36px;
		padding: 0 15px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		background-color: #eee;
		border-radius: 3px 3px 0 0;
		width: 100%;
	}
</style>
