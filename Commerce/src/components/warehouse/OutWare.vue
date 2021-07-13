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
      prop="outCode"
      label="出库编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="waybillId"
      label="运单号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="downOutletsId"
      label="下一网点"
      width="120">
    </el-table-column>
    <el-table-column
      prop="outTime"
      label="出库时间"
      width="300">
    </el-table-column>
    <el-table-column
      prop="outPeople"
      label="出库人"
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

  <!-- 出库弹窗 -->
<!-- Form -->
<!-- Form -->
<el-dialog title="出库登记" v-model="dialogFormVisible">
  <el-form :model="form">
     <el-form-item label="运单号" :label-width="formLabelWidth">
      <el-input v-model="form.waybillId"></el-input>
    </el-form-item>
     <el-form-item label="出库人" :label-width="formLabelWidth">
      <el-input v-model="form.outPeople"></el-input>
    </el-form-item>
     <el-form-item label="出库网点" :label-width="formLabelWidth">
           <el-input v-model="form.outletsId"></el-input>
     </el-form-item>
     <el-form-item label="下一网点" :label-width="formLabelWidth">
            <el-select v-model="form.downOutletsId" placeholder="请选择网点">
      <el-option label="长沙网点" value="1"></el-option>
      <el-option label="株洲网点" value="2"></el-option>
    </el-select>
     </el-form-item>
      <el-form-item label="出库时间" :label-width="formLabelWidth">
      <div class="block">
      <span class="demonstration"></span>
      <el-date-picker
      v-model="form.outTime"
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
  export default {
    data() {
      // PageSi
      return {
        dialogFormVisible: false,
        waredate:[],
        form:{
         outCode:"",//出库编码
          outTime:"",
          outPeople:"",
          downOutletsId:"",//出库网点
          outletsId:"" 
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
      // 出库
      addWare(){
        this.dialogFormVisible = false;
				const _this = this
        this.form.outPeople = this.$store.state.loginname //出库人
        console.log( this.form.outPeople);
				this.axios.put("http://localhost:8089/Logistics/warehous/outAdd",this.form)
					.then(function(response){
                        _this.shuaxin();
						console.log(response);
						var ware = response.data
						_this.waredate.push(ware)  //表格
						_this.dialogFormVisible = false
            // alert("出库成功")   
            	created();
					}).catch(function(error){
						console.log(error);
					})
			},
      selectOne(a){
			   const _this = this
			this.axios.get("http://localhost:8089/Logistics/warehous/selectOneByBill/"+a)
			.then(function(response){
					var ware=response.data;
                    _this.waredate=[];
        	        _this.waredate.push(ware);
				console.log(response);
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
					console.log("========",_this.OutletsData)
				}).catch(function(error) {
					console.log(error)
				})


      },
      shuaxin(){
          const _this = this
			this.axios.get("http://localhost:8089/Logistics/warehous/seletAllOut")
			.then(function(response){
				_this.waredate=response.data;
				console.log(response);
			}).catch(function(error){
				console.log(error);
			})
      }
       
    },
    //查询所有出库信息
    created(){
		 this.shuaxin();
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
