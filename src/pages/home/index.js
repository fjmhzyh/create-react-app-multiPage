import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { getToken } from './../../utils/auth'
import Donut from './Donut'
import AlarmTable from './AlarmTable'
import { Result } from 'antd-mobile' 
import storage from 'utils/storage';

mui.plusReady(function(){
  let self = plus.webview.currentWebview();
  console.log('self', self.msg);
});

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      loading: true,
      data: {},
      tableData: []
    }
  } 


  componentDidMount(){
    window.addEventListener('socket',this.handleSocket);
  }

  componentWillUnmount(){
    window.removeEventListener('socket',this.handleSocket);
  }

  handleSocket = ()=>{
    let data = storage.getItem('companyNode');
    let list = storage.getItem('realtimeAlarmData')?storage.getItem('realtimeAlarmData'):[];
    let tableData = list.splice(0,5)
    if(data&&JSON.stringify(data) !== "{}"){
      this.setState({
        loading: false,
        data: data,
        tableData:tableData
      })
    }
    console.log('data', data)
    // plus.nativeUI.toast(JSON.stringify(data))
  }

  siteClick = ()=>{
    mui.openWindow({
      url: './other/alarmSiteList/alarmSiteList.html', 
      id:'alarmSiteList',
    });
  }

  btgClick = ()=>{
    mui.openWindow({
      url: './other/alarmBtgList/alarmBtgList.html', 
      id:'alarmBtgList',
    });
  }

  render() {
    let siteClick = this.siteClick.bind(this)
    let btgClick = this.btgClick.bind(this)
    let siteChart = this.state.data.siteChart
    let btgChart = this.state.data.btgChart
    let tableData = this.state.tableData
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
        <div>
          <div className="chart-block">       
            <div className="chart-item">
              <div className="under-line"><span className="arrow-tip"></span>告警站点统计</div>
              <Donut title={'告警站点'} dataSource={siteChart} handleClick={siteClick} />
            </div>
            <div className="chart-item">
              <div className="under-line"><span className="arrow-tip"></span>告警电池组统计</div>
              <Donut title={'告警电池组'} dataSource={btgChart} handleClick={btgClick} />
            </div>
          </div>
          <div style={{paddingTop: '50px'}}>
            <div className="under-line" style={{marginBottom: '15px'}}><span className="arrow-tip"></span>设备实时告警</div>
            <AlarmTable  tableData={tableData} />
          </div>
        </div>
      )
    }
    return (
      <div className="App home-company">
        {content}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

