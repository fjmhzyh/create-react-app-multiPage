// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizgoblin';
import ChartTitle from 'components/ChartTitle/ChartTitle';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const pixelRatio = window.devicePixelRatio;


class BarChart extends React.Component {

  defs = [{
    dataKey: 'item',
  }, { 
    dataKey: 'count', 
    tickCount: 5,
  }];

  itemClick = (arr)=>{
    console.log('itemClick', arr)
  }

  onShowTooltip = (ev)=> {
    const items = ev.items;
    items[0].name = null;
    items[0].name = items[0].title;
    items[0].value = `¥ ${items[0].value}`;
  }

  render() {
    let title = this.props.title?this.props.title:''
    let defs = this.props.defs?this.props.defs: this.defs;
    let onShowTooltip = this.props.onShowTooltip?this.props.onShowTooltip: this.onShowTooltip;
    let data = this.props.dataSource;
    // console.log('props拿到了', data)
    return (
      <div>
        <ChartTitle title={title} total='20' itemClick={this.itemClick.bind(this)}/>
        <Chart width="100%" data={data} defs={defs} animate={{ type: 'scaley' }} pixelRatio={pixelRatio} padding={24}>
          <Axis dataKey="item" label={null} />
          <Axis dataKey="count" />
          <Tooltip showItemMarker={false} onShow={onShowTooltip} />
          <Geom geom="interval" position="item*count" color={['status', (status)=>{
          if(status == 1){return '#9AD681';}else{return 'red';} }]} />
        </Chart>
      </div>
    );
  }
}

export default BarChart;

