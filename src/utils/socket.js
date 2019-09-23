

/**
 *  对websocket相关功能进行封装
 */

import { Toast } from 'antd-mobile';
import { getToken } from 'utils/auth'
import storage from './storage.js'


var utils = {
  //  处理公司节点数据
  handleCompanyNode: function(data){
    storage.setItem('companyNode', data);
    let page = plus.webview.getWebviewById('home');
    socket.mui.$fire(page, 'socket', data);
  },
  //  处理收敛器节点数据
  handleCmNode: function(data){
    let localData = storage.getItem('cmNode');
    localData = localData?localData:{};
    localData[data.batteryGroupNumber] = data;
    storage.setItem('cmNode', localData);
  },
  //  处理电池组节点数据
  handleBtgNode: function(data){
    let localData = storage.getItem('btgNode');
    localData = localData?localData:{};
    localData[data.batteryGroupNumber] = data;
    storage.setItem('btgNode', localData);
  },
  //  处理告警信息列表数据
  handleRealtimeAlarmData: function(data){
    let localData = storage.getItem('realtimeAlarmData');
    localData = localData?localData:[];
    storage.setItem('realtimeAlarmData', [...data, ...localData]);
  },
  // 处理文件下载
  handleDownload: function(data){

  }
}


var socket = {
  failCount: 0,   // 重连失败次数
  socket: null,
  utils: null,
  url:process.env.REACT_APP_SOCKET_URL,
  silent: false,
  typeList: [],
  log: function(...rest){
    if(!this.silent){
      console.log.apply(null, [...rest])
    }
  },
  init: function (utils) {
    let socketUrl = this.url;
    let token = getToken()?getToken():'4c22ad729ad176a1a82de2840f538eef';
    // 设置socket数据默认值
    this.setDefaultValue()
    this.utils = utils;
    this.socket = new WebSocket(socketUrl+token);
    this.socket.onopen = this.onopen.bind(this);
    this.socket.onmessage = this.onmessage.bind(this);
    this.socket.onerror = this.onerror.bind(this);
    this.socket.onclose = this.onclose.bind(this);
  },
  close: function(){
    this.socket.close('4001');
  },
  onopen: function () {
    this.log('%c --------------------websocket连接成功--------------------', 'color:#40a9ff')
    this.socket.send('连上了,哈哈哈哈')
    this.failCount = 0;
  },
  onmessage: function (event) {
    try{  
      let data = JSON.parse(event.data);
      let type = data.type;
      let info = data.data;
      if(this.typeList.indexOf(type) == -1){
        this.log('----------socket消息----------', data);
        this.typeList.push(type)
      }
      switch(type){
        case 'companyNode':
          return this.utils.handleCompanyNode(info);
        case 'cmNode':
          return this.utils.handleCmNode(info);
        case 'btgNode':
          return this.utils.handleBtgNode(info);
        case 'realtimeAlarmData':
          return this.utils.handleRealtimeAlarmData(info);
      }
    }catch(error){
      console.log('error', error)
    }
  },
  onclose:function (event) {
    let code = event.code;
    if(code !== 4001){
      this.reConnect.bind(this)();
    }
  },
  onerror: function (error) {
    this.log('--------------------websocket报错----------------------', error)
  },
  reConnect() {
    if(this.failCount<2){
      this.log(`%c ---------websocket连接异常,正在尝试第${this.failCount+1}次重新连接---------`, 'color:#40a9ff')
      setTimeout(this.init.bind(this), 10000);
      this.failCount++;
    } else {
      Toast.fail(`websocket连接异常!`)
    }
  },
  setDefaultValue(){
    storage.setItem('companyNode', {});
    storage.setItem('cmNode', {});
    storage.setItem('btgNode', {});
    storage.setItem('realtimeAlarmData', []);
  }
};

// console.log('process.env.socketUrl', process.env.socketUrl)

export default socket;