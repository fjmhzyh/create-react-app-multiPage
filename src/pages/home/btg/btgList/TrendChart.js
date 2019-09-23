// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizgoblin';
import ChartTitle from 'components/ChartTitle/ChartTitle';

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const data = [
  { date: '2010-01-10',  count: 188.8,   type:'电压' },
  { date: '2010-02-10',  count: 196.7,   type:'电压' },
  { date: '2010-03-10',  count: 146.7 , type:'电压' },
  { date: '2010-04-10',  count: 183.7 ,  type:'电压' },
  { date: '2010-05-10',  count: 196.7 ,  type:'电压' },
  { date: '2010-06-10',  count: 195.7 ,  type:'电压' },
  { date: '2010-01-10',  count2: 99.9,  type:'电流' },
  { date: '2010-02-10',  count2: 96.7,   type:'电流' },
  { date: '2010-03-10',  count2: 100.2,  type:'电流' },
  { date: '2010-04-10',  count2: 104.7,  type:'电流' },
  { date: '2010-05-10',  count2: 95.6,   type:'电流' },
  { date: '2010-06-10',  count2: 95.6,  type:'电流' },
];



function formatLabel(text, index, total) {
  const textCfg = {};
  if (index === 0) {
    textCfg.textAlign = 'left';
  } else if (index === total - 1) {
    textCfg.textAlign = 'right';
  }
  // console.log('formatLabel', textCfg)
  return textCfg;
}

function onChangeTooltip(obj, chart) {
  const legend = chart.get('legendController').legends.top[0];
  const tooltipItems = obj.items;
  const legendItems = legend.items;
  const map = {};
  legendItems.forEach((item) => {
    map[item.name] = JSON.parse(JSON.stringify(item));
  });
  tooltipItems.forEach((item) => {
    const name = item.name;
    const value = item.value;
    if (map[name]) {
      map[name].value = value;
    }
  });
  legend.setItems(Object.keys(map).map(key => map[key]));
}

function onHideTooltip(obj, chart) {
  // console.log('222', chart.get('legendController'))
  const legend = chart.get('legendController').legends.top[0];
  legend.setItems(chart.getLegendItems().country);
}

class TrendChart extends React.Component {

  // 生成图表需要的数据
  genData = ()=>{
    let data = [];
    return data;
  }


  // 坐标轴的格式化放到defs里面, 而不是在label里面. label里面可以设置文字的css
  genDefs = ()=>{
    let unit = this.unitFormatter();
    const defs = [
      {
        dataKey: 'date',
        type: 'timeCat',
        tickCount: 3,
      }, 
      {
        dataKey: 'count2',
        tickCount: 5,
        alias: '电流（A）',
        formatter(value) {
          return `${value}A`;
        },
      },
      {
        dataKey: 'count',
        tickCount: 5,
        alias: '电压（V）',
        formatter(value) {
          return `${value}${unit}`;
        },
      }
    ];
    return defs;
  }

  // 单位格式化
  unitFormatter = ()=>{
    let title = this.props.title?this.props.title:'';
    let units = {
      '组压电流': 'V',
      'SOC': '%',
      'SOH': '%',
      '环境温度': '°'
    }
    return units[title]?units[title]:'';
  }

  render() {
    let title = this.props.title?this.props.title:'';
    let defs = this.genDefs();

    if(title=="组压电流"){
      return (
        <div>
          <ChartTitle title={title} />
          <Chart widht="100%" data={data} defs={defs} pixelRatio={window.devicePixelRatio * 2} >
            <Axis dataKey="date"  label={formatLabel} />
            <Axis dataKey="count2" />
            <Axis dataKey="count"  />
             <Legend position="top"/>
            <Tooltip showCrosshairs custom onChange={onChangeTooltip} onHide={onHideTooltip} />
            <Geom geom="line" position="date*count" color="type" shape="smooth" />
            <Geom geom="line" position="date*count2" color="type" shape="smooth" />
          </Chart>
        </div>
      )   
    } else {
      return (
        <div>
          <ChartTitle title={title} />
          <Chart widht="100%" data={data} defs={defs} pixelRatio={window.devicePixelRatio * 2} >
            <Axis dataKey="date"  label={formatLabel} />
            <Axis dataKey="count"  />
            <Legend  dataKey='count2' show={false}/>
            <Legend  dataKey='count'/>
            <Tooltip showCrosshairs custom onChange={onChangeTooltip} onHide={onHideTooltip} />
            <Geom geom="line" position="date*count" color="type" shape="smooth" />
          </Chart>
        </div>
      )
    }

  }
}

// CDN END
export default TrendChart;