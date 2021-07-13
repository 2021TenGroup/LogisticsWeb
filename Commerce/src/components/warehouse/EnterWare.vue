<template>
<div class="border">
  <div>
    <el-button @click="dialogFormVisible = true" class="addbutton">添加</el-button>
    	<!-- 查询 -->
	  <el-form :inline="true" :model="formInline" class="chaxun">
  <el-form-item label="">
    <el-input v-model="this.waybillIdd" placeholder="运单号" class=""></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="selectOne(this.waybillIdd)">查询</el-button>
  </el-form-item>
</el-form>
  </div>
      <el-table
    :data="waredate"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="enterCode"
      label="入库编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="waybillId"
      label="运单号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="outletsId"
      label="入库网点"
      width="120">
    </el-table-column>
    <el-table-column
      prop="enterTime"
      label="入库时间"
      width="300">
    </el-table-column>
    <el-table-column
      prop="enterPeople"
      label="入库人"
      width="600">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template #default="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 入库弹窗 -->
<!-- Form -->
<el-dialog title="入库登记" v-model="dialogFormVisible">
  <el-form :model="form">
    <!-- <el-form-item label="入库编码" :label-width="formLabelWidth">
      <el-input v-model="form.enterCode"></el-input> -->
    <!-- </el-form-item> -->
     <el-form-item label="运单号" :label-width="formLabelWidth">
      <el-input v-model="form.waybillId"></el-input>
    </el-form-item>
     <el-form-item label="入库人" :label-width="formLabelWidth">
      <el-input v-model="form.enterPeople" disabled></el-input>
    </el-form-item>
    <el-form-item label="入库网点" :label-width="formLabelWidth">
         <el-input v-model="form.outletsId"></el-input>
    </el-form-item>
      <el-form-item label="入库时间" :label-width="formLabelWidth">
      <div class="block">
      <span class="demonstration"></span>
      <el-date-picker
      v-model="form.enterTime"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </div>
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addWare()">确 定</el-button>
    </span>
  </template>
</el-dialog>

</div>

</template>

<script>
import { ElMessage } from 'element-plus'
  export default {
    data() {
      // PageSi
      return {
        dialogFormVisible: false,
        waredate:[],
        form:{
          outletsId:"",//入库网点
          waybillId:"",
          enterCode:"",
          enterTime:"",
          enterPeople:this.$store.state.loginname,
          upOutletsId:""
        },
        waybillIdd:"",
        OutletsData:{
          OutletsId:"",  //网点id
          OutletsName:"" //网点名称
        },
      
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      // 入库
      addWare(){
        this.dialogFormVisible = false;
				const _this = this
        this.form.enterPeople = this.$store.state.loginname //入库人
        // console.log( this.form.enterPeople);

				this.axios.post("http://localhost:8089/Logistics/warehous/enterAdd",this.form)
					.then(function(response){
						console.log(response);
						var ware = response.data
						_this.waredate.push(ware)  //表格
						_this.dialogFormVisible = false
            // alert("入库成功")  
            location.reload(); 
            	_this.doquery();
					}).catch(function(error){
						console.log(error);
					})
			},
      selectOne(a){
			   const _this = this
			this.axios.get("http://localhost:8089/Logistics/warehous/selectOne/"+a)
			.then(function(response){
				var ware=response.data;
        _this.waredate=[];
        	_this.waredate.push(ware);
				console.log(response.data);
			}).catch(function(error){
				console.log(error);
			})
      },

      //查询所有网点
      selectAllOut(){
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


      },
      doquery(){
        const _this = this
			this.axios.get("http://localhost:8089/Logistics/warehous/seletAll")
			.then(function(response){
				_this.waredate=response.data;
				console.log(response);
			}).catch(function(error){
				console.log(error);
			})
      }
       
    },
    //查询所有入库信息
    created(){
		this.doquery();
		}
    
  }
</script>

<style>
.border{
    margin: 15px;
}
.addbutton{
  float: left;
  margin:20px;
}
.chaxun{
  padding-top:15px;
}

</style>
