// import Vue from 'vue'
import Mock from 'mockjs'
// process.env.NODE_ENV === "development" ? Vue.use(Mock) : null;

import tableAPI from './data'
import salesAPI from './sales'
import userAPI from './user'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
    timeout: '300-600'
})

// 资金相关
Mock.mock(/\/data\/get/, 'get', tableAPI.getdataList)
Mock.mock(/\/data\/remove/, 'get', tableAPI.deletedata)
Mock.mock(/\/data\/batchremove/, 'get', tableAPI.batchremovedata)
Mock.mock(/\/data\/add/, 'get', tableAPI.createdata)
Mock.mock(/\/data\/edit/, 'get', tableAPI.updatedata)
// sales相关
Mock.mock(/\/sales\/get/, 'get', salesAPI.getSalesList)
// user相关
Mock.mock(/\/user\/login/, 'get', userAPI.login)
Mock.mock(/\/user\/logout/, 'get', userAPI.logout)
Mock.mock(/\/user\/info\/get/, 'get', userAPI.getUserInfo)
Mock.mock(/\/user\/list\/get/, 'get', userAPI.getUserList)

export default Mock;