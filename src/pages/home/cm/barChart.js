// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizgoblin';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const pixelRatio = window.devicePixelRatio * 2;

const defs = [{
  dataKey: 'item',
}, {
  dataKey: 'count',
  tickCount: 5,
}];

function onShowTooltip(ev) {
  const items = ev.items;
  items[0].name = null;
  items[0].name = items[0].title;
  items[0].value = ` ${items[0].value}次`;
}

const style = {
  lineWidth:5
}

class BarChart extends React.Component {

  render() {
    let data = this.props.dataSource?this.props.dataSource: []
    return (
      <Chart width="100%" data={data} defs={defs} animate={{ type: 'scaley' }} pixelRatio={pixelRatio} >
        <Axis dataKey="item" label={{ fontSize: 8 }} />
        <Axis dataKey="count" />
        <Tooltip showItemMarker={false} onShow={onShowTooltip} />
        <Geom geom="interval" position="item*count"  size={20}/>
      </Chart>
    );
  }
}

export default BarChart