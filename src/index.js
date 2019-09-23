import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {  List } from 'antd-mobile';
import * as serviceWorker from 'assets/js/serviceWorker';

const Item = List.Item;

class App extends Component {

  data = [
    [ '接口地址', process.env.REACT_APP_BASE_URL ],
    [ 'socket地址', process.env.REACT_APP_SOCKET_URL ],
  ]

  pages = [
    [ '登录页', '/pages/login/login.html' ],
		[ '首页', '/pages/entry/entry.html' ],
		[ '首页公司节点', '/pages/home/home.html' ],
    [ '节点查询', '/pages/entry/search/search.html']
  ]

  localData = [
    ['treeNode', '树形节点信息'],
    ['currentMenu', '当前所在的菜单'],
    ['currentNode', '当前节点信息']
  ]

  inspectPage = 'chrome://inspect/#devices';

  render() {
    return (
      <div className="App">
        <List className="my-list" renderHeader={() => '后台地址'} >
          <Item extra={process.env.REACT_APP_BASE_URL} key='1'>接口地址</Item>
          <Item extra={process.env.REACT_APP_SOCKET_URL} key='2'>socket地址</Item>
        </List>

        <List className="my-list" renderHeader={() => '调试地址'}  style={{marginTop:'20px'}}>
          <Item extra={this.inspectPage} key='132424'>调试地址</Item>
        </List>

        <List className="my-list" renderHeader={() => 'localstorage'} style={{marginTop:'20px'}}>
          {
            this.localData.map(item=>{
              return (
                <Item extra={item[1]} key={item[1]} >{item[0]}</Item>
              )
            })
          }
        </List>

        <List className="my-list" renderHeader={() => '页面'} style={{marginTop:'20px'}}>
          {
            this.pages.map(item=>{
              return (
                <Item extra={<a href={item[1]}>点击前往</a>} key={item[1]} >{item[0]}</Item>
              )
            })
          }
        </List>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
