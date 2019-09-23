import request from 'utils/request';


/**
 * 获取省列表
 */
export function getAllProvinces(data) {
  return request({
    url:`/addressLocation/getAllProvinces`,
    method: 'post',
    data
  }) 
}

/**
 * 根据省id,查询城市列表
 */
export function getCity(data) {
  return request({
    url:`/addressLocation/getAllCitiesByProvinceId`,
    method: 'post',
    data: {
      provinceId:data.provinceId
    }
  }) 
}

/**
 * 根据市id,查询区列表
 */
export function getArea(data) {
  return request({
    url: '/addressLocation/getAllCountiesByCityId',
    data: {
      cityId:data.cityId
    }
  })
}

/**
 * 根据区id,查询街道列表
 */
export function getCountry(data) {
  return request({
    url: `/addressLocation/getAllTownsByCountyId`,
    method: 'post',
    data
  }) 
}
