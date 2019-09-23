import 'whatwg-fetch'
import { getToken } from 'utils/auth'
// import { message } from 'antd'
import transFormData from 'utils/objectToFormData';
import qs from 'qs'


const baseUrl = process.env.REACT_APP_BASE_URL;
// console.log(baseUrl)
function checkStatus(response) {

  if (response.status >= 200 && response.status < 300) {

    // 对 {success: false} 进行统一处理
    response.clone().json().then(data => {
      if(!data.success){
        // message.error(data.msg)
      }
    })

    return response;    
  }
  
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(options) {

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = getToken();
  let url = '';
  let method = options.method?options.method: 'GET';
  let body = null;

  // console.log('options', options)
  // console.log('method',method)

  if(method.toLowerCase() == 'post'){
    url = `${baseUrl}${options.url}`;
    body = transFormData(options.data);
  } else {
    url = `${baseUrl}${options.url}?${qs.stringify(options.data)}`;
  }

  if(options.url.slice(0,4) == '/api'){
    url = `${options.url}?${qs.stringify(options.data)}`;
  }

  console.log('url----------------------', url)
  console.log('token----------------------', token)

  var response = await fetch(url, {
    mode: 'cors',
    method: method,
    headers: {'token': token},
    body
  });
  
  checkStatus(response);

  return await response.json();
}
