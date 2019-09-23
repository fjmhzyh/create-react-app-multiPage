import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import './index.scss';
import { List } from 'antd-mobile';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { statusTypeFormatter } from 'utils/dataFormatter'

mui.plusReady(function(){
  var self = plus.webview.currentWebview();
});


class BtList extends Component {

  constructor(props){
    super(props);
    this.state={
      loading: true,
      list: [],
      page: 0
    }
  } 

  componentDidMount(){
    // 监听socket推送
    window.addEventListener('showBtList',this.handleShowBtList);
  }

  componentWillUnmount(){
    window.removeEventListener('showBtList',this.handleShowBtList);
  }

  handleShowBtList = (event)=>{
    let list = event.detail;
    console.log('list', list)
    this.setState({
      data: list
    })
  }

  columns = [
    {
      key: 1,
      title: '序号',
      align: 'center',
      width: 80,
      fixed: 'left',
      render:(text,record,index)=>index+1,
    },
    {
      title: '电池编号',
      dataIndex: 'batteryNumber',
      align: 'left',
      width: 200,
    },
    {
      title: '电池状态',
      dataIndex: 'batteryStatus',
      align: 'center',
      width: 110,
      render: val => <span style={{color:`${val>1?'#f00':'#1890ff'}`}}>{statusTypeFormatter(val)}</span>
    },
    {
      title: '单体电压(V)',
      dataIndex: 'monomerVoltage',
      align: 'center',
      width: 120,
    },
    {
      title: '单体温度(℃)',
      dataIndex: 'monomerTemperature',
      align: 'center',
      width: 120,
    },
    {
      title: '单体内阻(Ω)',
      dataIndex: 'monomerResistance',
      align: 'center',
      width: 120,
    },
    // {
    //   title: '单体电流',
    //   dataIndex: 'remainingCapacity',
    //   align: 'center',
    //   render: val => <span>{val+'V'}</span>
    // },
    {
      title: '上报时间',
      dataIndex: 'reportTime',
      align: 'left',
    },
  ]

  render() {
    let list = this.state.data;
    let columns = this.columns;
    return (
      <div className="App">
        <header className="mui-bar mui-bar-nav">  
          <h1 className="mui-title">单体信息列表</h1>  
        </header> 
        <div className="mui-content">
          <Table columns={columns} dataSource={list}  rowKey = {record=>record.batteryNumber}
            scroll={{ x: 900, y:window.innerHeight }} pagination={false} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<BtList />, document.getElementById('root'));