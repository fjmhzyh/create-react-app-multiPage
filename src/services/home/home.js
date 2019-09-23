import request from 'utils/request';


/**
 * 获取告警站点列表
 */
export function getAlarmCmList(data) {
  
  return request({
    url:`/deviceAlarm/findAlarmCMPage`,
    data
  }) 
}


/**
 * 根据站点编号查询站点告警信息
 */
export function getAlarmByCmNumber(data) {
  console.log('getAlarmByCmNumber', data)
  return request({
    url:`/deviceAlarm/findPageByCMNumber`,
    data
  }) 
}

/**
 * 获取告警电池组列表
 */
export function getAlarmBtgList(data) {
  return request({
    url:`/deviceAlarm/findAlarmBTGPage`,
    data
  }) 
}


/**
 * 根据电池组编号查询电池组告警信息
 */
export function getAlarmByBtgNumber(data) {
  console.log('getAlarmByBtgNumber', data)
  return request({
    url:`/deviceAlarm/findPageByBTGNumber`,
    data
  }) 
}

/**
 * 获取告警电池列表
 */
export function getAlarmBtList(data) {
  return request({
    url:`/deviceAlarm/findAlarmBTPage`,
    data
  }) 
}


/**
 * 根据电池组编号查询电池告警信息
 */
export function getAlarmByBtNumber(data) {
  console.log('getAlarmByBtNumber', data)
  return request({
    url:`/deviceAlarm/findPageByBTNumber`,
    data
  }) 
}