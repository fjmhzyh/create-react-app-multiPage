import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './cm.scss';
import { Tabs, List, Toast } from 'antd-mobile';
import Donut from './../Donut'
import BarChart from './barChart'
import AlarmTable from './../AlarmTable'
import storage from 'utils/storage';
import { Result } from 'antd-mobile' 
import { getCMDeviceDetailData } from 'services/facility/manage/device';

const Item = List.Item;
class App extends Component {

  constructor(props){
    super(props);
    this.state={
      loading: true,
      basic: {},
      data: {},
      tableData: [],
      page: 0
    }
  } 

  componentDidMount(){
    // 接口查询收敛器数据
    this.fetchData();
    // 监听socket推送
    window.addEventListener('socket',this.handleSocket.bind(this));
    // 监听节点切换
    window.addEventListener('changePage',this.handlePageChange.bind(this));
  }

  // 处理节点切换
  handlePageChange = ()=>{
    this.setState({
      page: 0
    })
    this.fetchData()
  }

  // 接口查询收敛器数据
  fetchData = ()=>{
    let me = this;
    let currentNode = storage.getItem('currentNode').key;
    let data = {
      data: currentNode
    }
    getCMDeviceDetailData(data).then(res=>{
      if(res.success){
        console.log('收敛器详情', res)
        me.setState({
          basic: res.data
        })
      } else {
        Toast.info('获取收敛器详情失败!')
      }
    }, (err)=>{
      console.log('获取收敛器详情失败', err) 
    })
  } 

  // 处理socket消息
  handleSocket = (event)=> {
    // socket传送过来的是所有收敛器的数据, 根据收敛器id过滤出当前收敛器的数据
    let currentNode = storage.getItem('currentNode')['key'];
    let socketData =storage.getItem('cmNode');
    // plus.nativeUI.toast(JSON.stringify(socketData[currentNode]))
    let data = socketData[currentNode]?socketData[currentNode]:{};
    // plus.nativeUI.toast(JSON.stringify(data))
    console.log('currentNode', currentNode)
    console.log('最新数据', event.detail)

    // 本地存储的是所有的告警信息, 根据收敛器id过滤出当前收敛器的告警信息
    let list = storage.getItem('realtimeAlarmData')?storage.getItem('realtimeAlarmData'):[];
    list = list.filter(item=>item.controlModuleNumber==currentNode);
    let tableData = list.splice(0,5)

    if(data&&JSON.stringify(data) !== "{}"){
      this.setState({
        loading: false,
        data: data,
        tableData:tableData
      })
    }

  }

  handleChange = (index)=>{
    this.setState({
      page: index
    })
  }

  render() {
    let currentNode = storage.getItem('currentNode')['key'];
    let btgChart = this.state.data.btgChart
    let siteChart = this.state.data.siteChart
    let btgsRealTimeAlarmCount = this.state.data.btgsRealTimeAlarmCount
    let tableData = this.state.tableData
    let basic = this.state.basic
    let page =this.state.page
    let myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
    let content = '';
    if(this.state.loading){
      content = (
        <Result
          img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
          title="数据采集中"
          message="请耐心等待"
        />
      )
    } else {
      content = (
        <Tabs tabs={[{title: '监控图表'},{title: '设备信息'}]}
          initialPage={0}
          swipeable={false}
          page={page}
          onChange={(tab, index) => { this.handleChange(index) }}
        >
          <div style={{padding:'10px',background: '#fff'}}>
            <div className="chart-block">        
              <div className="chart-item">
                <div className="under-line"><span className="arrow-tip"></span>告警站点统计</div>
                <Donut title={'告警站点'} dataSource = {siteChart}/>
              </div>
              <div className="chart-item">
                <div className="under-line"><span className="arrow-tip"></span>告警电池组总数</div>
                <Donut title={'告警电池组'} dataSource = {btgChart}/>
              </div> 
            </div>
            <div className="chart-block">
              <div className="under-line"><span className="arrow-tip"></span>电池组告警数量实时对比</div>
              <BarChart dataSource = {btgsRealTimeAlarmCount}/>
            </div> 
            <div style={{paddingTop: '50px'}}>
              <div className="under-line" style={{marginBottom: '15px'}}><span className="arrow-tip"></span>设备实时告警</div>
              <AlarmTable  tableData={tableData}/>
            </div>           
          </div>
          <div>
            <List>
              <Item extra={basic.controlModuleName} >收敛器编号</Item>
              <Item extra={basic.regionLocation+basic.detailLocation} >位置</Item>
              <Item extra={basic.ipAddress} >IP</Item>
              <Item extra={basic.batteryGroupAmount} >电池组数量</Item>
              <Item extra={basic.kernelVersionNumber} >内核版本号</Item>
            </List>
          </div>    
        </Tabs>
      ) 
    }
    return (
      <div className="App home-cm">
        {content}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

