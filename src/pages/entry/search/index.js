import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { SearchBar, ListView, Tag  } from 'antd-mobile';
import storage from 'utils/storage';


let entryPage = null;

mui.plusReady(function(){
   entryPage = plus.webview.getWebviewById('entryPage')
});

class NodeSearch extends Component {

  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    const treeNode = storage.getItem('treeNode')
    let ds = [{key:treeNode.key, title:treeNode.title, state:1,type:0}, ...treeNode.children]

    this.state = {
      value: '',
      dataSource: this.dataSource.cloneWithRows(ds),
      currentMenu: storage.getItem('currentMenu'),
    };
  }


  componentDidMount() {
    // 输入框自动聚焦
    // this.searchInput.focus();
  }


  onInputChange = (value) => {
    this.setState({ value });
    this.searchNode(value);
  };

  // 过滤查询
  searchNode = (val) => {
    let value = val?val:''
    let treeNode = storage.getItem('treeNode')
    let ds = [{key:treeNode.key, title:treeNode.title, state:1,type:0}, ...treeNode.children]
    let arr = []
    ds.forEach(function(item,index){
      let title = item.title.toUpperCase();
      if(title.indexOf(value.toUpperCase()) !== -1){
        let node = { ...item, children: [] }
        if(Array.isArray(item.children)){
          item.children.forEach((child,index)=>{
            if(child.title.toUpperCase().indexOf(value.toUpperCase()) !== -1){
              node.children.push(child)
            }
          })
        }
        arr.push(node)
      } else {
         //  console.log('进了下面的循环')
        if(Array.isArray(item.children)){
          item.children.forEach(child=>{
            if(child.title.toUpperCase().indexOf(value.toUpperCase()) !== -1){
              arr.push(child)
            }
          })
        }
      }

    })
    console.log('arr', arr)
    this.setState({ 
      dataSource: this.dataSource.cloneWithRows(arr),
    });
  }

  onClear = () => {
    this.setState({ value: '' });
  };

  onCancel = () => {
    let value = this.state.value;
    if(value.trim()){
      this.setState({ value: '' });
      this.searchNode()
    } else {
      mui.back()
    }
  }

  statusFormatter = (status)=>{
    let map = {
      '1': '正常',
      '2': '告警',
      '3': '故障',
      '4': '充电',
      '5': '放电'
    }
    return map[status]?map[status]: '未知状态'
  } 

  classNameFormatter = (status)=>{
    let map = {
      '1': 'item-status',
      '2': 'item-status warning',
      '3': 'item-status warning',
      '4': 'item-status warning',
      '5': 'item-status warning'
    }
    return map[status]?map[status]: 'item-status'
  } 

  typeFormatter = (type)=>{
    let map = {
      '0': '公司',
      '1': '收敛器',
      '2': '电池组',
      '3': '电池'
    }
    return map[type]?map[type]: 'type'    
  }

  // 节点选中事件
  nodeClick = (data)=>{
    console.log('触发nodeClick', data)
    storage.setItem('currentNode', data)
    mui.fire(entryPage,'nodeClick', data)
    mui.back()
  }

  render() {
    const row = (rowData, sectionID, rowID) => {
      let status = this.statusFormatter(rowData.state);
      let className = this.classNameFormatter(rowData.state);
      let type = this.typeFormatter(rowData.type);
      let children = rowData.children?rowData.children: []
      // console.log("rowData", rowData)
      return (
        <div>
          <div className="result-item" key={rowData.key} onClick={this.nodeClick.bind(this, rowData)}>
            {/*<span className={className}>{status}</span>*/}
            <Tag small >{type}</Tag>
            <span className="item-split"></span>
            <span className={className}>{rowData.title}</span>
          </div>
          {
            children.map(item=>{
              return (
                <div className="result-item item-btg" key={item.key} onClick={this.nodeClick.bind(this, item)}>
                  <Tag small >电池组</Tag>
                  <span className="item-split"></span>
                  <span className={className}>{item.title}</span>
                </div>
              )
            })
          }
        </div>
      );
    };


    return (
      <div className="App node-search">
        <SearchBar placeholder="请输入设备名称" ref={ref => this.searchInput = ref}
          value={this.state.value}
          onSubmit={value => console.log(value, 'onSubmit')}
          onClear={this.onClear}
          onCancel={this.onCancel}
          showCancelButton
          onChange={this.onInputChange}
        />


        <div className="search-result">
          <ListView
            ref={el => this.lv = el}
            dataSource={this.state.dataSource}
            renderRow={row}
            style={{
              height: '100%',
              overflow: 'auto',
            }}
          />
          {/*<div className="result-item item-company">1</div>

          <div className="result-item item-cm">2</div>
          <div className="result-item-group">
            <div className="result-item item-btg">2-1</div>
          </div>*/}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<NodeSearch />, document.getElementById('root'));





