import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { List, Toast } from 'antd-mobile';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { getAlarmByCmNumber } from 'services/home/home';
import { statusTypeFormatter, deviceTypeFormatter, alarmLevelFormatter } from 'utils/dataFormatter'
import moment from 'moment'

const Item = List.Item;


class AlarmSiteDetail extends Component {

  constructor(props){
    super(props);
    this.state={
      data: {
        alarmList:[
          // {
          //   "id":81,"alarmNumber":"20190919195847074400071","controlModuleNumber":"CM_01_3301_0015",
          //   "batteryGroupNumber":"BTG_0133010015_001","deviceType":3,"deviceNumber":"BT_0133010015001_0008",
          //   "deviceStatus":2,"startTime":1568889433000,"endTime":null,"alarmType":1,"alarmLevel":3,"alarmParameter":"1",
          //   "alarmValue":13850,"alarmStatus":1,"alarmConfirmStatus":1,"alarmConfirmer":""
          // }
        ]
      },
      colorLevel: ["#f00","#E6A23C","#5BC726","#1890FF"]
    }
  } 

  componentDidMount(){
    console.log('componentDidMount')
    mui.plusReady(this.plusReady);
  }

  plusReady = ()=>{
    let self = plus.webview.currentWebview();
    let id = self.controlModuleNumber;
    console.log('plusReady', self)
    this.fetchData(id);
  }
  
  // 接口查询告警收敛器列表
  fetchData = (id)=>{
    let me = this;
    let data = {
      pageNo: 1,
      size: 20,
      controlModuleNumber: id 
    } 
    getAlarmByCmNumber(data).then(res=>{
      if(res.success){
        console.log('告警列表', JSON.stringify(res.data.alarmList))
        me.setState({
          data: res.data
        })
      } else {
        Toast.info('获取告警列表失败!')
      }
    }, (err)=>{
      console.log('获取告警列表失败', err) 
    })
  } 

  handleLinkDetail = (item)=>{
    let page = mui.preload({
      url: '../../../common/alarmDetail/alarmDetail.html', 
      id:'alarmDetail',
    });
    page.show()
    mui.fire(page, 'show', {
      alarmNumber: item.alarmNumber,
      deviceNumber:item.deviceNumber,
      deviceType:item.deviceType
    })
  }

  columns = [
    {
      title: '告警编号',
      dataIndex: 'alarmNumber',
      className:'ellipsis',
      align: 'left',
      fixed: 'left',
      width:150,
      render: (text,item) => (
        <span className="detail" onClick={() => {this.handleLinkDetail(item)}}>{text}</span>  
      )
    },
    {
      title: '告警设备编号',
      dataIndex: 'deviceNumber',
      align: 'left',
      width: 180,
      render: (text,item) =>{
        return text? text: '-'
      }
    }, 
    {
      title: '告警设备类型',
      dataIndex: 'deviceType',
      align: 'left',
      width: 150,
      render: val => <span>{deviceTypeFormatter(val)}</span>
    },
    {
      title: '设备状态',
      dataIndex: 'alarmStatus',
      align: 'left',
      width: 130,
      render: val => <span>{statusTypeFormatter(val)}</span>
    },
    {
      title: '告警参数',
      dataIndex: 'alarmParameter',
      align: 'left',
      width: 130,
    },
    {
      title: '告警等级',
      dataIndex: 'alarmLevel',
      align: 'left',
      width: 130,
      render: val => <span style={{color:`${this.state.colorLevel[val-1]}`}}>{alarmLevelFormatter(val)}</span>
    },
    {
      title: '告警发生时间',
      dataIndex: 'startTime',
      align: 'left',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    // {
    //   title: '操作',
    //   dataIndex: 'handler',
    //   align: 'left',
    //   render: (text,item) => (
    //     <span>
    //     <span className="detail" onClick={() => {this.handleLinkDetail(item)}}>查看详情</span>  
    //     </span>
    //   )
    // },
  ];


  render() {
    let columns = this.columns;
    let data = this.state.data;
    let list = data.alarmList
    let location = data.regionLocation
    let name = data.controlModuleName
    return (
      <div className="App">
        <header className="mui-bar mui-bar-nav">  
          <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
          <h1 className="mui-title">告警站点详情页</h1>  
        </header> 
        <div className="mui-content">
          <List className="my-list" renderHeader={() => '站点名称'} >
            <Item key='1'>{name}</Item>
          </List>
          <List className="my-list" renderHeader={() => '站点位置'} >
            <Item key='2'>{location}</Item>
          </List>
          <List className="my-list" renderHeader={() => '告警列表'} >
          </List>
          <Table columns={columns} dataSource={list} rowKey = {record=>record.alarmNumber} 
                 scroll={{ x: 1100, y:window.innerHeight }} pagination={false} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<AlarmSiteDetail />, document.getElementById('root'));