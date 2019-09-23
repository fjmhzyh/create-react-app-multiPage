import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Tabs, List } from 'antd-mobile';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import TrendChart from './TrendChart'

const Item = List.Item;


mui.plusReady(function(){
  var self = plus.webview.currentWebview();
});


const columns = [
  {
    title: '序号',
    width: 65,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    align: 'center',
  },
  { title: '所属收敛器', dataIndex: 'controlModuleNumber', key: '1', align: 'center' },
  { title: '所属电池组', dataIndex: 'batteryGroupNumber', key: '2', align: 'center' },
  { title: '设备编号', dataIndex: 'deviceNumber', key: '3', align: 'center' },
  { title: '设备类型', dataIndex: 'deviceType', key: '4', align: 'center' },
  { title: '设备状态', dataIndex: 'deviceStatus', key: '5', align: 'center' },
  { title: '告警等级', dataIndex: 'alarmLevel', key: '6', align: 'center' },
  { title: '告警参数', dataIndex: 'alarmParameter', key: '7', align: 'center' },
  { title: '参数值', dataIndex: 'alarmValue', key: '8', align: 'center' },
  { title: '上报时间', dataIndex: 'reportTime', key: '9', align: 'center' },
  {
    title: 'Action',
    key: 'operation',
    align: 'center',
    render: () => <a>action</a>,
  },
];
const data = [
  {
    key: '1',
    name: '1',
    controlModuleNumber: 'CM001',
    batteryGroupNumber: 'btg001',
    deviceNumber: 'a001',
    deviceType: '电池组',
    deviceStatus: '告警',
    alarmLevel: '三级',
    alarmParameter: '单体电压',
    alarmValue: '12',
    reportTime: '2019-09-12',
  },
  {
    key: '2',
    name: '2',
    controlModuleNumber: 'CM002',
    batteryGroupNumber: 'btg002',
    deviceNumber: 'a002',
    deviceType: '电池',
    deviceStatus: '告警',
    alarmLevel: '二级',
    alarmParameter: '单体温度',
    alarmValue: '100',
    reportTime: '2019-09-11',
  }
];
  
class BtgList extends Component {

  tabs = [
    {title: '信息列表'},
    {title: '趋势图'}  
  ] 

  render() { 
    return (
      <div className="App">
        <Tabs tabs={this.tabs} initialPage={0} swipeable={false} >
          <div style={{padding:'10px',background: '#fff'}}>
            <Table columns={columns} dataSource={data} scroll={{ x: 1300, y:window.innerHeight }} pagination={false} />
          </div>
          <div style={{padding:'10px',background: '#fff'}}>
            <TrendChart title="组压电流"/>
            <TrendChart title="SOC"/>
            <TrendChart title="SOH"/>
            <TrendChart title="环境温度"/>
          </div>
        </Tabs>
      </div>
    );
  }
}

ReactDOM.render(<BtgList />, document.getElementById('root'));



//            <List className="my-list">
//               <Item arrow="horizontal" multipleLine 
//                     onClick={this.checkList} platform="android" >单体信息列表</Item>
//            </List>