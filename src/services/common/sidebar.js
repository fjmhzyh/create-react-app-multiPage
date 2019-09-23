import request from 'utils/request';


/**
 * 获取左侧树形列表
 */
export function fetchTreeList(data) {
  return request({
    url:`/device/getAllDevices`,
  }) 
}
