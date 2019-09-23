import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { List } from 'antd-mobile';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { getAlarmByBtgNumber } from 'services/home/home';
import { statusTypeFormatter, deviceTypeFormatter, alarmLevelFormatter } from 'utils/dataFormatter'
import moment from 'moment'

const Item = List.Item;

let id = null;
mui.plusReady(function(){
  var self = plus.webview.currentWebview();
  id = self.id
});



class AlarmBtgDetail extends Component {

  constructor(props){
    super(props);
    this.state={
      batteryGroupNumber: '',
      alarmList:[],
      colorLevel: ["#f00","#E6A23C","#5BC726","#1890FF"]
    }
  } 

  componentDidMount(){
    console.log('componentDidMount')
    mui.plusReady(this.plusReady);
  }

  plusReady = ()=>{
    let self = plus.webview.currentWebview();
    let id = self.batteryGroupNumber;
    console.log('plusReady', self)
    this.fetchData(id);
  }
  
  // 接口查询告警收敛器列表
  fetchData = (id)=>{
    let me = this;
    let data = {
      pageNo: 1,
      size: 20,
      batteryGroupNumber: id 
    } 
    getAlarmByBtgNumber(data).then(res=>{
      if(res.success){
        console.log('查询结果', res)
        me.setState({
          batteryGroupNumber: id,
          alarmList: res.data.alarmList
        })
      } else {
        Toast.info(res.msg)
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
      key: '1',
      title: '序号',
      render:(text,record,index)=>`${(index+1)}`,
      align: 'center',
      width: 60,
      fixed: 'left'
    },
    {
      title: '告警编号',
      dataIndex: 'alarmNumber',
      align: 'left',
      width: 220,
      render: (text,item) => (
        <div className="detail" onClick={() => {this.handleLinkDetail(item)}}>{text? text: '-'}</div>  
      )
    },
    // {
    //   title: '告警设备编号',
    //   dataIndex: 'deviceNumber',
    //   align: 'center',
    //   width: 210,
    //   render: (text,item) =>{
    //     return text? text: '-'
    //   }
    // },
    // {
    //   title: '告警设备类型',
    //   dataIndex: 'deviceType',
    //   align: 'center',
    //   render: val => <span>{deviceTypeFormatter(val)}</span>
    // },
    {
      title: '设备状态',
      dataIndex: 'deviceStatus',
      align: 'left',
      width: 110,
      render: val => <span>{statusTypeFormatter(val)}</span>
    },
    {
      title: '告警参数',
      dataIndex: 'alarmParameter',
      align: 'left',
      width: 160,
    },
    // {
    //   title: '参数值',
    //   dataIndex: 'Params',
    //   align: 'center',
    // },
    {
      title: '告警等级',
      dataIndex: 'alarmLevel',
      align: 'left',
      width: 120,
      render: val => <span style={{color:`${this.state.colorLevel[val-1]}`}}>{alarmLevelFormatter(val)}</span>
    },
    {
      title: '告警发生时间',
      dataIndex: 'startTime',
      align: 'left',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
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
    let list = this.state.alarmList;
    let batteryGroupNumber = this.state.batteryGroupNumber;
    return (
      <div className="App">
        <header className="mui-bar mui-bar-nav">  
          <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
          <h1 className="mui-title">告警电池组详情页</h1>  
        </header> 
        <div className="mui-content">
          <List className="my-list" renderHeader={() => '电池组编号'} >
            <Item key='1'>{batteryGroupNumber}</Item>
          </List>
          <List className="my-list" renderHeader={() => '告警列表'} >
          </List>
          <Table columns={columns} dataSource={list} rowKey = {record=>record.alarmNumber} 
                 scroll={{ x: 860, y:window.innerHeight }} pagination={false} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<AlarmBtgDetail />, document.getElementById('root'));