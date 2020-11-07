import {post} from './https'

// export const API_URL = 'https://mall.wanxiangjn.cn/';
export const API_URL = 'https://51more.sdream.top/';


//系统相关
export const Login = (params) => post(API_URL + 'admin/login', params, {
	token: false
}); //登陆
export const modAdminPwd = (params) => post(API_URL + 'admin/admin/pwd', params, {}); //修改密码
export const configIndex = (params) => post(API_URL + 'admin/config/index', params, {}); //获取所有配置项
export const configSave = (params) => post(API_URL + 'admin/config/save', params, {}); //修改所有配置项
export const adminAuthList = (params) => post(API_URL + 'admin/admin/auth_list', params, {}); //获取用户权限列表
export const admin = (params) => post(API_URL + 'admin/admin/index', params, {}); //获取用户权限列表
export const adminSave = (params) => post(API_URL + 'admin/admin/save', params, {}); //获取用户权限列表
export const adminDel = (params) => post(API_URL + 'admin/admin/del', params, {}); //获取用户权限列表
export const adminStatus = (params) => post(API_URL + 'admin/admin/status', params, {}); //获取用户权限列表
export const role = (params) => post(API_URL + 'admin/role/index', params, {}); //获取角色列表
export const roleAuthList = (params) => post(API_URL + 'admin/role/auth_list', params, {}); //修改所有配置项
export const roleSave = (params) => post(API_URL + 'admin/role/save', params, {}); //获取角色列表
export const roleDel = (params) => post(API_URL + 'admin/role/del', params, {}); //获取角色列表
export const roleStatus = (params) => post(API_URL + 'admin/role/status', params, {}); //获取角色列表
export const roleRefresh = (params) => post(API_URL + 'admin/role/refresh', params, {}); //刷新权限
export const getConfig = (params) => post(API_URL + 'admin/config/get', params, {}); //获取系统配置项
export const saveConfig = (params) => post(API_URL + 'admin/config/save', params, {}); //获取系统配置项

export const getStatus = (params) => post(API_URL + 'admin/getStatus', params, {}); //获取各种状态

// 用户相关
export const member = (params) => post(API_URL + 'admin/userList', params, {}); //用户列表
export const memberSave = (params) => post(API_URL + 'admin/setUserStatus', params, {}); //用户状态


// 商品管理
export const addGoods = (params) => post(API_URL + 'admin/goods/save', params, {}); //添加修改商品
export const goodList = (params) => post(API_URL + 'admin/goods/goodsList', params, {}); //商品列表
export const setGoods = (params) => post(API_URL + 'admin/goods/setStatus', params, {}); //设置商品状态

export const editCate = (params) => post(API_URL + 'admin/goods/editCate', params, {}); //添加修改分类
export const getCate = (params) => post(API_URL + 'admin/goods/getCate', params, {}); //获取分类列表
export const cateStatus = (params) => post(API_URL + 'admin/goods/cateStatus', params, {}); //设置分类状态

export const saveSupplier = (params) => post(API_URL + 'admin/goods/saveSupplier', params, {}); //添加修改供货商
export const supplier = (params) => post(API_URL + 'admin/goods/supplier', params, {}); //获取供货商

export const postage = (params) => post(API_URL + 'admin/goods/postage', params, {}); //获取邮费模板
export const postageInfo = (params) => post(API_URL + 'admin/goods/postageInfo', params, {}); //获取邮费模板详情
export const editPostage = (params) => post(API_URL + 'admin/goods/editPostage', params, {}); //添加修改邮费模板
export const getArea = (params) => post(API_URL + 'admin/goods/getArea', params, {}); //获取城市




// 订单管理
export const orderList = (params) => post(API_URL + 'admin/order/orderList', params, {}); //订单列表
export const orderInfo = (params) => post(API_URL + 'admin/order/orderGoods', params, {}); //订单详情
export const addPost = (params) => post(API_URL + 'admin/order/goodsDeliver', params, {}); //添加快递单号
export const getPostType = (params) => post(API_URL + 'admin/order/getPostType', params, {}); //获取物流公司
export const goodsDeliver = (params) => post(API_URL + 'admin/order/goodsDeliver', params, {}); //发货

// 轮播管理
export const bannerList = (params) => post(API_URL + 'admin/config/banner', params, {}); //轮播图列表
export const bannersave = (params) => post(API_URL + 'admin/config/bannerSave', params, {}); //轮播图修改
export const bannerdel = (params) => post(API_URL + 'admin/config/delBanner', params, {}); //轮播图删除
export const setBanner = (params) => post(API_URL + 'admin/config/bannerStu', params, {}); //修改轮播图状态

