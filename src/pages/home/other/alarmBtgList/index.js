import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { List } from 'antd-mobile';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { getAlarmBtgList } from 'services/home/home';

mui.plusReady(function(){
  var self = plus.webview.currentWebview();
});

class AlarmBtgList extends Component {

  constructor(props){
    super(props);
    this.state={
      list: []
    }
  } 

  columnBTG = [
    {
      key: '1',
      title: '序号',
      render:(text,record,index)=>1,
      align: 'left',
      width: 60
    },
    {
      title: '电池组编号',
      dataIndex: 'batteryGroupNumber',
      align: 'left',
      width: 180
    },
    {
      title: '告警数量',
      dataIndex: 'alarmCount',
      align: 'left',
      width: 130,
      render: (text,item) =>{
        return <div className="detail" onClick={() => {this.handleLinkDetail(item)}}>{text}</div>
      }
    },    
    {
      title: '所属收敛器',
      dataIndex: 'controlModuleNumber',
      align: 'left',
      width: 180
    },
    {
      title: '位置信息',
      dataIndex: 'detailLocation',
      align: 'left',
      width: 130
    },  
    {
      title: '备注',
      dataIndex: 'notes',
      align: 'left'
    },
  ]

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
    getAlarmBtgList(data).then(res=>{
      if(res.success){
        console.log('查询结果', res)
        me.setState({
          list: res.data.alarmBTGList
        })
      } else {
        Toast.info('获取告警收敛器列表失败!')
      }
    }, (err)=>{
      console.log('获取告警收敛器列表失败', err) 
    })
  }

  handleLinkDetail = (item)=>{
    mui.openWindow({
      url: '../alarmBtgDetail/alarmBtgDetail.html', 
      id:'alarmBtgDetail',
      extras:{
        batteryGroupNumber: item.batteryGroupNumber,
        detailLocation: item.detailLocation
      }
    });
  }

  render() {
    let columns = this.columnBTG;
    let list = this.state.list;
    return (
      <div className="App">
        <header className="mui-bar mui-bar-nav">  
          <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
          <h1 className="mui-title">告警电池组列表</h1>  
        </header> 
        <div className="mui-content">
          <Table columns={columns} dataSource={list} rowKey = {record=>record.batteryGroupNumber} 
                 scroll={{ x: 800, y:window.innerHeight }} pagination={false} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<AlarmBtgList />, document.getElementById('root'));