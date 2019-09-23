import request from 'utils/request';


/**
 * 获取概要统计历史告警信息
 */
export function historyAlarm(data) {  
  return request({
    url:`/summaryStatistics/historyAlarm`,
    data
  }) 
}