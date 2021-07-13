<template>
	<div id="demoManageDiv">
		<el-button>代收货款添加</el-button>
		<el-button>代收货款完成</el-button>
		<hr />
		<el-button>运费账单添加</el-button>
		<el-button>运费账单完成</el-button>
		<hr/>
		<el-button @click="clickDemo">维护账单添加</el-button>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				addFiMdEntity:{
					// 运单ID
					waybillNumber:'dlw001',		
					// 订单ID
					outletsName:'株洲市网点',
					// 员工ID
					userName:'张三',
					// 运单编号
					type:1
				}
			}
		},
		methods:{
			clickDemo(){
				var _this = this
				this.axios.post("http://localhost:8089/Logistics/fiMoneyDetailed/addFiMD",this.addFiMdEntity).then(res => {
					
				})
			}
		}
	}
</script>

<style>
	#demoManageDiv{
		margin-top: 50px;
	}
	#demoManageDiv button{
		margin: 20px 30px 20px 30px;
	}
</style>
