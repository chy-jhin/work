export default [

	// 用户管理
	// {
	// 	path: '/member',
	// 	redirect: '/member/index',
	// 	component: {
	// 		render: h => h('router-view')
	// 	},
	// 	meta: {
	// 		title: '用户管理',
	// 		icon: 'el-icon-user-solid'
	// 	},
	// 	children: [{
	// 		path: '/member/index',
	// 		component: resolve => require(['@/view/member/index'], resolve),
	// 		meta: {
	// 			authList: [18,19],
	// 			title: '用户列表',
	// 			icon: 'el-icon-user'
	// 		}
	// 	}]
	// },
		// 商品管理
		{
			path: '/goods',
			redirect: '/goods/index',
			component: {
				render: h => h('router-view')
			},
			meta: {
				title: '商品管理',
				icon: 'el-icon-files'
			},
			children: [{
				path: '/goods/index',
				component: resolve => require(['@/view/goods/index'], resolve),
				meta: {
					authList: [14,15],
					title: '商品列表',
					icon: 'el-icon-s-unfold'
				}
			},
			{
				path: '/goods/GoodsType/index',
				component: resolve => require(['@/view/goods/GoodsType/index'], resolve),
				meta: {
					authList: [20,21],
					title: '商品分类',
					icon: 'el-icon-s-grid'
				}
			},
			{
				path: '/goods/PostMoney/index',
				component: resolve => require(['@/view/goods/PostMoney/index'], resolve),
				meta: {
					authList: [22],
					title: '邮费模板',
					icon: 'el-icon-document'
				}
			},
			{
				path: '/goods/supplier/index',
				component: resolve => require(['@/view/goods/supplier/index'], resolve),
				meta: {
					authList: [22],
					title: '供货商',
					icon: 'el-icon-truck'
				}
			}
		]
		},
		// 订单管理
		{
			path: '/order',
			redirect: '/order/index',
			component: {
				render: h => h('router-view')
			},
			meta: {
				title: '订单管理',
				icon: 'el-icon-film'
			},
			children: [{
				path: '/order/index',
				component: resolve => require(['@/view/order/index'], resolve),
				meta: {
					title: '订单列表',
					icon: 'el-icon-chat-line-square',
					authList: [16,17],
				},
			}]
		},
		// 轮播管理
		// {
		// 	path: '/banner',
		// 	redirect: '/banner/banner',
		// 	component: {
		// 		render: h => h('router-view')
		// 	},
		// 	meta: {
		// 		title: '轮播管理',
		// 		icon: 'el-icon-user-solid'
		// 	},
		// 	children: [{
		// 		path: '/banner/banner',
		// 		component: resolve => require(['@/view/banner/banner'], resolve),
		// 		meta: {
		// 			title: '轮播列表',
		// 			icon: 'el-icon-user',
		// 			authList: [19],
		// 		},
		// 	}]
		// },





	

	//系统设置
	// {
	// 	path: '/config',
	// 	redirect: '/config/index',
	// 	component: {
	// 		render: h => h('router-view')
	// 	},
	// 	meta: {
	// 		title: '系统设置',
	// 		icon: 'el-icon-setting'
	// 	},
	// 	children: [
	// 		{
	// 			path: '/config/admin',
	// 			component: resolve => require(['@/view/config/admin'], resolve),
	// 			meta: {
	// 				authList: [1,2,3,4,5,6,7,8,9,10,11],
	// 				title: '系统用户',
	// 				icon: 'el-icon-user'
	// 			}
	// 		},
	// 		{
	// 			path: '/config/Home',
	// 			component: resolve => require(['@/view/config/Home'], resolve),
	// 			meta: {
	// 				authList: [12, 13, 19],
	// 				title: '系统设置',
	// 				icon: 'el-icon-setting'
	// 			}
	// 		}
	// 	]
	// }


];
