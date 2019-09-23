/**
 * 用户类型(1 系统工程师，2 高级管理员，3 普通管理员，)
 */
export function userTypeFormatter(val){
	const map = {
		1: '系统工程师',
		2: '高级管理员',
		3: '普通管理员'
	}
	return map[val]? map[val]: val 
}

/**
 * 电池当前所处的状态(1 正常，2 告警，3 故障，4 充电，5 放电)
 */

export function statusTypeFormatter(val){
	const map = {
		1: '正常',
		2: '告警',
		3: '故障',
		4: '充电',
		5: '放电'
	}
	return map[val]? map[val]: val 
}
/**
 * 告警类型(0 单体电压过充；1 单体电压过放；2 单体内阻过高；3 单体内阻过低)
 */
export function alarmTypeFormatter(val){
	const map = {
		0: '单体电压过充',
		1: '单体电压过放',
		2: '单体内阻过高',
		3: '单体内阻过低'
	}
	return map[val]? map[val]: val 
}

/**
 * 告警级别(如：1 一级，2 二级，3 三级，4 四级)
 */
export function alarmLevelFormatter(val){
	const map = {
		1: '一级告警',
		2: '二级告警',
		3: '三级告警',
		4: '四级告警',
	}
	return map[val]? map[val]: val 
}

/**
 * 设备类型(如：1 收敛器；2 电池组；3：电池)
 */
export function deviceTypeFormatter(val){
	const map = {
		1: '收敛器',
		2: '电池组',
		3: '电池',
	}
	return map[val]? map[val]: val 
}

/**
 * 告警状态 (0:无；1:持续中；2：已恢复)
 */
export function alarmStatusFormatter(val){
	const map = {
		0: '无',
		1: '持续中',
		2: '已恢复',
	}
	return map[val]? map[val]: val 
}

/**
 * 确认状态 (0:无；1:未确认；2：已确认 )
 */
export function comfirmStatusFormatter(val){
	const map = {
		0: '无',
		1: '未确认',
		2: '已确认',
	}
	return map[val]? map[val]: val 
}