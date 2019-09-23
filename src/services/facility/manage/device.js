import request from 'utils/request';


/**
 * 获取统计总数信息
 */
export function getAllDevicesTotalAmount() {
  // console.log(data)
  return request({
    url:`/device/getAllDevicesTotalAmount`
  })
}
/**
 * 查询分页列表
 */
export function findPagesData(data) {
  // console.log(data)
  const deviceType = data.deviceType?data.deviceType: '';
  const pageNo = data.pageNo?data.pageNo: '';
  const size = data.size?data.size: '';
  const controlModuleNumber = data.controlModuleNumber?data.controlModuleNumber: '';
  const batteryGroupNumber = data.batteryGroupNumber?data.batteryGroupNumber: '';
  const manufacturer = data.manufacturer?data.manufacturer: '';
  const batchNumber = data.batchNumber?data.batchNumber: '';
      
  return request({
    url:`/device/findPages`,
    method: 'post',
    data: {   
      deviceType,
      pageNo,
      size,
      controlModuleNumber,
      batteryGroupNumber,
      manufacturer,
      batchNumber
    }
  }) 
}
/**
 * 获取统计信息列表
 */
export function getCMDeviceData() {
  // console.log(data)
  return request({
    url:`/controlModule/getAllControlModules`
  })
}

/**
 * 添加收敛器设备
 */
export function addCMDevice(data) {
    // console.log(data)
    const addressList = JSON.stringify(data.data.addressList)
    return request({
      url: `/controlModule/addControlModule`,
      method: 'post',
      data: {    
        controlModuleName: data.data.deviceName,
        ipAddress:data.data.ip,
        port: data.data.port,
        addressList: addressList,
        detailLocation:data.data.detailAdress,
        kernelVersionNumber: data.data.version
      }
    }) 
}

/**
 * 异步校验收敛器参数
 */
export function checkCMDeviceParams(data) {
  const controlModuleName = data.name?data.name: ''
  const ipAddress = data.ip?data.ip: ''
  return request({
    url:`/controlModule/checkControlModuleParameter`,
    method: 'post',
    data: {    
      controlModuleName,
      ipAddress
    }
  }) 
}


/**
 * 根据收敛器ID,获取收敛器详情
 */
export function getCMDeviceDetailData(data) {
  console.log(data)
  const controlModuleNumber = data.data? data.data : ''
  return request({
    url: `/controlModule/findControlModuleByNumber`,
    data: {
      controlModuleNumber
    }
  })
}


/**
 * 编辑收敛器
 */
export function editCMDeviceData(data) {
  const addressList = JSON.stringify(data.data.addressList)
  return request({
      url: `/controlModule/editControlModule`,
      method: 'post',
      data: {
        controlModuleNumber: data.data.cmNumber,
        controlModuleName: data.data.deviceName,
        ipAddress:data.data.ip,
        port: data.data.port,
        addressList: addressList,
        detailLocation:data.data.detailAdress,
        kernelVersionNumber: data.data.version
      }
  }) 
}

/**
 * 编辑电池组
 */
export function editBTGDeviceData(data) {
  // console.log(data)
  return request({
      url: `/batteryGroup/editBatteryGroup`,
      method: 'post',
      data: {
        batteryGroupNumber: data.data.batteryGroupNumber,
        batteryGroupName: data.data.batteryGroupName,
        groupInitialCapacity:data.data.groupInitialCapacity,
      }
  }) 
}
/**
 * 添加电池组
 */
export function addBatteryGroup(data) {
  return request({
      url: `/batteryGroup/addBatteryGroup`,
      method: 'post',
      data: {    
        controlModuleNumber: data.controlModuleNumber,
        groupInitialCapacity: data.groupInitialCapacity,
        batteryGroupAmount: data.batteryGroupAmount,
      }
  }) 
}

/**
 * 获取收敛器下拉列表
 */
export function getCMDeviceSelect() {
  return request({
    url:`/controlModule/getAllControlModulesForSelect`
  })
}

/**
 * 根据收敛器ID,获取电池组下拉
 */
export function getBTGDeviceSelect(data) {
  console.log(data)
  // const controlModuleNumber = data.data? data.data : ''
  return request({
    url: `/batteryGroup/getAllBatteryGroupsForSelect`,
    data: {
      controlModuleNumber: data
    }
  })
}

/**
 * 根据电池组ID,获取电池组详情
 */
export function getBTGDetailData(data) {
  // console.log(data)
  const batteryGroupNumber = data.data? data.data : ''
  return request({
    url: `/batteryGroup/findBatteryGroupByNumber`,
    data: {
      batteryGroupNumber
    }
  })
}


/**
 * 根据电池ID,获取电池详情
 */
export function findBatteryByNumber(data) {
  const batteryNumber = data.data? data.data : ''
  return request({
    url: `/battery/findBatteryByNumber`,
    data: {
      batteryNumber
    }
  })
}

/**
 * 异步校验电池组名称参数
 */
export function checkBTGNameParams(data) {
  const batteryGroupNumber = data.batteryGroupNumber?data.batteryGroupNumber: ''
  const batteryGroupName = data.batteryGroupName?data.batteryGroupName: ''
  return request({
    url:`/batteryGroup/checkBatteryGroupParameter`,
    method: 'post',
    data: {    
      batteryGroupNumber,
      batteryGroupName
    }
  }) 
}
/**
 * 添加电池
 */
export function addBattery(data) {
  console.log(data)
  const { controlModuleNumber,batteryGroupNumber,ratedCapacity,ratedVoltage,ratedResistance,manufacturer,batchNumber,maintenanceEffectiveDate,batteryAmount} = data
  return request({
    url: `/battery/addBattery`,
    method: 'post',
    data: {    
      controlModuleNumber,
      batteryGroupNumber,
      ratedCapacity,
      ratedVoltage,
      ratedResistance,
      manufacturer,
      batchNumber,
      maintenanceEffectiveDate,
      batteryAmount,
    }
  }) 
}

/**
 * 获取所有电池
 */
export function getAllBatterys() {
  return request({
    url:`/battery/getAllBatterys`
  })
}

/**
 * 异步校验单体电池名称参数
 */
export function checkBatteryParameter(data) {
  const batteryNumber = data.batteryNumber?data.batteryNumber: ''
  const batteryName = data.batteryName?data.batteryName: ''
  return request({
    url:`/battery/checkBatteryParameter`,
    method: 'post',
    data: {    
      batteryNumber,
      batteryName
    }
  }) 
}
/**
 * 编辑电池
 */
export function editBattery(data) {
  // console.log(data)
  return request({
      url: `/battery/editBattery`,
      method: 'post',
      data: {
        batteryNumber: data.data.batteryNumber,
        batteryName: data.data.batteryName,
        ratedCapacity: data.data.ratedCapacity,
        ratedVoltage: data.data.ratedVoltage,
        ratedResistance: data.data.ratedResistance,
        manufacturer: data.data.manufacturer,
        batchNumber: data.data.batchNumber,
        maintenanceEffectiveDate: data.data.maintenanceEffectiveDate
      }
  }) 
}

