import request from 'utils/request';


/**
 * 获取告警详细信息
 */
export function getAlarmDetail(data) {
  // console.log('getAlarmDetail', data)
  return request({
    // url:`/api/getAlarmDetail`,
    url: '/deviceAlarm/getDeviceAlarmDetails',
    data
  }) 
}

