import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { login } from 'services/system/account/account'
import './index.scss'
import { setToken} from 'utils/auth'
import storage from 'utils/storage';

let entryPage = null;

mui.plusReady(function (argument) {

  // 获取当前webview
  self = plus.webview.currentWebview();
  // APP闪退
  entryPage = mui.preload({
    url:'../entry/entry.html',
    id:'entryPage'
  });
  console.log('entryPage', entryPage)
  // entryPage.hide()
})


class App extends Component {

  state = {
    loginName: 'huasu',
    loginPassword: 'huasu-2019'
  }


  handleClick = () => {
    plus.nativeUI.toast("我是原生TOAST");
  }

  goto = () => {
    mui.fire(entryPage,'loginSuccess');
    plus.webview.show('entryPage');
  }

  login = () => {
		const me = this;
    const { loginName, loginPassword } = this.state
    if(!loginName){
			plus.nativeUI.alert('用户名不能为空')
      return;
    }
    if(!loginPassword){
      plus.nativeUI.alert('密码不能为空')
      return;
    }
    const data = {
      loginName,
      loginPassword
    }
    // 登录前清空缓存
    storage.clear()
    login(data).then(res=>{
      if(res.success){
        console.log('token',res.data.token)
        setToken(res.data.token)
        me.goto()
      }else{
        mui.alert(res.msg)
      }     
    },(err)=>{
      console.log('登录接口报错', err)
    })
  }
  handleLoginName=(event)=> {
    this.setState({loginName: event.target.value},()=>{
      console.log(this.state.loginName)
    });
  }
  handleLoginPassword=(event)=> {
    this.setState({loginPassword: event.target.value});
  }
  render() {
    return (
      <div className="App">
        <header className="mui-bar mui-bar-nav">  
          <h1 className="mui-title">登录页</h1>  
        </header>  
        <div className="mui-content">
          {/* <h1 onClick={this.handleClick}>点这里</h1>
          <h1 onClick={this.goto}>打开新页面</h1>
          <h1 onClick={this.login}>点击登录</h1>
          <div>{JSON.stringify(this.state.result)}</div> */}
          <div className="login-title">华塑电池监控系统</div>
          <div className="login-content">
            <div className="form-wrapper">
              <div className="form-item">
                <div className="form-item-control">
                  <div className="input-wrapper">
                    <span className="mui-icon mui-icon-person input-prefix"></span>
                    <input placeholder="请输入用户名" className="input-item" value={this.state.loginName} onChange={this.handleLoginName}/>
                  </div>
                </div>
              </div>
              <div className="form-item">
                <div className="form-item-control">
                  <div className="input-wrapper">
                    <span className="mui-icon mui-icon-locked input-prefix"></span>
                    <input placeholder="请输入密码" className="input-item" value={this.state.loginPassword} onChange={this.handleLoginPassword}/>
                  </div>
                </div>
              </div>
              <button type="button" className="login-btn" onClick={this.login}>登录</button>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

