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
/* 代收货款查询 */
import PaymentGoodsSelect from '../components/finance/PaymentGoodsSelect.vue'
/* 代收货款管理 */
import PaymentGoodsManage from '../components/finance/PaymentGoodsManage.vue'
/* 运费账单 */
import CashBill from '../components/finance/CashBill.vue'
/* 维护账单 */
import MaintenanceSheet from '../components/finance/MaintenanceSheet.vue'
/* 维护账单 */
import MaintenanceSheetTotal from '../components/finance/MaintenanceSheetTotal.vue'

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
		path: '/MaintenanceSheetTotal',
		name: 'MaintenanceSheetTotal',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: MaintenanceSheetTotal
		}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes
})

export default router
