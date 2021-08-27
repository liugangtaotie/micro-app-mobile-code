import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 发送数据
window.microApp?.dispatch({'from': '来自微应用react17的数据' + (+new Date())})

// 监听卸载
window.addEventListener("unmount", function () {
  // 卸载应用
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
})
