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
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes
})

export default router
