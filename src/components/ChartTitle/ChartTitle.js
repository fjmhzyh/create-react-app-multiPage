import React, { Component } from 'react';
import './index.scss';

class ChartTitle extends Component {

  constructor(props){
    super(props);
    this.state = {
      active: 0,
      basicNumber: 30,
    }
  } 

  genTabs = ()=>{
    let tabs = [];
    let total = this.props.total?this.props.total:0;
    let basicNumber = this.props.basicNumber?this.props.basicNumber:this.state.basicNumber;
    let i =0;
  
    if(total<basicNumber){
      return tabs;
    }

    while(total>basicNumber){
      tabs[i] = `${(i*basicNumber+1)}-${(i+1)*basicNumber}`;
      total = total-basicNumber;
      i++;
      if(total<basicNumber){
        tabs[i] =`${(i*basicNumber+1)}-${i*basicNumber+total}`;
      }
    }
    // console.log('tabs', tabs)
    return tabs;
  } 

  handleItemClick(item, index){
    let arr = item.split('-');
    this.props.itemClick(arr)
    this.setState({
      active: index
    })
  } 

  TabList = ()=> {
    const tabs = this.genTabs();
    const active = this.state.active;
    const listItems = tabs.map((item,index) =>
      <li className={active==index?'chart-tab active':'chart-tab'} key={item} onClick={this.handleItemClick.bind(this, item, index)} >{item}</li>
    );
    return (
      <ul className="chart-tabs">
        {listItems}
      </ul>
    )
  }

  render() {
    let TabList = this.TabList;
    let title = this.props.title?this.props.title:'监控图表'
    return(
      <div className="admin-chart-title">
        <div className="chart-title">{title}</div>
        <TabList />
      </div>
    )
  }
}


export default ChartTitle;