import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Tabs, List, Card, Result } from 'antd-mobile';
import BarChart from './BarChart';
import storage from 'utils/storage';

const Item = List.Item;


mui.plusReady(function(){
  var self = plus.webview.currentWebview();
});

class HomeBtg extends Component {

  constructor(props){
    super(props);
    this.state={
      loading: true,
      data: {},
      page: 0
    }
  } 

  componentDidMount(){
    // 监听socket推送
    window.addEventListener('socket',this.handleSocket);
    // 监听节点切换
    window.addEventListener('changePage',this.handlePageChange.bind(this));
  }

  componentWillUnmount(){
    window.removeEventListener('socket',this.handleSocket);
  }

  handleSocket = ()=>{
    let currentNode = storage.getItem('currentNode')['key'];
    let socketData = storage.getItem('btgNode')?storage.getItem('btgNode'):{};
    // plus.nativeUI.toast(JSON.stringify(socketData[currentNode]))
    let data = socketData[currentNode]?socketData[currentNode]:{};
    if(data&&JSON.stringify(data) !== "{}"){
      this.setState({
        loading: false,
        data: data
      })
    }
    console.log('data', data)
    // plus.nativeUI.toast(JSON.stringify(data))
  }

  // 处理节点切换
  handlePageChange = ()=>{
    let currentNode = storage.getItem('currentNode')['key'];
    let socketData = storage.getItem('btgNode')?storage.getItem('btgNode'):{};
    let data = socketData[currentNode]?socketData[currentNode]:{};
    if(data&&JSON.stringify(data) !== "{}"){
      this.setState({
        loading: false,
        page: 0,
        data: data
      })
    } else {
      this.setState({
        loading:true,
        page: 0,
        data: {}
      })
    }
  }

  tabs = [
    {title: '监控图表'},
    {title: '实时信息'} 
  ] 

  checkList = ()=>{
    let list = this.state.data.batteryList
    let page = mui.preload({
      url: './btList/btList.html',  
      id:'btList', 
    });
    page.show();
    mui.fire(page, 'showBtList', list)
  }

  checkBtgList = ()=>{
    // mui.openWindow({   
    //   url: './btgList/btgList.html',  
    //   id:'btgList',    
    //   styles: {  
    //     top:'51px',  
    //     bottom: '51px'
    //   }
    // });
  }

  // 处理图表需要的数据
  handleChartData = ()=>{
    let data = this.state.data;
    let list = data.batteryList?data.batteryList:[];
    let voltageChart = [];
    let resistanceChart = [];
    let temperatureChart = [];
    list.forEach(function(item){
      voltageChart.push({item:item.batteryNumber, count:item.monomerVoltage,reportTime:item.reportTime})
      resistanceChart.push({item:item.batteryNumber, count:item.monomerResistance,reportTime:item.reportTime})
      temperatureChart.push({item:item.batteryNumber, count:item.monomerTemperature,reportTime:item.reportTime})
    })
    return {
      voltageChart,
      resistanceChart,
      temperatureChart
    }
  }

  handleChange = (index)=>{
    this.setState({
      page: index
    })
  }

  render() {
    let data = this.state.data;
    let list = data.batteryList;
    let page = data.page;
    let chartData = this.handleChartData();
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
        <Tabs tabs={this.tabs} initialPage={0} swipeable={false}
          page={page} onChange={(tab, index) => { this.handleChange(index) }} >
          <div style={{padding:'10px',background: '#fff'}}>
            <div className="checkList" onClick={this.checkList}>单体信息列表<a className="mui-icon mui-icon-forward"></a></div>
            <BarChart title='单体电压' dataSource={chartData.voltageChart} />
            <BarChart title='单体内阻' dataSource={chartData.resistanceChart} />
            <BarChart title='单体温度' dataSource={chartData.temperatureChart} />
          </div>
          <div style={{padding:'10px',background: '#fff'}}>
            <List>
              <Item extra={<span className="btg-id">{data.batteryGroupNumber}</span>} 
                onClick={this.checkBtgList.bind(this)} >电池组编号</Item>
              <Item extra={'正常'} >状态</Item>
              <Item extra={data.groupVoltage} >总体电压(V)</Item>
              <Item extra={data.groupElectricCurrent} >充放电电流(A)</Item>
              <Item extra={data.groupSOCGroupVoltage} >SOC(%)</Item>
              <Item extra={data.groupSOHGroupVoltage} >SOH(%)</Item>
              <Item extra={data.environmentTemperature[0]} >环境温度1(°)</Item>
              <Item extra={data.environmentTemperature[1]} >环境温度2(°)</Item>
              <Item extra={data.insulationPositiveResistance} >绝缘电阻-正电阻(Ω)</Item>
              <Item extra={data.insulationNegativeResistance} >绝缘电阻-负电阻(Ω)</Item>
            </List>
            <div className="cust-item">
              <div className="item-row">
                <div className="left">单体电压均差值</div><div className="right">
                {data.monomerVoltageMaxMeanDifference.Difference_Value}
                </div>
              </div>
              <div className="item-row">
                <div className="left">电池编号</div><div className="right">
                {data.monomerVoltageMaxMeanDifference.BTNumber}
                </div>
              </div>
            </div>

            <div className="cust-item">
              <div className="item-row">
                <div className="left">单体电压极差值</div><div className="right">
                {data.monomerVoltageMaxMeanDifference.Difference_Value}
                </div>
              </div>
              <div className="item-row">
                <div className="left">电池编号</div><div className="right">
                {data.monomerVoltageExtremumDifference.MaxVoltage_BTNumber}
                </div>
              </div>
            </div>

            <div className="cust-item">
              <div className="item-row">
                <div className="left">单体电压最低值</div><div className="right">
                {data.monomerVoltageLowest.lowest}
                </div>
              </div>
              <div className="item-row">
                <div className="left">电池编号</div><div className="right">
                {data.monomerVoltageLowest.btNumber}
                </div>
              </div>
            </div>

            <div className="cust-item">
              <div className="item-row">
                <div className="left">单体电压最高</div><div className="right">
                {data.monomerVoltageHighest.highest}
                </div>
              </div>
              <div className="item-row">
                <div className="left">电池编号</div><div className="right">
                {data.monomerVoltageHighest.btNumber}
                </div>
              </div>
            </div>

            <div className="cust-item">
              <div className="item-row">
                <div className="left">单体温度最低</div><div className="right">
                {data.monomerTemperatureLowest.lowest}
                </div>
              </div>
              <div className="item-row">
                <div className="left">电池编号</div><div className="right">
                {data.monomerTemperatureLowest.btNumber}
                </div>
              </div>
            </div>

            <div className="cust-item">
              <div className="item-row">
                <div className="left">单体温度最高</div><div className="right">
                {data.monomerTemperatureHighest.highest}
                </div>
              </div>
              <div className="item-row">
                <div className="left">电池编号</div><div className="right">
                {data.monomerTemperatureHighest.btNumber}
                </div>
              </div>
            </div>

            <div className="cust-item">
              <div className="item-row">
                <div className="left">单体内阻最低</div><div className="right">
                {data.monomerResistanceLowest.lowest}
                </div>
              </div>
              <div className="item-row">
                <div className="left">电池编号</div><div className="right">
                {data.monomerResistanceLowest.btNumber}
                </div>
              </div>
            </div>

            <div className="cust-item">
              <div className="item-row">
                <div className="left">单体内阻最高</div><div className="right">
                {data.monomerResistanceHighest.highest}
                </div>
              </div>
              <div className="item-row">
                <div className="left">电池编号</div><div className="right">
                {data.monomerResistanceHighest.btNumber}
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      )
    }


    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

ReactDOM.render(<HomeBtg />, document.getElementById('root'));



//            <List className="my-list">
//               <Item arrow="horizontal" multipleLine 
//                     onClick={this.checkList} platform="android" >单体信息列表</Item>
//            </List>