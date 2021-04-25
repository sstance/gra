import Mock from 'mockjs'

import * as mUtils from '@/utils/mUtils'


let List = []
const count = 30
let typelist = [1, 2]

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    username: Mock.Random.cname(),
    address: Mock.mock('@county(true)'),
    createTime: Mock.Random.now(),
    iden_num: Mock.Random.integer(2, 7),
    cor_num: Mock.Random.integer(0, 5), 
    'gender|1': typelist
  }))
}

export default {
  /**
   * 获取列表
   */
  getdataList: config => {
    const { name, page = 1, limit = 20 } = mUtils.param2Obj(config.url)
    const mockList = List.filter(user => {
      if (name && user.username.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        total: mockList.length,
        moneyList: pageList
      }
    }
  },
  /**
   * 增加用户信息
   */
  createdata: config => {
    const { username, address, iden_num, cor_num , gender,tableAddress } = mUtils.param2Obj(config.url)
    List.unshift({
      id: Mock.Random.guid(),
      username: username,
      address: address,
      tableAddress:tableAddress,
      createTime: Mock.Random.now(),
      iden_num: iden_num,
      cor_num: cor_num,
      gender: gender
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   */
  deletedata: config => {
    const { id } = mUtils.param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 200,
        data: {
          message: '删除成功'
        }
      }
    }
  },
  /**
   * 批量删除
   */
  batchremovedata: config => {
    console.log(config);
    // console.log(mUtils.param2Obj(config.url));
    let { ids } = mUtils.param2Obj(config.url)
    console.log(ids);
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 200,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改用户
   */
  updatedata: config => {
    const { id,username, address, iden_num, cor_num ,gender } = mUtils.param2Obj(config.url)
    List.some(u => {
      if (u.id === id) {
        u.username = username
        u.address = address
        u.iden_num = iden_num
        u.cor_num = cor_num
        u.gender = gender
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }
}