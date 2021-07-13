import {
	createRouter,
	createWebHashHistory,
	createWebHistory
} from 'vue-router'
/* 首页 */
import HomePage from '../components/HomePage.vue'
/* 左侧导航栏 */
import ShowLeft from '../components/ShowLeft.vue'
/* 头部导航栏 */
import ShowTop from '../components/ShowTop.vue'
/* 首页内容 */
import ShowPanel from '../components/ShowPanel.vue'
/* 客户维护 */
import Client from '../components/information/Client.vue'
/* 网点维护 */
import NetWork from '../components/information/NetWork.vue'
/* 单号规则 */
import Rule from '../components/information/Rule.vue'
/* 员工维护 */
import Emp from '../components/information/Emp.vue'
/* 单号发放 */
import Grant from '../components/information/Grant.vue'

/* 代收货款查询 */
import PaymentGoodsSelect from '../components/finance/PaymentGoodsSelect.vue'
/* 代收货款管理 */
import PaymentGoodsManage from '../components/finance/PaymentGoodsManage.vue'
/* 运费账单 */
import CashBill from '../components/finance/CashBill.vue'
/* 维护账单 */
import MaintenanceSheet from '../components/finance/MaintenanceSheet.vue'
/* 预付款设置 */
import AdvancePaymentSetup from '../components/finance/AdvancePaymentSetup.vue'
/* 充值 */
import Recharge from '../components/finance/Recharge.vue'
/* 充值记录 */
import RechargeRecord from '../components/finance/RechargeRecord.vue'
/* 测试管理 */
import DemoManage from '../components/finance/demoManage.vue'

/* 入库登记*/
import EnterWare from '../components/warehouse/EnterWare.vue'
// 出库登记
import OutWare from '../components/warehouse/OutWare.vue'

import AddOrder from '../components/ordersallocation/AddOrder.vue'
import OrderMaster from '../components/ordersallocation/OrderMaster.vue'

import CommissionM from '../components/information/CommissionM.vue'
import TypeM from '../components/information/TypeM.vue'

const routes = [{
		path: '/',
		redirect: '/HomePage'
	},
	{
		path: '/HomePage',
		name: 'HomePage',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: ShowPanel
		}
	},
	{
		path: '/Client',
		name: 'Client',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Client
		}
	},
	{
		path: '/NetWork',
		name: 'NetWork',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: NetWork
		}
	},
	{
		path: '/Rule',
		name: 'Rule',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Rule
		}
	},
	{
		path: '/Grant',
		name: 'Grant',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Grant
		}
	},
	{
		path: '/Emp',
		name: 'Emp',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Emp
		}
	},
	{
		path: '/PaymentGoodsSelect',
		name: 'PaymentGoodsSelect',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: PaymentGoodsSelect
		}
	},
	{
		path: '/PaymentGoodsManage',
		name: 'PaymentGoodsManage',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: PaymentGoodsManage
		}
	},
	{
		path: '/CashBill',
		name: 'CashBill',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: CashBill
		}
	},
	{
		path: '/MaintenanceSheet',
		name: 'MaintenanceSheet',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: MaintenanceSheet
		}
	},
	{
		path: '/AdvancePaymentSetup',
		name: 'AdvancePaymentSetup',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: AdvancePaymentSetup
		}
	},
	{
		path: '/Recharge',
		name: 'Recharge',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Recharge
		}
	},
	{
		path: '/RechargeRecord',
		name: 'RechargeRecord',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: RechargeRecord
		}
	},
	{
		path: '/DemoManage',
		name: 'DemoManage',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: DemoManage
		}
	},
	{
		path: '/EnterWare',
		name: 'EnterWare',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: EnterWare
		}
	},
	{
		path: '/OutWare',
		name: 'OutWare',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: OutWare
		}
	},
	{
		path: '/AddOrder',
		name: 'AddOrder',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: AddOrder
		}
	},
	{
		path: '/OrderMaster',
		name: 'OrderMaster',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: OrderMaster
		}
	},
	{
		path: '/CommissionM',
		name: 'CommissionM',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: CommissionM
		}
	},
	{
		path: '/TypeM',
		name: 'TypeM',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: TypeM
		}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes
})

export default router
