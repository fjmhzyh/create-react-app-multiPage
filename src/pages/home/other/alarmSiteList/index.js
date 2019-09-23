import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { List, Toast } from 'antd-mobile';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { getAlarmCmList } from 'services/home/home';

mui.plusReady(function(){
  var self = plus.webview.currentWebview();
});


class AlarmSiteList extends Component {

  constructor(props){
    super(props);
    this.state={
      list: []
    }
  } 

  componentDidMount(){
    this.fetchData();
  }
  
  // 接口查询告警收敛器列表
  fetchData = ()=>{
    let me = this;
    // let currentNode = storage.getItem('currentNode').key;
    let data = {
      pageNo: 1,
      size: 20
    } 
    getAlarmCmList(data).then(res=>{
      if(res.success){
        console.log('告警收敛器列表', res)
        me.setState({
          list: res.data.alarmCMList
        })
      } else {
        Toast.info('获取告警收敛器列表失败!')
      }
    }, (err)=>{
      console.log('获取告警收敛器列表失败', err) 
    })
  } 

  columns = [
    // {
    //   key: '1',
    //   title: '序号',
    //   render:(text,record,index)=>1,
    //   align: 'center',
    // },
    {
      title: '站点名称',
      dataIndex: 'controlModuleName',
      align: 'left',
      width: 160,
      fixed: 'left',
    },
    {
      title: '设备编号',
      dataIndex: 'controlModuleNumber',
      align: 'left',
      width: 160,
    },
    {
      title: '站点位置',
      dataIndex: 'location',
      align: 'left',
      width: 200,
    },
    {
      title: '告警数量',
      dataIndex: 'alarmCount',
      align: 'left',
      width: 120,
      render: (text,item) =>{
        return <span className="detail" onClick={() => {this.handleLinkDetail(item)}}>{text}</span>
      }
    },
    {
      title: '备注',
      dataIndex: 'notes',
      align: 'left'
    },
  ];

  handleLinkDetail = (item)=>{
    mui.openWindow({
      url: '../alarmSiteDetail/alarmSiteDetail.html', 
      id:'alarmSiteDetail',
      extras:{
        controlModuleNumber: item.controlModuleNumber
      }
    });
  }

  render() {
    let columns = this.columns;
    let list = this.state.list;
    return (
      <div className="App">
        <header className="mui-bar mui-bar-nav">  
          <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
          <h1 className="mui-title">告警站点列表</h1>  
        </header> 
        <div className="mui-content">
          <Table columns={columns} dataSource={list} rowKey = {record=>record.controlModuleNumber} 
                 scroll={{ x: 800, y:window.innerHeight }} pagination={false} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<AlarmSiteList />, document.getElementById('root'));