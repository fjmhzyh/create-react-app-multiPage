import React, { Component } from 'react';
import './index.scss';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { statusTypeFormatter, deviceTypeFormatter, alarmLevelFormatter } from 'utils/dataFormatter'

class AlarmTable extends Component {

  state = {
    colorLevel: ["#f00","#E6A23C","#5BC726","#1890FF"]
  }

  columns = [
    {
      title: '序号',
      key: 1,
      render:(text,record,index)=>`${index+1}`,
      align: 'center',
      width:60,
      fixed:'left',
      render: (text,item,index) => (
        <div className="table-link" onClick={() => {this.handleLinkDetail(item)}}>{index+1}</div>  
      )
    },
    {
      title: '所属收敛器',
      dataIndex: 'controlModuleNumber',
      align: 'center',
      width: 160,
      render: (text,item) =>{
        return text? text: '-'
      }
    },
    {
      title: '所属电池组',
      dataIndex: 'batteryGroupNumber',
      align: 'center',
      width: 160,
      render: (text,item) =>{
        return text? text: '-'
      }
    },
    {
      title: '设备编号',
      dataIndex: 'deviceNumber',
      align: 'center',
      width: 160,
      render: (text,item) =>{
        return text? text: '-'
      }
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      align: 'center',
      width: 160,
      render: val => <span>{deviceTypeFormatter(val)}</span>
    },
    {
      title: '设备状态',
      dataIndex: 'deviceStatus',
      align: 'center',
      width: 160,
      render: val => <span style={{color:`${val>1?'#f00':'#1890ff'}`}}>{statusTypeFormatter(val)}</span>
    },
    {
      title: '告警等级',
      dataIndex: 'alarmLevel',
      align: 'center',
      width: 160,
      render: val => <span style={{color:`${this.state.colorLevel[val-1]}`}}>{alarmLevelFormatter(val)}</span>
    },
    {
      title: '告警参数',
      dataIndex: 'alarmParameter',
      align: 'center',
      width: 160,
    },
    {
      title: '参数值',
      dataIndex: 'alarmValue',
      align: 'center',
      width: 160,
      render: val => <span>{val+'V'}</span>
    },
    {
      title: '上报时间',
      dataIndex: 'reportTime',
      align: 'center',
      width: 160,
    },
    // {
    //   title: '操作',
    //   dataIndex: 'handler',
    //   align: 'center',
    //   render: (text,item) => (
    //     <div className="table-link" onClick={() => {this.handleLinkDetail(item)}}>查看详情</div>  
    //   )
    // },
  ];

  handleLinkDetail = (item)=>{
    console.log('item', item)
    let page = mui.preload({
      url: '../common/alarmDetail/alarmDetail.html', 
      id:'alarmDetail',
    });
    page.show()
    mui.fire(page, 'show', {
      alarmNumber: item.alarmNumber,
      deviceNumber:item.deviceNumber,
      deviceType:item.deviceType
    })

  }
  render() {
    let data = this.props.tableData?this.props.tableData:[];
    let columns = this.columns;
    return (  
      <Table columns={columns} dataSource={data} scroll={{ x: 1700 }} pagination={false} />
    );
  }
}

export default AlarmTable

