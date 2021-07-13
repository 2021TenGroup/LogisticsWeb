<template>
	<div>
	<el-row style="margin-top: 10px;">
		<el-col :span="2">
			<div style="height: 50px;">
				<el-button @click="addType()" style="background:#337ab7;border-color: #337ab7;color: #fff;">
					<i class="el-icon-circle-plus-outline"></i>添加</el-button>
			</div>
		</el-col>
	</el-row>
	 <el-table
	      :data="tableData"
	      style="width: 99%; margin-left: 5px;">
	      <el-table-column fixed 
	        prop="typeId"
	        label="序号"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="typeName"
	        label="类型名称"
	        >
	      </el-table-column>
		  <el-table-column
		    prop="typeMoney"
		    label="金额"
		    width="180">
		  </el-table-column>
	      <el-table-column
	        prop="remarks"
	        label="备注"
			width="220">
	      </el-table-column>
		  <el-table-column
		    prop="operation"
		    label="操作"
			width="140">
			<template #default="scope">
				<el-button type="danger" icon="el-icon-delete" size="small" @click="delType(scope.row)"></el-button>
			</template>
		  </el-table-column>
	    </el-table>
	<el-dialog title="添加" v-model="dialogVisible" width="30%" :before-close="handleClose">
			<el-form :model="Types" :rules="rules" ref="Types">
				<el-form-item>
					<el-input v-model="Types.typeName" placeholder="请输入报价名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="Types.typeMoney" placeholder="请输入金额"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="Types.remarks" placeholder="请输入备注" type="textarea" ></el-input>
				</el-form-item>
				<el-form-item style="margin-right: 80px;">
					<el-button type="primary" @click="add()"><i class="el-icon-s-promotion"></i>提交</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name:"TypeM",
      data() {
        return {
          tableData: [],
		  Types:{
		  			typeId:"",
		  			typeName:"",
		  			typeMoney:"",
		  			remarks:"",
		  			addname:"",
		  			addtime:"",
		  			updatename:"",
		  			updatetime:"",
		  			deletename:"",
		  			deletetime:"",
		  			timeliness:""
		  },
		  dialogVisible:false
        }
      },
	  methods:{		
		addType(){
			this.dialogVisible=true;
			Object.keys(this.Types).forEach((key)=>(this.Types[key]=""))
		},
		add(){
			this.Types.addname=this.$store.state.loginname
			this.Types.timeliness=0
			const _this=this
			this.axios.post("http://localhost:8089/Logistics/types/add",this.Types)
				.then(function(res){
					_this.getTypeDate();
					_this.dialogVisible=false
				}).catch(function(error){
					console.log(error)
				})
		},
		 getTypeDate(){
			 var _this=this;
			 this.axios.get("http://localhost:8089/Logistics/types/selAll")
			 .then((res)=>{
				 _this.tableData=res.data.data;
				 console.log(res.data.data)
			 })
			 .catch((err)=>{});
		 },
		 delType(row) {
			this.Types.typeId=row.typeId
			// console.log(row.typeId+"=="+Types.typeId)
			this.Types.deletename=this.$store.state.loginname
		 	const _this = this
		 	var flag = true
		 	this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		 		confirmButtonText: '确定',
		 		cancelButtonText: '取消',
		 		type: 'warning'
		 	}).then(() => {
		 		// _this.axios.delete("http://localhost:8089/Logistics/types/del/" + row.typeId)
				_this.axios.put("http://localhost:8089/Logistics/types/del",this.Types)
		 			.then(function(response) {
		 				_this.getTypeDate();
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
	 created(){
	 		  this.getTypeDate();
	 }
    }	
</script>

<style>
</style>
