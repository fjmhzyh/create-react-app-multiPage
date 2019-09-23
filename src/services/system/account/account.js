import request from 'utils/request';

/**
 * 登录接口
 */
export function login(data) {
  return request({
    url: '/adminUser/login',
    method: 'post',
    data: {loginName: 'huasu',loginPassword: 'huasu-2019'}
  }) 
}

/**
 * 登出接口
 */
export function logout() {
    return request({
      url: '/adminUser/loginOut'
    });
}

/**
 * 获取所有用户列表
 */
export function getAllUsers() {
    return request({
      url:'/adminUser/getAllAdminUsers'
    });
}


/**
 * 添加管理员用户
 */
export function addAdminUser(data) {
  console.log(data)
  return request({
    url:'/adminUser/addAdminUser',
    data
  });
}