import React, { Component } from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend,
  Guide,
} from "bizcharts";
import DataSet from "@antv/data-set";

const pixelRatio = window.devicePixelRatio * 2;
class Donut extends Component {
  // constructor(props){
  //   super(props)
  // }
  render(){
      // console.log(props)
    const { DataView } = DataSet;
    const { Html} = Guide;
    let data = this.props.dataSource?this.props.dataSource: null;
    const dv = new DataView();

    if(data){
      data = [
        {
          item: "正常",
          count: Number(data.normal)
        },
        {
          item: "告警",
          count: Number(data.alarm)
        }
      ]
    }
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    const geomStyle = data[1].count>0?{lineWidth: 5,stroke: "#fff"}:{lineWidth: 0,stroke: "#fff"}
    const title=this.props.title?this.props.title: '告警统计'
    const color = {colorConfig: ['item',['#1890ff','#f04864']]}
    var valueInfo = ''
    if(data[1].status){
      if(data[1].count>0){
        var allCount = data[0].count+data[1].count
        valueInfo = Math.round((data[0].count)/allCount*100)+'%'
      }else{
        valueInfo = '100%'
      }
    }else{
      // if(data[1].count>0){
        valueInfo = data[1].count
      // }else{
      //   valueInfo = '正常'
      // }
    }
    const valueColor = data[1].status?'#2E8FF4':'#f00'
    const htmlStr = `<div style='color: #2E8FF4;font-size: 20px;'>
                    <div style='color: ${valueColor};text-align: center;'>${valueInfo}</div>
                    <span style='font-size: 10px;'>${title}</span>
                    </div>`
    let handleClick = this.props.handleClick?this.props.handleClick:()=>{}
    return (
      <div>
        <Chart
          padding={[ -10, 'auto']}
          height={(window.innerHeight-240)/2}
          data={dv}
          scale={cols}
          forceFit
          pixelRatio={pixelRatio}
          onPlotClick={handleClick}
        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.6}  select={true}/>
          <Axis name="percent" />
          
          <Legend
            position="bottom-center"
            offsetY={-38}
            itemFormatter = {function (val) {
              if(val == data[0].item){
                return val+ data[0].count
              }else{
                return val+ data[1].count
              }
              
            }}
          />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html={htmlStr}
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color={color.colorConfig}
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = Math.round((percent * 100)) + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={geomStyle}
          >
          </Geom>
        </Chart>
      </div>
    )
  }
}

export default Donut
