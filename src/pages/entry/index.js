import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import { fetchTreeList } from 'services/common/sidebar';
import storage from 'utils/storage';
import socket from 'utils/socket';


let  self = null;
let active = 0;
// let subpages = [] //['../home/cm/cm.html', '../login/login.html'];
let styles = {
  top: '51px', //设置距离顶部的距离
  bottom: '51px', //设置距离底部的距离
}

 
let utils = {
  //  处理公司节点数据
  handleCompanyNode: function(data){
    console.log('companyNode', data)
    storage.setItem('companyNode', data);
    let page = plus.webview.getWebviewById('home');
    mui.fire(page, 'socket');
  },
  //  处理收敛器节点数据
  handleCmNode: function(data){
    let page = plus.webview.getWebviewById('home1');
    storage.setItem('cmNode', data);
    mui.fire(page, 'socket');
  },
  //  处理电池组节点数据
  handleBtgNode: function(data){
    let page = plus.webview.getWebviewById('home2');
    let localData = storage.getItem('btgNode');
    localData = localData?localData:{};
    localData[data.batteryGroupNumber] = data;
    storage.setItem('btgNode', localData);
    mui.fire(page, 'socket');
    // plus.nativeUI.toast('收到电池组数据')
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


mui.plusReady(function (argument) {

  // 获取当前webview
  self = plus.webview.currentWebview();

  // 开启socket连接
  socket.init(utils)

	mui.init({
    subpages:[
      {
        url:'../home/home.html',
        id: 'home',
        styles:styles,
        extras:{}//额外扩展参数
      },
    ],
    // preloadPages:[
    //   {
    //     url: './search/search.html', 
    //     id:'nodeSearch'
    //   }
    // ],
    // 预加载窗口数量限制(一旦超出,先进先出)默认不限制
    // preloadLimit:5,
    // 处理窗口关闭前的业务, 没有参数
    beforeback: function(...rest) {
      console.log('beforeback', rest)
    },
  });
})




class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      prvActive: 'home',
      active: 'home',
      history: [],
      node: '',
      type: '公司',
    }

    // 重写安卓返回按钮逻辑
    let me = this;
    let oldBack = mui.back;
    let count = 0;
    mui.back = function(){  
      console.log('this', me.state)
      let history = me.state.history;
      if(history.length>0){  
        let prevPage = history.pop();  
        let currentPage = me.state.active;

        // 如果是首页, 执行原生返回逻辑
        if(currentPage == 'home'){
          count++;
          if(count == 2){
            count = 0
            // return oldBack();
            // 退出APP前清空缓存
            storage.clear()
            return plus.runtime.quit();
          } else {
            mui.toast('再按一次退出应用');
            setTimeout(function(){ count=0 }, 2000);
          }
          return 
        }

        // 先隐藏当前的  
        plus.webview.hide(currentPage);  
        //再显示历史页面  
        plus.webview.show(prevPage);  
        //更改当前活跃的选项卡  
        me.setState({
          history: history,
          prvActive: currentPage,
          active: prevPage,
        }) 
      }else{  
        count++;
        if(count == 2){
          count = 0
          // return oldBack();
          // 退出APP前清空缓存
          storage.clear()
          return plus.runtime.quit();
        } else {
          mui.toast('再按一次退出应用');
          setTimeout(function(){ count=0 }, 2000);
        }
      }  
    } 
  }

  tabs = [
    {
      text: '首页',
      id: 'home',
      className: 'mui-icon mui-icon-home',
    },
    {
      text: '数据统计',
      id: 'statistic',
      className: 'mui-icon mui-icon-paperplane',
    },
    {
      text: '数据检索',
      id: 'search',
      className: 'mui-icon mui-icon-search',
    },
    {
      text: '设备维护',
      id: 'mantain',
      className: 'mui-icon mui-icon-flag',
    },
    {
      text: '设置',
      id: 'system',
      className: 'mui-icon mui-icon-gear',
    },
  ]

  routerConfig = {
    'home': {
      '0': '../home/home.html',
      '1': '../home/cm/cm.html',
      '2': '../home/btg/btg.html',
    }
  }

  componentWillUnmount(){
    socket.close()
  }

  componentDidMount() {
    // 获取tree节点数据,存储到localStorage
    window.addEventListener('loginSuccess', this.loginSuccess.bind(this));
    // 监听节点切换事件
    window.addEventListener('nodeClick', this.handleNodeClick.bind(this));
  }

  loginSuccess = ()=>{
    // 关闭登录页
    let loginPage = plus.webview.getLaunchWebview();
    loginPage.close()
    // 获取数据
    this.fetchData()
  }

  handleNodeClick = (event)=>{
    console.log('监听到nodeClick', event.detail)
    let data = event.detail;
    this.setState({
      node: data.title,
      type: this.typeFormatter(data.type)
    })
    this.changePage(data)
  }

  // 页面切换
  changePage = (data)=>{
    let active = this.state.active;
    let type = data.type;
    let url = this.routerConfig[active][type];
    let pageId = `${active}${type}`;
    if(type == '0'){
      pageId = `${active}`;
    }
    let targetPage = plus.webview.getWebviewById(pageId);
    if(targetPage){
      targetPage.show()
      mui.fire(targetPage, 'socket')
      mui.fire(targetPage, 'changePage')
    } else { 
      let page = mui.preload({
        url:url,
        id:pageId,
        styles:styles
      });
      self.append(page);
      mui.fire(targetPage, 'socket')
      mui.fire(page, 'changePage')
    }
  }


  // 节点名称转换
  typeFormatter = (type)=>{
    let map = {
      '0': '公司',
      '1': '收敛器',
      '2': '电池组',
      '3': '电池'
    }
    return map[type]?map[type]: 'type'    
  }


  fetchData = ()=>{
    fetchTreeList().then(res=>{
      if(res.success){
        let data = res.data
        console.log('treeNode', data)
        storage.setItem('treeNode',data)
        this.setState({
          node: data.title
        })
      } else {
        plus.nativeUI.toast('获取树节点信息失败!')
      }
    }, (err)=>{
      console.log('获取树节点信息失败', err)
    })
  }

  // 处理treeNode数据
  handleTreeNode = (treeNode)=>{
    let data = [{title:treeNode.title, key:treeNode.key}];
    let children = treeNode.children;
  }


  // tab页点击处理
  handleTabClick = (tab)=>{
    let id = tab.id;
    let currentPage = this.state.active;
    let history = [...this.state.history, currentPage]
    plus.webview.hide(currentPage);
    plus.webview.show(id);
    this.setState({
      prvActive: currentPage,
      active: id,
      history: history
    })
    storage.setItem('currentMenu',id);
  }

  // 前往搜索页
  goSearch = ()=>{
    mui.openWindow({
      url: './search/search.html', 
      id:'nodeSearch'
    });
  }

  render() {
    let active = this.state.active;
    let goSearch = this.goSearch;
    let node = this.state.node;
    let type = this.state.type;
    return (
      <div className="App">
        <div className="admin-header">
          <div className='header-left'>
            <span className='node-tag'>{type}</span>
            <span className='node-title'>{node}</span>
          </div>
          <div className='header-right mui-icon mui-icon-search' onClick={goSearch}>
          </div>
        </div>
  			<nav className="mui-bar mui-bar-tab">
          {
            this.tabs.map(item=>{
              return (
                <a className={active==item.id?'mui-tab-item mui-active':'mui-tab-item'} key={item.id} onClick={this.handleTabClick.bind(this,item)} >
                  <span className={item.className} ></span>
                  <span className="mui-tab-label">{item.text}</span>
                </a>
              )
            })
          }
  			</nav>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));





