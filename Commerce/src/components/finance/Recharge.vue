
<template>
 <div style="width: 50%;">
	 <el-form :model="Customer" :rules="rules" ref="Customer" label-width="100px" class="demo-ruleForm">
	   <el-row>
		   <el-form-item label="操作网点:" >
		     <el-input model-value="湖南省网点" disabled></el-input>
		   </el-form-item>
		   <el-form-item label="操作网点ID:" prop="outletsId" style="display: none;">
		     <el-input v-model="Customer.outletsId"></el-input>
		   </el-form-item>
		   <el-form-item label="操作人:" prop="addname">
		     <el-input v-model="Customer.addname" disabled></el-input>
		   </el-form-item>
	   </el-row>
	   <el-row>
		   <el-form-item label="网点:" prop="reNetwork">
		     <el-select v-model="Customer.reNetwork" placeholder="请选择活动区域">
		       <el-option label="湖南省网点" value="1"></el-option>
		       <el-option label="长沙市网点" value="2"></el-option>
			   <el-option label="株洲市网点" value="3"></el-option>
		     </el-select>
		   </el-form-item>
		   <el-form-item label="付款类型:" prop="reType">
		     <el-select v-model="Customer.reType" placeholder="请选择活动区域">
		       <el-option label="充值" value="0"></el-option>
		       <el-option label="冲账" value="1"></el-option>
		     </el-select>	
		   </el-form-item>
	   </el-row>
	   <el-form-item label="交付金额:" prop="reMoney">
	     <el-input v-model="Customer.reMoney"></el-input>
	   </el-form-item>
	   <el-form-item label="备注" prop="reRemarks">
	     <el-input type="textarea" v-model="Customer.reRemarks"></el-input>
	   </el-form-item>
	   <el-form-item>
	     <el-button type="primary" @click="submitForm('Customer')">提交</el-button>
	     <el-button @click="resetForm('Customer')">重置</el-button>
	   </el-form-item>
	 </el-form>
 </div>
</template>

<script>
  export default {
    data() {
      return {
        Customer: {
			reId:'',
			outletsId:'',
			reNetwork:'',
			reType:'',
			reMoney:'',
			reRemarks:'',
			addname:'',
			addtime:'',
			updatename:'',
			updatetime:'',
			deletename:'',
			deletetime:'',
			timeliness:'',
			empId:'',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
	  submitForm() {
	  				this.Customer.addname = this.$store.state.loginname
	  				this.Customer.timeliness = 0
	  				const _this = this
	  				this.axios.post("http://localhost:8089/Logistics/addAdvance", this.Customer)
	  					.then(function(response) {
							console.log(win)
	  					}).catch(function(error) {
	  						console.log(error)
	  					})
					this.$notify({
						title: '成功',
						message: '充值成功',
						type: 'success'
					})
	  			}
    },
	created() {
		this.Customer.outletsId = 1
		this.Customer.addname = this.$store.state.loginname
	}
  }
</script>

<style>

</style>
