import request from 'utils/request';


/**
 * 获取概要统计信息
 */
export function getAlarmDetail(data) {
  
  return request({
    url:`/deviceAlarm/findAlarmCMPage`,
    data
  }) 
}